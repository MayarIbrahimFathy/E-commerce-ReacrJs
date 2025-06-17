import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../ReduxToolKit/cartSlice';

const Card = ({ title, image, id, price, onAddToCart }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleAddToCart = () => {
        const product = { 
            id: id, 
            title: title, 
            image: image, 
            price: price 
        };
        dispatch(addToCart(product));
        
        if (onAddToCart) {
            onAddToCart();
        }
    };

    return (
        <div className="card h-75 m-0 p-0 bg-dark text-white" style={{ width: "15rem;", margin: "0", paddingTop: "0" }}>
            <img src={image} className="card-img-top h-50" alt="..." />
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex justify-content-between">
                    <button onClick={() => navigate(`/details/${id}`)} className="btn btn-danger">Details</button>
                    <button onClick={handleAddToCart} className="btn btn-outline-danger">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default Card;