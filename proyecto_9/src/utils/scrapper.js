const puppeteer = require('puppeteer')
const fs = require('fs')
const write = (productArrays) => {
  fs.writeFile('products.json', JSON.stringify(productArrays), () => {
    console.log('archivo escrito')
  })
}
const scrollPageToBottom = async (page) => {
  try {
    await page.evaluate(async () => {
      await new Promise((resolve, reject) => {
        let totalHeight = 0
        const distance = 100
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight
          window.scrollBy(0, distance)
          totalHeight += distance
          if (totalHeight >= scrollHeight) {
            clearInterval(timer)
            resolve()
          }
        }, 100)
      })
    })
  } catch (error) {
    console.error('Error al hacer scroll en la página:', error)
  }
}
const scrapeProducts = async (page) => {
  const products = []
  try {
    const productDivs = await page.$$('.source_default .product-carousel-card')
    for (const productDiv of productDivs) {
      const title = await productDiv.$eval(
        '.product-carousel-card .product-name a',
        (el) => el.textContent.trim()
      )
      const imgElement = await productDiv.$('img')
      const img = imgElement
        ? await imgElement.getProperty('src').then((src) => src.jsonValue())
        : ''
      const price = await productDiv.$eval(
        '.product-layout div.product-price .price-box .normal-price .price-container .price-wrapper .price',
        (el) => {
          const priceElement = el.textContent.trim().replace('$', '')
          return parseFloat(priceElement)
        }
      )
      /*const price = await productDiv.$eval(
        '.product-layout div.product-price .price-box .normal-price .price-container .price-wrapper .price',
        (el) => {
          const priceNum = el.textContent.trim().replace('$', '')
          return parseFloat(priceNum)
        }
      )*/
      const product = {
        title,
        img,
        price
      }
      products.push(product)
    }
  } catch (error) {
    console.error('Error al extraer productos:', error)
  }
  return products
}
const scrapePage = async (url) => {
  try {
    const browser = await puppeteer.launch({ headless: false })
    const page = await browser.newPage()
    await page.goto(url)
    await page.setViewport({ width: 1200, height: 1000 })
    await scrollPageToBottom(page)
    const products = await scrapeProducts(page)
    write(products)
    await browser.close()
  } catch (error) {
    console.error('Error durante el scraping:', error)
  }
}
module.exports = { scrapePage }
