const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    prod_id: { type: String, required: true, unique: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    images: { type: [String], required: false }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
