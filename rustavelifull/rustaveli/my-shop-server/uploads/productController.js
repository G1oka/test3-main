const uploadProductImage = (req, res) => {
    if (!req.file && !req.files) {
        return res.status(400).json({ message: 'No file uploaded' });
    }

    // Single image
    let imagePath;
    if (req.file) {
        imagePath = `/uploads/${req.file.filename}`;
    }

    // Multiple images
    const imagePaths = req.files.map(file => `/uploads/${file.filename}`);

    // Save product details in the database (mocked here)
    const product = {
        name: req.body.name,
        prod_id: req.body.prod_id,
        price: req.body.price,
        description: req.body.description,
        image: imagePath,
        images: imagePaths,
    };

    res.json({
        message: 'Product added successfully',
        product,
    });
};
