import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    Image
} from 'react-native';
import { Package, ChevronRight, Clock, DollarSign } from 'lucide-react-native';
import Animated, { FadeInUp, SlideInRight } from 'react-native-reanimated';
import { Fonts, FontSizes } from '../utils/fonts';

const OrderCard = ({ order, onPress }) => {
    const getStatusColor = () => {
        switch (order.status) {
            case 'Delivered': return '#4CAF50';
            case 'Processing': return '#a16207';
            case 'Cancelled': return '#ef4444';
            default: return '#666';
        }
    };

    return (
        <TouchableOpacity
            onPress={() => onPress(order)}
            className="bg-white rounded-2xl p-4 mb-4 shadow-sm"
        >
            <View className="flex-row justify-between items-start">
                <View className="flex-1">
                    <Text
                        className="text-gray-800 font-semibold text-lg"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Order #{order.id}
                    </Text>
                    <View className="flex-row items-center mt-1">
                        <Clock size={14} color="#666" />
                        <Text
                            className="text-gray-500 text-xs ml-1"
                            style={{ fontFamily: Fonts.Poppins.regular }}
                        >
                            {order.date}
                        </Text>
                    </View>
                </View>
                <View
                    className="px-3 py-1 rounded-full"
                    style={{ backgroundColor: `${getStatusColor()}20` }}
                >
                    <Text
                        className="text-xs font-semibold"
                        style={{ color: getStatusColor(), fontFamily: Fonts.Poppins.medium }}
                    >
                        {order.status}
                    </Text>
                </View>
            </View>

            <View className="flex-row items-center mt-3 pt-3 border-t border-gray-100">
                <Package size={16} color="#a16207" />
                <Text
                    className="text-gray-600 text-sm ml-2 flex-1"
                    style={{ fontFamily: Fonts.Poppins.regular }}
                >
                    {order.items} items • {order.itemNames}
                </Text>
                <View className="flex-row items-center">
                    <DollarSign size={14} color="#a16207" />
                    <Text
                        className="text-primary font-bold ml-1"
                        style={{ fontFamily: Fonts.Poppins.bold }}
                    >
                        {order.total}
                    </Text>
                </View>
            </View>

            <View className="flex-row justify-between mt-3 pt-2">
                <TouchableOpacity
                    className="flex-1 bg-primary/10 py-2 rounded-full mr-2"
                    onPress={() => onPress(order)}
                >
                    <Text
                        className="text-primary text-center text-sm font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        View Details
                    </Text>
                </TouchableOpacity>
                {order.status === 'Delivered' && (
                    <TouchableOpacity
                        className="flex-1 border border-primary py-2 rounded-full ml-2"
                    >
                        <Text
                            className="text-primary text-center text-sm font-semibold"
                            style={{ fontFamily: Fonts.Poppins.semiBold }}
                        >
                            Reorder
                        </Text>
                    </TouchableOpacity>
                )}
            </View>
        </TouchableOpacity>
    );
};

const OrderHistoryScreen = ({ navigation }) => {
    const [orders, setOrders] = useState([
        {
            id: 'ORD001',
            date: 'March 20, 2024',
            status: 'Delivered',
            items: 3,
            itemNames: 'Cappuccino, Latte, Mocha',
            total: '24.97',
            itemsList: [
                { name: 'Cappuccino', quantity: 1, price: 4.99 },
                { name: 'Latte', quantity: 1, price: 5.49 },
                { name: 'Mocha', quantity: 1, price: 5.99 }
            ]
        },
        {
            id: 'ORD002',
            date: 'March 18, 2024',
            status: 'Processing',
            items: 2,
            itemNames: 'Espresso, Cappuccino',
            total: '8.98',
            itemsList: [
                { name: 'Espresso', quantity: 1, price: 3.99 },
                { name: 'Cappuccino', quantity: 1, price: 4.99 }
            ]
        },
        {
            id: 'ORD003',
            date: 'March 15, 2024',
            status: 'Delivered',
            items: 4,
            itemNames: 'Cappuccino x2, Mocha x2',
            total: '21.96',
            itemsList: [
                { name: 'Cappuccino', quantity: 2, price: 4.99 },
                { name: 'Mocha', quantity: 2, price: 5.99 }
            ]
        }
    ]);

    const handleOrderPress = (order) => {
        navigation.navigate('OrderTracking', { orderId: order.id });
    };

    return (
        <View className="flex-1 bg-gray-100">
            <View className="bg-primary px-5 pt-12 pb-6">
                <Text
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: Fonts.Poppins.bold }}
                >
                    Order History
                </Text>
                <Text
                    className="text-white/80 mt-1"
                    style={{ fontFamily: Fonts.Poppins.regular }}
                >
                    Your recent orders
                </Text>
            </View>

            <FlatList
                data={orders}
                renderItem={({ item, index }) => (
                    <Animated.View
                        entering={SlideInRight.delay(index * 100)}
                        className="px-5 mt-4"
                    >
                        <OrderCard order={item} onPress={handleOrderPress} />
                    </Animated.View>
                )}
                keyExtractor={(item) => item.id}
                contentContainerClassName="pb-10"
                showsVerticalScrollIndicator={false}
                ListEmptyComponent={
                    <View className="flex-1 justify-center items-center py-20">
                        <Package size={80} color="#ccc" />
                        <Text
                            className="text-gray-500 text-lg mt-5"
                            style={{ fontFamily: Fonts.Poppins.medium }}
                        >
                            No orders yet
                        </Text>
                        <TouchableOpacity
                            className="bg-primary px-6 py-3 rounded-full mt-5"
                            onPress={() => navigation.navigate('HomeTab')}
                        >
                            <Text
                                className="text-white font-semibold"
                                style={{ fontFamily: Fonts.Poppins.semiBold }}
                            >
                                Start Shopping
                            </Text>
                        </TouchableOpacity>
                    </View>
                }
            />
        </View>
    );
};

export default OrderHistoryScreen;