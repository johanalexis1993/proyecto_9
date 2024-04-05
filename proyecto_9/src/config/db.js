const mongoose = require('mongoose')
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URL)
    console.log('Conectado a la base de datos')
  } catch (error) {
    console.error('Error de conexión a la base de datos:', error.message)
    process.exit(1)
  }
}
module.exports = { connectDB }
