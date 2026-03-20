import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react-native';
import Animated, { Layout, SlideInRight, SlideOutLeft, FadeInUp } from 'react-native-reanimated';

const initialCartItems = [
    {
        id: '1',
        name: 'Cappuccino',
        price: 4.99,
        quantity: 2,
        size: 'medium',
        image: 'https://images.unsplash.com/photo-1557008075-4a0b1a4e0c9c?w=400',
    },
    {
        id: '2',
        name: 'Espresso',
        price: 3.99,
        quantity: 1,
        size: 'large',
        image: 'https://images.unsplash.com/photo-1557008075-4a0b1a4e0c9c?w=400',
    },
];

const CartScreen = ({ navigation }) => {
    const [cartItems, setCartItems] = useState(initialCartItems);

    const updateQuantity = (itemId, increment) => {
        setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === itemId
                    ? { ...item, quantity: Math.max(1, item.quantity + increment) }
                    : item
            )
        );
    };

    const removeItem = (itemId) => {
        Alert.alert(
            'Remove Item',
            'Are you sure you want to remove this item?',
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => setCartItems((prev) => prev.filter((item) => item.id !== itemId)),
                },
            ]
        );
    };

    const calculateSubtotal = () => {
        return cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    };

    const calculateTax = () => {
        return calculateSubtotal() * 0.08;
    };

    const calculateTotal = () => {
        return calculateSubtotal() + calculateTax();
    };

    const renderCartItem = ({ item, index }) => (
        <Animated.View
            entering={SlideInRight.delay(index * 100)}
            exiting={SlideOutLeft}
            layout={Layout.springify()}
            className="flex-row bg-white rounded-2xl p-4 mb-4 shadow-sm"
        >
            <Image source={{ uri: item.image }} className="w-20 h-20 rounded-xl" />
            <View className="flex-1 ml-4">
                <Text className="text-lg font-semibold text-gray-800">{item.name}</Text>
                <Text className="text-sm text-gray-600 mt-1">Size: {item.size}</Text>
                <Text className="text-base font-bold text-primary mt-2">${item.price}</Text>

                <View className="flex-row justify-between items-center mt-3">
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="w-8 h-8 rounded-full border border-gray-300 justify-center items-center"
                            onPress={() => updateQuantity(item.id, -1)}
                        >
                            <Minus size={14} color="#6B4E3A" />
                        </TouchableOpacity>
                        <Text className="text-base font-semibold mx-3 text-gray-800">{item.quantity}</Text>
                        <TouchableOpacity
                            className="w-8 h-8 rounded-full border border-gray-300 justify-center items-center"
                            onPress={() => updateQuantity(item.id, 1)}
                        >
                            <Plus size={14} color="#6B4E3A" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => removeItem(item.id)}>
                        <Trash2 size={20} color="#ef4444" />
                    </TouchableOpacity>
                </View>
            </View>
        </Animated.View>
    );

    if (cartItems.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100 p-5">
                <ShoppingBag size={80} color="#ccc" />
                <Text className="text-lg text-gray-500 mt-5 mb-8">Your cart is empty</Text>
                <TouchableOpacity
                    className="bg-primary px-8 py-3 rounded-full"
                    onPress={() => navigation.navigate('Home')}
                >
                    <Text className="text-white text-base font-semibold">Start Shopping</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => item.id}
                contentContainerClassName="p-4 pb-36"
                showsVerticalScrollIndicator={false}
            />

            <Animated.View
                entering={FadeInUp}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 shadow-lg"
            >
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Subtotal</Text>
                    <Text className="text-gray-800">${calculateSubtotal().toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text className="text-gray-600">Tax (8%)</Text>
                    <Text className="text-gray-800">${calculateTax().toFixed(2)}</Text>
                </View>
                <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
                    <Text className="text-lg font-bold text-gray-800">Total</Text>
                    <Text className="text-lg font-bold text-primary">${calculateTotal().toFixed(2)}</Text>
                </View>

                <TouchableOpacity
                    className="bg-yellow-900 py-4 rounded-full items-center mt-4"
                    onPress={() => navigation.navigate('Order')}
                >
                    <Text className="text-white text-lg font-semibold">Proceed to Checkout</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default CartScreen;