import React, { useState, useCallback } from 'react';
import { View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import { Heart, ShoppingBag } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';
import CoffeeCard from '../components/CoffeeCard';
import { useFavorites } from '../context/FavoritesContext';
import { Fonts, FontSizes } from '../utils/fonts';

const FavoritesScreen = ({ navigation }) => {
    const { favorites, favoritesCount } = useFavorites();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 1000);
    }, []);

    if (favorites.length === 0) {
        return (
            <View className="flex-1 justify-center items-center bg-gray-100">
                <Heart size={80} color="#ccc" />
                <Text
                    className="text-lg text-gray-500 mt-5 mb-3"
                    style={{ fontFamily: Fonts.Poppins.medium }}
                >
                    No favorites yet
                </Text>
                <Text
                    className="text-sm text-gray-400 mb-8"
                    style={{ fontFamily: Fonts.Poppins.regular }}
                >
                    Tap the heart icon on any coffee to add to favorites
                </Text>
                <TouchableOpacity
                    className="bg-primary px-6 py-3 rounded-full"
                    onPress={() => navigation.navigate('HomeTab')}
                >
                    <Text
                        className="text-white font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Browse Coffees
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View className="flex-1 bg-gray-100">
            <Animated.View entering={FadeInUp} className="bg-primary px-4 py-4">
                <View className="flex-row items-center justify-between">
                    <Text
                        className="text-black text-lg font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Your Favorites
                    </Text>
                    <Text
                        className="text-black/80 text-sm"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        {favoritesCount} items
                    </Text>
                </View>
            </Animated.View>

            <FlatList
                data={favorites}
                renderItem={({ item, index }) => (
                    <CoffeeCard
                        item={item}
                        index={index}
                        onPress={(coffee) => navigation.navigate('Details', { coffee })}
                    />
                )}
                keyExtractor={(item) => item.id}
                numColumns={2}
                contentContainerClassName="px-2 pb-5"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#713f12']}
                        tintColor="#713f12"
                    />
                }
            />
        </View>
    );
};

export default FavoritesScreen;