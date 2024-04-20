import { getProduct } from '../ducks/products';

// actions
const CART_ADD = 'cart/ADD';
const CART_REMOVE = 'cart/REMOVE';
const CART_INCREASE_QUANTITY = 'cart/INCREASE_QUANTITY';

// reducer
const initialState = {
    items: [], // array of product ids
    currency: 'VND'
};

export default function cart(state = initialState, action = {}) {
    switch (action.type) {
        case CART_ADD:
            return handleCartAdd(state, action.payload);
        case CART_REMOVE:
            return handleCartRemove(state, action.payload);
        case CART_INCREASE_QUANTITY:
            return handleIncreaseQuantity(state, action.payload);
        default:
            return state;
    }
}

function handleCartAdd(state, payload) {
    return {
        ...state,
        items: [...state.items, payload.productId]
    };
}

function handleCartRemove(state, payload) {
    return {
        ...state,
        items: state.items.filter(id => id !== payload.productId)
    };
}

function handleIncreaseQuantity(state, payload) {
    const { productId } = payload;
    const index = state.items.indexOf(productId);
    if (index !== -1) {
        const updatedItems = [...state.items];
        updatedItems.splice(index, 1, productId);
        return {
            ...state,
            items: updatedItems
        };
    } else {
        return {
            ...state,
            items: [...state.items, productId]
        };
    }
}

// action creators
export function addToCart(productId) {
    return {
        type: CART_ADD,
        payload: {
            productId
        }
    }
}

export function removeFromCart(productId) {
    return {
        type: CART_REMOVE,
        payload: {
            productId
        }
    }
}

export function increaseQuantity(productId) {
    return {
        type: CART_INCREASE_QUANTITY,
        payload: {
            productId
        }
    }
}

// selectors
export function isInCart(state, props) {
    return state.cart.items.indexOf(props.id) !== -1;
}

export function getItems(state, props) {
    return state.cart.items.map(id => getProduct(state, { id }));
}

export function getCurrency(state, props) {
    return state.cart.currency;
}

export function getTotal(state, props) {
    return state.cart.items.reduce((acc, id) => {
        const item = getProduct(state, { id });
        return acc + item.price;
    }, 0);
}
