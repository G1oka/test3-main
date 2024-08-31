import React, { useState } from 'react';
import axios from 'axios';

const ProductForm = () => {
    const [product, setProduct] = useState({
        name: '',
        prod_id: '',
        price: '',
        description: '',
        image: null,
        images: [],
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setProduct((prev) => ({
            ...prev,
            [name]: files[0],
        }));
    };

    const handleMultipleFilesChange = (e) => {
        setProduct((prev) => ({
            ...prev,
            images: Array.from(e.target.files),
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', product.name);
        formData.append('prod_id', product.prod_id);
        formData.append('price', product.price);
        formData.append('description', product.description);
        formData.append('image', product.image);

        // Append multiple images
        product.images.forEach((image) => {
            formData.append('images', image);
        });

        try {
            const res = await axios.post('http://localhost:5000/api/products', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage('Product added successfully!');
        } catch (err) {
            if (err.response && err.response.data) {
                setMessage(err.response.data.message);
            } else {
                setMessage('Error adding product');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={product.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="text"
                    name="prod_id"
                    placeholder="Product ID"
                    value={product.prod_id}
                    onChange={handleChange}
                    required
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={product.price}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="description"
                    placeholder="Description"
                    value={product.description}
                    onChange={handleChange}
                    required
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                />
                <input
                    type="file"
                    name="images"
                    multiple
                    onChange={handleMultipleFilesChange}
                />
                <button type="submit">Add Product</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default ProductForm;
