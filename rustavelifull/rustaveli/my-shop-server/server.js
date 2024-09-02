const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const multer = require('multer');
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect('mongodb+srv://Giorgi:Giorgi123@rustaveli.pogst.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    prod_id: { type: String, unique: true }, // Ensure unique prod_id
    price: Number,
    description: String,
    images: [
        {
            originalName: String, // Store original file name
            filePath: String       // Store file path
        }
    ]
});

const Product = mongoose.model('Product', productSchema);

// Set up multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Directory to save the uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save the original filename
    }
});

const upload = multer({ storage: storage });

// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON bodies

// Serve static files from 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle product creation with multiple file uploads
app.post('/api/products', upload.array('images'), async (req, res) => {
    const { name, prod_id, price, description } = req.body;

    // Validate required fields
    if (!name || !prod_id || !price || !description) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'At least one image is required' });
    }

    try {
        const images = req.files.map(file => ({
            originalName: file.originalname, // Save the original file name
            filePath: file.path             // Save the file path
        }));

        const newProduct = new Product({
            name,
            prod_id,
            price,
            description,
            images
        });

        await newProduct.save();
        res.status(201).json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
        console.error('Error creating product:', error);

        if (error.code === 11000) { // Duplicate key error
            return res.status(409).json({ message: 'Duplicate key error: Product ID already exists' });
        }

        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
