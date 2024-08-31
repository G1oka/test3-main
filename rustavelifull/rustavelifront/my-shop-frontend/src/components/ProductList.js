import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/productService';
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await getProducts();
                console.log(data);  // Debugging line
                setProducts(data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };
        fetchProducts();
    }, []);

    if (products.length === 0) {
        return <div>No products available</div>;
    }

    return (
        <div>
            <h1>Product List</h1>
            <ul>
                {products.map(product => (
                    <li key={product._id}>
                        <Link to={`/products/${product._id}`}>{product.name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ProductList;
