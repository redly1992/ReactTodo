import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

// Mock fetch function (replace with real API call)
const fetchProduct = async (id) => {
    // Simulate API call
    return {
        id,
        name: `Product ${id}`,
        description: `Description for product ${id}`,
        price: 99.99,
    };
};

const Product = ({ initialData = {} }) => {
    const { id } = useParams();
    const [product, setProduct] = useState(initialData.product || null);
    const [error, setError] = useState(initialData.error || null);
    const [loading, setLoading] = useState(!initialData.product);

    useEffect(() => {
        if (!initialData.product) {
            // Fetch data client-side if no initial data
            setLoading(true);
            fetchProduct(id)
                .then((data) => {
                    setProduct(data);
                    setLoading(false);
                })
                .catch((err) => {
                    setError('Failed to load product');
                    setLoading(false);
                });
        }
    }, [id, initialData]);

    if (loading) return <div>Loading... 123</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>Product not found</div>;

    return (
        <div>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
        </div>
    );
};

export default Product;