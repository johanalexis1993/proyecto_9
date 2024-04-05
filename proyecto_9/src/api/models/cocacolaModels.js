const mongoose = require('mongoose')
const cocacolaSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    img: { type: String, required: true },
    price: { type: Number, required: true }
  },
  {
    timestamps: true,
    collection: 'cocacolas'
  }
)
const Cocacola = mongoose.model('cocacolas', cocacolaSchema, 'cocacolas')
module.exports = Cocacola
