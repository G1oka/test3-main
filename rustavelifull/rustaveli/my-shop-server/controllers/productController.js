const Product = require('../models/Product'); // Adjust the path if necessary

exports.getAllProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addProduct = async (req, res) => {
    const { name, prod_id, price, description } = req.body;
    
    // Check if file is uploaded
    if (!req.file) {
        return res.status(400).json({ message: 'No file uploaded' });
    }
    
    const image = `/uploads/${req.file.filename}`; // Path to the uploaded image

    try {
        const newProduct = new Product({
            name,
            prod_id,
            price,
            description,
            image
            // Remove the images field if handling only a single file upload
        });
        await newProduct.save();
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};
