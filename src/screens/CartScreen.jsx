import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import { Trash2, Minus, Plus, ShoppingBag } from 'lucide-react-native';
import Animated, { Layout, SlideInRight, SlideOutLeft, FadeInUp } from 'react-native-reanimated';
import { useCart } from '../context/CartContext';
import { Fonts, FontSizes } from '../utils/fonts';

const CartScreen = ({ navigation }) => {
    const {
        cartItems,
        updateQuantity,
        removeItem,
        getCartTotal,
        clearCart
    } = useCart();

    const calculateTax = () => {
        return getCartTotal() * 0.08;
    };

    const calculateTotal = () => {
        return getCartTotal() + calculateTax();
    };

    const handleRemoveItem = (itemId, size, itemName) => {
        Alert.alert(
            'Remove Item',
            `Are you sure you want to remove ${itemName} from your cart?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Remove',
                    style: 'destructive',
                    onPress: () => removeItem(itemId, size),
                },
            ]
        );
    };

    const renderCartItem = ({ item, index }) => (
        <Animated.View
            entering={SlideInRight.delay(index * 100)}
            exiting={SlideOutLeft}
            layout={Layout.springify()}
            className="flex-row bg-white rounded-2xl p-4 mb-4 shadow-sm"
        >
            <Image source={item.image} className="w-20 h-20 rounded-xl" />
            <View className="flex-1 ml-4">
                <Text
                    className="text-lg font-semibold text-gray-800"
                    style={{ fontFamily: Fonts.Poppins.semiBold }}
                >
                    {item.name}
                </Text>
                <Text
                    className="text-sm text-gray-600 mt-1"
                    style={{ fontFamily: Fonts.Poppins.regular }}
                >
                    Size: {item.size}
                </Text>
                <Text
                    className="text-base font-bold text-primary mt-2"
                    style={{ fontFamily: Fonts.Poppins.bold }}
                >
                    ${item.price}
                </Text>

                <View className="flex-row justify-between items-center mt-3">
                    <View className="flex-row items-center">
                        <TouchableOpacity
                            className="w-8 h-8 rounded-full border border-gray-300 justify-center items-center"
                            onPress={() => updateQuantity(item.id, item.size, -1)}
                        >
                            <Minus size={14} color="#713f12" />
                        </TouchableOpacity>
                        <Text
                            className="text-base font-semibold mx-3 text-gray-800"
                            style={{ fontFamily: Fonts.Poppins.semiBold }}
                        >
                            {item.quantity}
                        </Text>
                        <TouchableOpacity
                            className="w-8 h-8 rounded-full border border-gray-300 justify-center items-center"
                            onPress={() => updateQuantity(item.id, item.size, 1)}
                        >
                            <Plus size={14} color="#713f12" />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => handleRemoveItem(item.id, item.size, item.name)}>
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
                <Text
                    className="text-lg text-gray-500 mt-5 mb-8"
                    style={{ fontFamily: Fonts.Poppins.medium }}
                >
                    Your cart is empty
                </Text>
                <TouchableOpacity
                    className="border border-yellow-900 px-8 py-3 rounded-full"
                    onPress={() => navigation.navigate('HomeTab')}
                >
                    <Text
                        className="text-yellow-900 text-base font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Start Shopping
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <FlatList
                data={cartItems}
                renderItem={renderCartItem}
                keyExtractor={(item) => `${item.id}-${item.size}`}
                contentContainerClassName="p-4 pb-36"
                showsVerticalScrollIndicator={false}
            />

            <Animated.View
                entering={FadeInUp}
                className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl p-5 shadow-lg"
            >
                <View className="flex-row justify-between mb-2">
                    <Text
                        className="text-gray-600"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        Subtotal
                    </Text>
                    <Text
                        className="text-gray-800"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        ${getCartTotal().toFixed(2)}
                    </Text>
                </View>
                <View className="flex-row justify-between mb-2">
                    <Text
                        className="text-gray-600"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        Tax (8%)
                    </Text>
                    <Text
                        className="text-gray-800"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        ${calculateTax().toFixed(2)}
                    </Text>
                </View>
                <View className="flex-row justify-between mt-2 pt-2 border-t border-gray-200">
                    <Text
                        className="text-lg font-bold text-gray-800"
                        style={{ fontFamily: Fonts.Poppins.bold }}
                    >
                        Total
                    </Text>
                    <Text
                        className="text-lg font-bold text-green-700"
                        style={{ fontFamily: Fonts.Poppins.bold }}
                    >
                        ${calculateTotal().toFixed(2)}
                    </Text>
                </View>

                <TouchableOpacity
                    className="bg-yellow-900 py-4 rounded-full items-center mt-4"
                    onPress={() => navigation.navigate('Order')}
                >
                    <Text
                        className="text-white text-lg font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Proceed to Checkout
                    </Text>
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default CartScreen;