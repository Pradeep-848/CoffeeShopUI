import React from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, StatusBar } from 'react-native';
import { Search, ShoppingBag } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import CoffeeCard from '../components/CoffeeCard';
import { coffeeData } from '../data/coffeeData';
import { Fonts, FontSizes } from '../utils/fonts';

const HomeScreen = ({ navigation }) => {
    return (
        <View className="flex-1 bg-light">
            <StatusBar barStyle="light-content" backgroundColor="#6B4E3A" />

            <Animated.View entering={FadeInUp} className="bg-primary px-5 pt-5 pb-8">
                <Text
                    className="text-black"
                    style={{
                        fontFamily: Fonts.Poppins.bold,
                        fontSize: FontSizes['xl']
                    }}
                >
                    Good Morning!
                </Text>
                <Text
                    className="text-gray-600"
                    style={{
                        fontFamily: Fonts.Poppins.regular,
                        fontSize: FontSizes.sm
                    }}
                >
                    What coffee would you like today?
                </Text>
            </Animated.View>

            <Animated.View entering={FadeInUp.delay(200)} className="mx-5 -mt-5">
                <View className="flex-row items-center bg-white px-4 py-1 rounded-full shadow-md">
                    <Search size={20} color="#999" />
                    <TextInput
                        className="flex-1 ml-2"
                        placeholder="Search your coffee..."
                        placeholderTextColor="#999"
                        style={{
                            fontFamily: Fonts.Poppins.regular,
                            fontSize: FontSizes.base
                        }}
                    />
                </View>
            </Animated.View>

            <FlatList
                data={coffeeData}
                renderItem={({ item, index }) => (
                    <CoffeeCard
                        item={item}
                        index={index}
                        onPress={(coffee) => navigation.navigate('Details', { coffee })}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="px-2 pb-20"
                showsVerticalScrollIndicator={false}
            />

            <TouchableOpacity
                className="absolute bottom-5 right-5 bg-primary w-14 h-14 rounded-full justify-center items-center shadow-lg"
                onPress={() => navigation.navigate('Cart')}
            >
                <ShoppingBag size={24} color="#fff" />
                <View className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center">
                    <Text
                        className="text-white text-xs font-bold"
                        style={{ fontFamily: Fonts.Poppins.bold }}
                    >
                        2
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
};

export default HomeScreen;