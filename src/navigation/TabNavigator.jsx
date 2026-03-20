import React, { useRef } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home, Heart, ShoppingBag, User, Coffee } from 'lucide-react-native';
import { View, Text, Animated, TouchableOpacity } from 'react-native';

import HomeScreen from '../screens/HomeScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import CartScreen from '../screens/CartScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { useCart } from '../context/CartContext';

const Tab = createBottomTabNavigator();

// Animated Tab Bar Icon Component
const AnimatedTabIcon = ({ Icon, color, size, focused, cartCount }) => {
    const scale = useRef(new Animated.Value(1)).current;
    const translateY = useRef(new Animated.Value(0)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.spring(scale, {
                toValue: focused ? 1.2 : 1,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: focused ? -5 : 0,
                friction: 3,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, [focused]);

    return (
        <Animated.View
            style={{
                transform: [{ scale }, { translateY }],
            }}
        >
            <View>
                <Icon size={size} color={color} />
                {cartCount > 0 && !focused && (
                    <View className="absolute -top-1 -right-2 bg-red-500 rounded-full w-4 h-4 items-center justify-center">
                        <Text className="text-white text-xs font-bold">
                            {cartCount > 9 ? '9+' : cartCount}
                        </Text>
                    </View>
                )}
            </View>
        </Animated.View>
    );
};

// Animated Label Component
const AnimatedTabLabel = ({ label, focused }) => {
    const opacity = useRef(new Animated.Value(focused ? 1 : 0)).current;
    const translateY = useRef(new Animated.Value(focused ? 0 : 10)).current;

    React.useEffect(() => {
        Animated.parallel([
            Animated.timing(opacity, {
                toValue: focused ? 1 : 0,
                duration: 200,
                useNativeDriver: true,
            }),
            Animated.spring(translateY, {
                toValue: focused ? 0 : 10,
                friction: 5,
                tension: 40,
                useNativeDriver: true,
            }),
        ]).start();
    }, [focused]);

    if (!focused) return null;

    return (
        <Animated.Text
            style={{
                opacity,
                transform: [{ translateY }],
                fontSize: 11,
                fontWeight: '600',
                color: '#713f12',
                marginTop: 2,
                textAlign: 'center',
            }}
        >
            {label}
        </Animated.Text>
    );
};

// Custom Tab Bar Component with Animation
const CustomTabBar = ({ state, descriptors, navigation }) => {
    const tabBarScale = useRef(new Animated.Value(1)).current;

    return (
        <View
            style={{
                flexDirection: 'row',
                backgroundColor: '#fff',
                paddingBottom: 5,
                paddingTop: 5,
                height: 65,
                borderTopWidth: 1,
                borderTopColor: '#f0f0f0',
            }}
        >
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label = options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                        ? options.title
                        : route.name;

                const isFocused = state.index === index;

                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }

                    // Animate tab bar on press
                    Animated.sequence([
                        Animated.spring(tabBarScale, {
                            toValue: 0.95,
                            friction: 5,
                            tension: 40,
                            useNativeDriver: true,
                        }),
                        Animated.spring(tabBarScale, {
                            toValue: 1,
                            friction: 3,
                            tension: 40,
                            useNativeDriver: true,
                        }),
                    ]).start();
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                // Get cart count for Cart tab
                const { getCartCount } = useCart();
                const cartCount = route.name === 'CartTab' ? getCartCount() : 0;

                // Icon mapping
                const IconComponent = {
                    HomeTab: Home,
                    Favorites: Heart,
                    CartTab: ShoppingBag,
                    Profile: User,
                }[route.name];

                return (
                    <TouchableOpacity
                        key={route.key}
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        className="flex-1 items-center justify-center"
                    >
                        <AnimatedTabIcon
                            Icon={IconComponent}
                            color={isFocused ? '#713f12' : '#999'}
                            size={24}
                            focused={isFocused}
                            cartCount={cartCount}
                        />
                        <AnimatedTabLabel label={label} focused={isFocused} />
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const TabNavigator = () => {
    const { getCartCount } = useCart();
    const cartCount = getCartCount();

    return (
        <Tab.Navigator
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: true,
                headerStyle: {
                    backgroundColor: '#713f12',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="HomeTab"
                component={HomeScreen}
                options={{
                    title: 'Coffee Shop',
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
                    headerTitle: () => (
                        <View className="flex-row items-center">
                            <Coffee size={24} color="#fff" />
                            <Text className="text-white text-lg font-bold ml-2">Coffee Shop</Text>
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{
                    title: 'Favorites',
                    tabBarLabel: 'Favorites',
                }}
            />
            <Tab.Screen
                name="CartTab"
                component={CartScreen}
                options={{
                    title: 'Your Cart',
                    tabBarLabel: 'Cart',
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    title: 'Profile',
                    tabBarLabel: 'Profile',
                }}
            />
        </Tab.Navigator>
    );
};

export default TabNavigator;