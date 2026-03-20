import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Star, Heart } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Fonts, FontSizes } from '../utils/fonts';
import { useFavorites } from '../context/FavoritesContext';

const CoffeeCard = ({ item, index, onPress }) => {
    const { isFavorite, toggleFavorite } = useFavorites();
    const favorite = isFavorite(item.id);

    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)}
            className="flex-1 m-2"
        >
            <TouchableOpacity
                onPress={() => onPress(item)}
                activeOpacity={0.9}
                className="bg-white rounded-2xl overflow-hidden shadow-lg"
            >
                {/* Image Container */}
                <View className="relative">
                    <Image
                        source={item.image}
                        className="w-full h-44"
                        resizeMode="cover"
                    />
                    {/* Gradient Overlay using View with opacity */}
                    <View className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/50 to-transparent" />

                    {/* Favorite Button */}
                    <TouchableOpacity
                        className="absolute top-3 right-3 bg-white/90 rounded-full p-2"
                        onPress={() => toggleFavorite(item)}
                    >
                        <Heart
                            size={16}
                            color={favorite ? "#ef4444" : "#666"}
                            fill={favorite ? "#ef4444" : "none"}
                        />
                    </TouchableOpacity>

                    {/* Rating Badge */}
                    <View className="absolute bottom-3 left-3 bg-black/50 px-2 py-1 rounded-full">
                        <View className="flex-row items-center">
                            <Star size={12} color="#FFD700" fill="#FFD700" />
                            <Text
                                className="text-white text-xs ml-1"
                                style={{ fontFamily: Fonts.Poppins.medium }}
                            >
                                {item.rating}
                            </Text>
                        </View>
                    </View>
                </View>

                {/* Content */}
                <View className="p-3">
                    <Text
                        className="text-gray-800 text-base"
                        style={{
                            fontFamily: Fonts.Poppins.semiBold,
                        }}
                        numberOfLines={1}
                    >
                        {item.name}
                    </Text>
                    <Text
                        className="text-gray-400 text-xs mt-1"
                        style={{
                            fontFamily: Fonts.Poppins.regular,
                        }}
                    >
                        Medium • Roasted
                    </Text>
                    <View className="flex-row justify-between items-center mt-3">
                        <Text
                            className="text-primary font-bold"
                            style={{
                                fontFamily: Fonts.Poppins.bold,
                                fontSize: FontSizes.lg
                            }}
                        >
                            ${item.price}
                        </Text>
                        <View className="bg-[#a16207]/10 px-2 py-1 rounded-full">
                            <Text
                                className="text-[#a16207] text-xs font-semibold"
                                style={{ fontFamily: Fonts.Poppins.semiBold }}
                            >
                                ORDER
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CoffeeCard;