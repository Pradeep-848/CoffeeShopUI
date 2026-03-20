import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Star, Minus, Plus, ShoppingBag } from 'lucide-react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import SuccessModal from '../components/SuccessModal';

const DetailsScreen = ({ route, navigation }) => {
    const { coffee } = route.params;
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState('medium');
    const [modalVisible, setModalVisible] = useState(false);

    const sizes = ['small', 'medium', 'large'];
    const sizePrices = { small: -0.5, medium: 0, large: 1.5 };

    const handleAddToCart = () => {
        setModalVisible(true);
    };

    const calculatePrice = () => {
        return (coffee.price + sizePrices[selectedSize]) * quantity;
    };

    return (
        <View className="flex-1 bg-white">
            <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                <Image source={{ uri: coffee.image }} className="w-full h-80" />

                <Animated.View entering={FadeIn} className="p-5">
                    <Text className="text-3xl font-bold text-gray-800">{coffee.name}</Text>

                    <View className="flex-row items-center mt-2">
                        <Star size={20} color="#FFD700" fill="#FFD700" />
                        <Text className="ml-1 text-gray-600">{coffee.rating} (120+ reviews)</Text>
                    </View>

                    <Text className="text-gray-600 leading-6 mt-4">
                        {coffee.description}
                    </Text>

                    <Text className="text-lg font-semibold text-gray-800 mt-6 mb-3">Select Size</Text>
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
                                    className={`text-base ${selectedSize === size ? 'text-black' : 'text-gray-600'
                                        }`}
                                >
                                    {size.charAt(0).toUpperCase() + size.slice(1)}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    <View className="flex-row justify-between items-center mt-6">
                        <Text className="text-lg font-semibold text-gray-800">Quantity</Text>
                        <View className="flex-row items-center">
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
                                onPress={() => setQuantity(Math.max(1, quantity - 1))}
                            >
                                <Minus size={16} color="#6B4E3A" />
                            </TouchableOpacity>
                            <Text className="text-lg font-semibold mx-5 text-gray-800">{quantity}</Text>
                            <TouchableOpacity
                                className="w-10 h-10 rounded-full border border-gray-300 justify-center items-center"
                                onPress={() => setQuantity(quantity + 1)}
                            >
                                <Plus size={16} color="#6B4E3A" />
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity
                        className="bg-yellow-900 py-4 rounded-full items-center mt-8 flex-row justify-center"
                        onPress={handleAddToCart}
                    >
                        <ShoppingBag size={20} color="#fff" />
                        <Text className="text-white text-lg font-semibold ml-2">
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