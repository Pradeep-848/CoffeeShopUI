import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Star, Minus, Plus, ShoppingBag, Heart } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useCart } from '../context/CartContext';
import SuccessModal from '../components/SuccessModal';
import { Fonts, FontSizes } from '../utils/fonts';
import { useFavorites } from '../context/FavoritesContext';

const DetailsScreen = ({ route, navigation }) => {
    const { coffee } = route.params;
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('medium');
    const [modalVisible, setModalVisible] = useState(false);

    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(coffee.id);

    const sizes = ['small', 'medium', 'large'];
    const sizePrices = { small: -0.5, medium: 0, large: 1.5 };

    const handleAddToCart = () => {
        const finalPrice = (coffee.price + sizePrices[selectedSize]).toFixed(2);
        addToCart(coffee, selectedSize, quantity, finalPrice);
        setModalVisible(true);
    };

    const calculatePrice = () => {
        return (coffee.price + sizePrices[selectedSize]) * quantity;
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <TouchableOpacity
                    onPress={() => toggleFavorite(coffee)}
                    className="absolute top-5 right-5 bg-black/20 rounded-full p-2 z-10"
                >
                    <Heart
                        size={24}
                        color={favorite ? "#ef4444" : "#fff"}
                        fill={favorite ? "#ef4444" : "none"}
                    />
                </TouchableOpacity>

                <Image
                    source={coffee.image}
                    className="w-full h-80"
                    resizeMode="cover"
                />

                <Animated.View entering={FadeIn} className="p-5">
                    <Text
                        className="text-3xl font-bold text-gray-800"
                        style={{ fontFamily: Fonts.Playfair?.bold || Fonts.Poppins.bold }}
                    >
                        {coffee.name}
                    </Text>

                    <View className="flex-row items-center mt-2">
                        <Star size={20} color="#FFD700" fill="#FFD700" />
                        <Text
                            className="ml-1 text-gray-600"
                            style={{ fontFamily: Fonts.Poppins.medium }}
                        >
                            {coffee.rating} (120+ reviews)
                        </Text>
                    </View>

                    <Text
                        className="text-gray-600 leading-6 mt-4"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        {coffee.description}
                    </Text>

                    <Text
                        className="text-lg font-semibold text-gray-800 mt-6 mb-3"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Select Size
                    </Text>
                    <View className="flex-row justify-around">
                        {sizes.map((size) => (
                            <TouchableOpacity
                                key={size}
                                className={`py-3 px-6 rounded-full border ${selectedSize === size
                                    ? 'bg-primary border-primary'
                                    : 'border-gray-300'
                                    }`}
                                onPress={() => setSelectedSize(size)}
                            >
                                <Text
                                    className='text-gray-600'
                                    style={{ fontFamily: Fonts.Poppins.medium }}
                                >
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex-row justify-between items-center mt-6">
                        <Text
                            className="text-lg font-semibold text-gray-800"
                            style={{ fontFamily: Fonts.Poppins.semiBold }}
                        >
                            Quantity
                        </Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus size={16} color="#713f12" />
                            </TouchableOpacity>
                            <Text
                                className="text-lg font-semibold mx-5 text-gray-800"
                                style={{ fontFamily: Fonts.Poppins.semiBold }}
                            >
                                {quantity}
                            </Text>
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Plus size={16} color="#713f12" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="bg-yellow-900 py-4 rounded-full items-center mt-8 flex-row justify-center"
                        onPress={handleAddToCart}
                    >
                        <ShoppingBag size={20} color="#fff" />
                        <Text
                            className="text-white text-lg font-semibold ml-2"
                            style={{ fontFamily: Fonts.Poppins.semiBold }}
                        >
                            Add to Cart - ${calculatePrice().toFixed(2)}
                        </Text>
                    </TouchableOpacity>
                </Animated.View>
            </ScrollView>

            <SuccessModal
                visible={modalVisible}
                coffee={coffee}
                selectedSize={selectedSize}
                quantity={quantity}
                onViewCart={() => {
                    setModalVisible(false);
                    navigation.navigate('Cart');
                }}
                onContinue={() => setModalVisible(false)}
            />
        </View>
    );
};

export default DetailsScreen;