import React from 'react';
import { TouchableOpacity, Image, Text, View } from 'react-native';
import { Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { Fonts, FontSizes } from '../utils/fonts';

const CoffeeCard = ({ item, index, onPress }) => {
    return (
        <Animated.View
            entering={FadeInDown.delay(index * 100)}
            className="flex-1 m-2 bg-white rounded-2xl overflow-hidden shadow-lg"
        >
            <TouchableOpacity onPress={() => onPress(item)}>
                <Image source={{ uri: item.image }} className="w-full h-40" />
                <View className="p-3">
                    <Text
                        className="text-gray-800"
                        style={{
                            fontFamily: Fonts.Poppins.semiBold,
                            fontSize: FontSizes.sm
                        }}
                    >
                        {item.name}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Star size={16} color="#FFD700" fill="#FFD700" />
                        <Text
                            className="ml-1 text-gray-600"
                            style={{
                                fontFamily: Fonts.Poppins.medium,
                                fontSize: FontSizes.sm
                            }}
                        >
                            {item.rating}
                        </Text>
                    </View>
                    <Text
                        className="text-primary mt-2"
                        style={{
                            fontFamily: Fonts.Poppins.bold,
                            fontSize: FontSizes.lg
                        }}
                    >
                        ${item.price}
                    </Text>
                </View>
            </TouchableOpacity>
        </Animated.View>
    );
};

export default CoffeeCard;