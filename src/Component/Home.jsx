import React, { useState, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import useCustomHook from './CustomHook/useCustomHook';
import Card from './common/Card';
import { toast } from 'react-toastify';
import { addToCart } from './ReduxToolKit/cartSlice';



function Home() {
    const [query, setQuery] = useState("");
    const { data: products, loader, error } = useCustomHook("https://fakestoreapi.com/products");
    const dispatch = useDispatch();

    const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.title.toLowerCase().includes(query.toLowerCase())
        );
    }, [query, products]);

    const handleSearch = (e) => {
        setQuery(e.target.value);
    };

    const handleAddToCart = (product) => {
        dispatch(addToCart(product));
        toast.success(`${product.title} added to cart!`);

    };

    return (
        <div className="container mt-4">
            <div className="mb-4 w-25 ms-5 border-0 shadow bg-body">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search products by title..."
                    value={query}
                    onChange={handleSearch}
                />
            </div>
            <div className="row px-4 m-auto">
                {loader ? (
                    <h2>Loading...</h2>
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map((ele) => (
                        <div key={ele.id} className="col col-lg-3 col-md-6 mt-3">
                            <Card
                                title={ele.title}
                                image={ele.image}
                                id={ele.id}
                                price={ele.price}
                                onAddToCart={() => handleAddToCart(ele)}
                            />
                        </div>
                    ))
                ) : (
                    <h2>No products found</h2>
                )}
            </div>
        </div>
    );
}

export default Home;