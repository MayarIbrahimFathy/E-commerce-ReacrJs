import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import useCustomHook from './CustomHook/useCustomHook'; 
import { addToCart } from './ReduxToolKit/cartSlice';

function ProductDetails() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { data: product, loader, error } = useCustomHook(`https://fakestoreapi.com/products/${id}`);

    const handleAddToCart = () => {
        if (product) { 
            try {
                dispatch(addToCart(product));
                toast.success(`${product.title} added to cart!`);
            } catch (err) {
                toast.error('Could not add to cart!'); 
            }
        }
    };

    return loader ? (
        <h2>Loading....</h2>
    ) : error ? (
        <h2>Error: {error}</h2>
    ) : product ? (
        <div className="card w-75 m-auto d-flex flex-row align-items-center p-3 mt-5 bg-dark text-danger">
            <div className="flex-shrink-0 me-4" style={{ width: "30%" }}>
                <img
                    src={product.image}
                    alt={product.title}
                    style={{ width: "100%", height: "auto", objectFit: "contain", backgroundColor: "red" }}
                />
            </div>
            <div className="card-body">
                <h3 className="card-title fw-bold">{product.title}</h3>
                <p className="card-text">{product.description}</p>
                <p className="card-text fw-bold">${product.price}</p>

                <div className="mt-auto d-flex justify-content-between">
                    <Link to="/" className="btn btn-outline-danger"> 
                        Back to Products
                    </Link>
                    <button
                        className="btn btn-danger"
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <h2>Product not found</h2>
    );
}

export default ProductDetails;