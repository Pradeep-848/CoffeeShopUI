import React, { useState, useCallback, useRef } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    TextInput,
    StatusBar,
    RefreshControl,
    ScrollView,
    Dimensions,
    Image,
    Animated as RNAnimated
} from 'react-native';
import { Search, ShoppingBag, Coffee, Bell, MapPin, Sliders } from 'lucide-react-native';
import Animated, {
    FadeInUp,
    FadeInDown,
    FadeInRight,
    FadeInLeft,
    useAnimatedStyle,
    interpolate,
    Extrapolate,
    useSharedValue
} from 'react-native-reanimated';
import CoffeeCard from '../components/CoffeeCard';
import { coffeeData } from '../data/coffeeData';
import { useCart } from '../context/CartContext';
import { Fonts, FontSizes } from '../utils/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');
const HEADER_HEIGHT = 280;

const HomeScreen = ({ navigation }) => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();
    const [refreshing, setRefreshing] = useState(false);
    const [data, setData] = useState(coffeeData);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const scrollY = useSharedValue(0);
    const scrollYRef = useRef(new RNAnimated.Value(0)).current;
    const insets = useSafeAreaInsets();

    const categories = ['All', 'Hot', 'Iced', 'Frappe', 'Special'];

    const onRefresh = useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setData([...coffeeData]);
            setRefreshing(false);
        }, 1500);
    }, []);

    const handleSearch = (text) => {
        setSearchQuery(text);
        if (text.trim() === '') {
            setData(coffeeData);
        } else {
            const filtered = coffeeData.filter(item =>
                item.name.toLowerCase().includes(text.toLowerCase())
            );
            setData(filtered);
        }
    };

    const filterByCategory = (category) => {
        setSelectedCategory(category);
        if (category === 'All') {
            setData(coffeeData);
        } else {
            const filtered = coffeeData.filter(item =>
                item.category === category
            );
            setData(filtered);
        }
    };

    const headerAnimatedStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {
                    translateY: interpolate(
                        scrollY.value,
                        [0, HEADER_HEIGHT],
                        [0, -HEADER_HEIGHT / 2],
                        Extrapolate.CLAMP
                    )
                }
            ],
            opacity: interpolate(
                scrollY.value,
                [0, HEADER_HEIGHT],
                [1, 0.9],
                Extrapolate.CLAMP
            )
        };
    });

    const onScroll = RNAnimated.event(
        [{ nativeEvent: { contentOffset: { y: scrollYRef } } }],
        {
            useNativeDriver: false,
            listener: (event) => {
                scrollY.value = event.nativeEvent.contentOffset.y;
            }
        }
    );

    return (
        <View className="flex-1 bg-[#f8f5f0]">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            {/* Animated Header with Parallax Effect */}
            <LinearGradient
                colors={['#713f12', '#a16207']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0"
                style={{ height: HEADER_HEIGHT }}
            />

            <Animated.ScrollView
                showsVerticalScrollIndicator={false}
                onScroll={onScroll}
                scrollEventThrottle={16}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={['#a16207']}
                        tintColor="#a16207"
                        title="Pull to refresh"
                        titleColor="#a16207"
                    />
                }
            >
                {/* Header Content */}
                <View style={{ paddingTop: insets.top, paddingHorizontal: 20 }}>
                    <Animated.View entering={FadeInUp.delay(100)} className="flex-row justify-between items-center">
                        <View className='mt-2 mb-2'>
                            <Text
                                className="text-white text-sm"
                                style={{ fontFamily: Fonts.Poppins.regular }}
                            >
                                Good Morning! 👋
                            </Text>
                            <Text
                                className="text-white text-2xl font-bold"
                                style={{ fontFamily: Fonts.Poppins.bold }}
                            >
                                Coffee Lover
                            </Text>
                        </View>
                        <TouchableOpacity className="bg-white/20 rounded-full p-2">
                            <Bell size={22} color="#fff" />
                        </TouchableOpacity>
                    </Animated.View>

                    {/* Location Card */}
                    <Animated.View entering={FadeInDown.delay(200)} className="bg-white/20 rounded-2xl p-4 mb-4 mt-2">
                        <View className="flex-row items-center">
                            <MapPin size={18} color="#fff" />
                            <Text
                                className="text-white ml-2 flex-1"
                                style={{ fontFamily: Fonts.Poppins.medium }}
                            >
                                Coffee Street, Downtown
                            </Text>
                            <Text
                                className="text-white/80 text-xs"
                                style={{ fontFamily: Fonts.Poppins.regular }}
                            >
                                Change
                            </Text>
                        </View>
                    </Animated.View>

                    {/* Search Bar */}
                    <Animated.View entering={FadeInDown.delay(300)} className="mb-6">
                        <View className="flex-row items-center bg-white rounded-2xl px-3 py-1 shadow-lg">
                            <Search size={20} color="#713f12" />
                            <TextInput
                                className="flex-1 ml-3 text-base"
                                placeholder="Search your favorite coffee..."
                                placeholderTextColor="#999"
                                value={searchQuery}
                                onChangeText={handleSearch}
                                style={{
                                    fontFamily: Fonts.Poppins.regular,
                                    fontSize: FontSizes.base
                                }}
                            />
                            <TouchableOpacity>
                                <Sliders size={20} color="#713f12" />
                            </TouchableOpacity>
                        </View>
                    </Animated.View>

                    {/* Categories */}
                    <Animated.View entering={FadeInLeft.delay(400)} className="mb-6">
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            className="flex-row"
                        >
                            {categories.map((category, index) => (
                                <TouchableOpacity
                                    key={index}
                                    onPress={() => filterByCategory(category)}
                                    className={`mr-3 px-5 py-2 rounded-full ${selectedCategory === category
                                        ? 'bg-[#a16207]'
                                        : 'bg-white/30'
                                        }`}
                                >
                                    <Text
                                        className={selectedCategory === category ? 'text-white font-semibold' : 'text-white'}
                                        style={{
                                            fontFamily: Fonts.Poppins.medium,
                                            fontSize: FontSizes.sm
                                        }}
                                    >
                                        {category}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>
                    </Animated.View>
                </View>

                {/* Featured Banner */}
                <Animated.View entering={FadeInRight.delay(500)} className="mx-5 mb-2">
                    <View className="bg-gradient-to-r from-[#a16207] to-[#713f12] rounded-2xl p-5">
                        <View className="flex-row justify-between items-center">
                            <View className="flex-1">
                                <Text
                                    className="text-black text-lg font-bold"
                                    style={{ fontFamily: Fonts.Poppins.bold }}
                                >
                                    ☕ Special Offer
                                </Text>
                                <Text
                                    className="text-black/90 text-sm mt-1"
                                    style={{ fontFamily: Fonts.Poppins.regular }}
                                >
                                    Buy 1 Get 1 Free on all lattes
                                </Text>
                                <TouchableOpacity className="mt-3 bg-white/20 border border-yellow-900/30 self-start px-4 py-2 rounded-full">
                                    <Text
                                        className="text-black text-xs font-semibold"
                                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                                    >
                                        Order Now →
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <View className="w-20 h-20 bg-black/20 rounded-full items-center justify-center">
                                <Coffee size={40} color="#fff" />
                            </View>
                        </View>
                    </View>
                </Animated.View>

                {/* Coffee Grid Header */}
                <View className="flex-row justify-between items-center px-5 mb-3">
                    <Text
                        className="text-gray-800 text-xl font-bold"
                        style={{ fontFamily: Fonts.Poppins.bold }}
                    >
                        Popular Coffees
                    </Text>
                    <TouchableOpacity>
                        <Text
                            className="text-[#a16207] text-sm"
                            style={{ fontFamily: Fonts.Poppins.medium }}
                        >
                            View All →
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Coffee Grid */}
                <FlatList
                    data={data}
                    renderItem={({ item, index }) => (
                        <CoffeeCard
                            item={item}
                            index={index}
                            onPress={(coffee) => navigation.navigate('Details', { coffee })}
                        />
                    )}
                    keyExtractor={(item) => item.id}
                    numColumns={2}
                    scrollEnabled={false}
                    contentContainerClassName="px-2 pb-32"
                    showsVerticalScrollIndicator={false}
                    ListEmptyComponent={
                        <View className="justify-center items-center py-20">
                            <Coffee size={60} color="#ccc" />
                            <Text
                                className="text-gray-500 text-center mt-4"
                                style={{
                                    fontFamily: Fonts.Poppins.medium,
                                    fontSize: FontSizes.base
                                }}
                            >
                                No coffees found
                            </Text>
                        </View>
                    }
                />
            </Animated.ScrollView>

            {/* Floating Cart Button */}
            <Animated.View
                entering={FadeInUp.delay(600)}
                className="absolute bottom-5 right-5"
            >
                <TouchableOpacity
                    className="bg-[#a16207] w-14 h-14 rounded-full justify-center items-center shadow-2xl"
                    onPress={() => navigation.navigate('Cart')}
                    activeOpacity={0.9}
                >
                    <ShoppingBag size={24} color="#fff" />
                    {cartCount > 0 && (
                        <Animated.View
                            entering={FadeInUp}
                            className="absolute -top-1 -right-1 bg-red-500 w-5 h-5 rounded-full justify-center items-center"
                        >
                            <Text
                                className="text-white text-xs font-bold"
                                style={{ fontFamily: Fonts.Poppins.bold }}
                            >
                                {cartCount > 9 ? '9+' : cartCount}
                            </Text>
                        </Animated.View>
                    )}
                </TouchableOpacity>
            </Animated.View>
        </View>
    );
};

export default HomeScreen;