import React, { useState } from 'react';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import './productUpload.css';

const apiUrl = 'http://localhost:5000/api/products'; // Update with your actual API URL

const ProductUpload = () => {
    const [productName, setProductName] = useState('');
    const [productId, setProductId] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState([]);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');

    const onDrop = (acceptedFiles) => {
        setImages(acceptedFiles); 
    };

    const { getRootProps, getInputProps } = useDropzone({ onDrop, multiple: true });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', productName);
        formData.append('prod_id', productId);
        formData.append('price', price);
        formData.append('description', description);

        images.forEach((image) => {
            formData.append('images', image); // Append multiple images
        });

        try {
            const response = await axios.post(apiUrl, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            setMessage('Product uploaded successfully!');
            setMessageType('success');
        } catch (error) {
            console.error('Error uploading product:', error);
            let errorMessage = 'Error uploading product. Please try again.';
            if (error.response) {
                console.error('Response data:', error.response.data);
                const backendMessage = error.response.data.message || '';

                if (error.response.status === 409) { // Assuming 409 Conflict for duplicate key errors
                    errorMessage = 'Invalid Product ID. Please check and try again.';
                } else if (backendMessage.includes('Image')) {
                    errorMessage = 'Images are required. Please upload at least one image.';
                } else if (backendMessage.includes('ID')) {
                    errorMessage = 'Invalid Product ID. Please check and try again.';
                } else if (backendMessage.includes('Name')) {
                    errorMessage = 'Product Name is required. Please provide a valid name.';
                } else if (backendMessage.includes('Price')) {
                    errorMessage = 'Price is required and must be a number. Please check and try again.';
                } else {
                    errorMessage = backendMessage;
                }
            }
            setMessage(errorMessage);
            setMessageType('error');
        }
    };

    return (
        <div className='full-screen'>
            <div className='small-screen'>
                <h2 className='header'>Product Upload Form</h2>
                <form onSubmit={handleSubmit} className='form'>
                    <div className='row'>
                        <div className='input-group'>
                            <label>Product Name:</label>
                            <input
                                type="text"
                                value={productName}
                                onChange={(e) => setProductName(e.target.value)}
                                required
                            />
                        </div>
                        <div className='input-group'>
                            <label>Product ID:</label>
                            <input
                                type="text"
                                value={productId}
                                onChange={(e) => setProductId(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='row'>
                        <div className='input-group'>
                            <label>Price:</label>
                            <input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div className='row full-width'>
                        <div className='input-group full-width'>
                            <label>Description:</label>
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                required
                            />
                        </div>
                    </div>
                    <div {...getRootProps()} className='dropzone'>
                        <input {...getInputProps()} />
                        {images.length > 0 ? (
                            <p>{images.map((file) => file.name).join(', ')}</p>
                        ) : (
                            <p>Drag & drop product images here, or click to select them</p>
                        )}
                    </div>
                    <button type="submit" className='submit-button'>Submit</button>
                </form>
                {message && <p className={`message ${messageType}`}>{message}</p>}
            </div>
        </div>
    );
};

export default ProductUpload;
