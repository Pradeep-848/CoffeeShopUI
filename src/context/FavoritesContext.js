import React, { createContext, useState, useContext, useEffect } from 'react';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

const FavoritesContext = createContext();

export const useFavorites = () => {
    const context = useContext(FavoritesContext);
    if (!context) {
        throw new Error('useFavorites must be used within FavoritesProvider');
    }
    return context;
};

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    // Load favorites from storage on mount
    useEffect(() => {
        loadFavorites();
    }, []);

    const loadFavorites = async () => {
        try {
            const saved = await AsyncStorage.getItem('favorites');
            if (saved) {
                setFavorites(JSON.parse(saved));
            }
        } catch (error) {
            console.log('Error loading favorites:', error);
        }
    };

    const saveFavorites = async (newFavorites) => {
        try {
            await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
        } catch (error) {
            console.log('Error saving favorites:', error);
        }
    };

    const addToFavorites = (coffee) => {
        const exists = favorites.some(item => item.id === coffee.id);
        if (!exists) {
            const newFavorites = [...favorites, coffee];
            setFavorites(newFavorites);
            saveFavorites(newFavorites);
        }
    };

    const removeFromFavorites = (coffeeId) => {
        const newFavorites = favorites.filter(item => item.id !== coffeeId);
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
    };

    const isFavorite = (coffeeId) => {
        return favorites.some(item => item.id === coffeeId);
    };

    const toggleFavorite = (coffee) => {
        if (isFavorite(coffee.id)) {
            removeFromFavorites(coffee.id);
        } else {
            addToFavorites(coffee);
        }
    };

    return (
        <FavoritesContext.Provider value={{
            favorites,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            toggleFavorite,
            favoritesCount: favorites.length
        }}>
            {children}
        </FavoritesContext.Provider>
    );
};