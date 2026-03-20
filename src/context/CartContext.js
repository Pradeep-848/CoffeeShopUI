import React, { createContext, useState, useContext } from 'react';

const CartContext = createContext();

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error('useCart must be used within CartProvider');
    }
    return context;
};

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    // Add item to cart
    const addToCart = (coffee, size, quantity, price) => {  // ← receive price
        setCartItems(prev => {
            const existing = prev.find(i => i.id === coffee.id && i.size === size);
            if (existing) {
                return prev.map(i =>
                    i.id === coffee.id && i.size === size
                        ? { ...i, quantity: i.quantity + quantity }
                        : i
                );
            }
            return [...prev, {
                id: coffee.id,
                name: coffee.name,
                image: coffee.image,
                rating: coffee.rating,
                size,
                quantity,
                price,
            }];
        });
    };

    // Update item quantity
    const updateQuantity = (itemId, size, increment) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === itemId && item.size === size
                    ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                    : item
            )
        );
    };

    // Remove item from cart
    const removeItem = (itemId, size) => {
        setCartItems(prevItems =>
            prevItems.filter(item => !(item.id === itemId && item.size === size))
        );
    };

    // Clear cart
    const clearCart = () => {
        setCartItems([]);
    };

    // Calculate totals
    const getCartTotal = () => {
        return cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
    };

    const getCartCount = () => {
        return cartItems.reduce((sum, item) => sum + item.quantity, 0);
    };

    return (
        <CartContext.Provider value={{
            cartItems,
            addToCart,
            updateQuantity,
            removeItem,
            clearCart,
            getCartTotal,
            getCartCount
        }}>
            {children}
        </CartContext.Provider>
    );
};