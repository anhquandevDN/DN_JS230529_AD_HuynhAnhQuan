// Trong file components/Product.js

import React from 'react';
import PropTypes from 'prop-types';

const Product = ({ id, name, price, currency, image, isInCart, addToCart, removeFromCart, increaseQuantity }) => {
    const handleClick = () => {
        if (isInCart) {
            removeFromCart(id);
        } else {
            addToCart(id);
        }
    }

    const handleIncreaseQuantity = () => {
        console.log("Click vào nút Increase Quantity"); // Kiểm tra xem sự kiện click có được kích hoạt không
        increaseQuantity(id); // Sử dụng increaseQuantity khi cần
    }

    return (
        <div className="product thumbnail">
            <img src={image} alt="product" />
            <div className="caption">
                <h3>{name}</h3>
                <div className="product__price">{price} {currency}</div>
                <div className="product__button-wrap">
                    <button
                        className={isInCart ? 'btn btn-danger' : 'btn btn-primary'}
                        onClick={handleClick}
                    >
                        {isInCart ? 'Remove' : 'Add to cart'}
                    </button>
                    {isInCart && (
                        <button
                            className="btn btn-primary"
                            onClick={handleIncreaseQuantity}
                        >
                            Increase Quantity
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

Product.propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number,
    currency: PropTypes.string,
    image: PropTypes.string,
    isInCart: PropTypes.bool.isRequired,
    addToCart: PropTypes.func.isRequired,
    removeFromCart: PropTypes.func.isRequired,
    increaseQuantity: PropTypes.func.isRequired // Prop increaseQuantity cần được định nghĩa
}

export default Product;
