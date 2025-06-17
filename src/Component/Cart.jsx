import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { removeFromCart, updateQuantity, clearCart } from './ReduxToolKit/cartSlice';

function Cart() {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    const totalItems = useSelector(state => state.cart.totalItems);
    const totalPrice = useSelector(state => state.cart.totalPrice);

    const handleQuantityChange = (productId, newQuantity) => {
        dispatch(updateQuantity({ productId: productId, quantity: parseInt(newQuantity) }));
    };

    const handleRemove = (product) => {
        dispatch(removeFromCart(product.id));
        toast.info(`${product.title} removed from cart`);
    };

    const handleClearCart = () => {
        dispatch(clearCart());
        toast.info('Cart cleared');
    };

    if (cartItems.length === 0) {
        return (
            <div className="container mt-5 text-center">
                <h2>Your cart is empty</h2>
                <Link to="/" className="btn btn-danger mt-3">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Your Cart ({totalItems} items)</h2>

            <div className="card bg-dark text-white mb-4">
                <div className="card-body">
                    {cartItems.map(item => (
                        <div key={item.id} className="row mb-3 align-items-center border-bottom pb-3">
                            <div className="col-md-2">
                                <img src={item.image} alt={item.title} className="img-fluid" style={{ maxHeight: '100px', objectFit: 'contain', backgroundColor: 'white' }} />
                            </div>
                            <div className="col-md-5">
                                <h5 className='fw-bold text-danger'>{item.title}</h5>
                                <p className="text-danger">${item.price}</p>
                            </div>
                            <div className="col-md-2">
                                <div className="input-group">
                                    <button
                                        className="btn btn-outline-danger"
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                    >
                                        -
                                    </button>
                                    <input
                                        type="number"
                                        className="form-control text-center bg-dark text-white border-danger"
                                        value={item.quantity}
                                        onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                                        min="1"
                                    />
                                    <button
                                        className="btn btn-outline-danger"
                                        type="button"
                                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>
                            <div className="col-md-2 text-end">
                                <p className="fw-bold">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                            <div className="col-md-1 text-end">
                                <button
                                    className="btn btn-sm btn-outline-danger"
                                    onClick={() => handleRemove(item)}
                                >
                                    ✕
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="row">
                <div className="col-md-6">
                    <Link to="/" className="btn btn-outline-danger">
                        Continue Shopping
                    </Link>
                    <button
                        className="btn btn-outline-danger ms-2"
                        onClick={handleClearCart}
                    >
                        Clear Cart
                    </button>
                </div>
                <div className="col-md-6">
                    <div className="card bg-dark text-white">
                        <div className="card-body">
                            <h5 className="card-title fw-bold">Order Summary</h5>
                            <div className="d-flex justify-content-between my-2">
                                <span>Total Items:</span>
                                <span>{totalItems}</span>
                            </div>
                            <div className="d-flex justify-content-between my-2">
                                <span>Total Price:</span>
                                <span className="text-danger fw-bold">${totalPrice.toFixed(2)}</span>
                            </div>
                            <button className="btn btn-danger w-100 mt-3">
                                Checkout
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;