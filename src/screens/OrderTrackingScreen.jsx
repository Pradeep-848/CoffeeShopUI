import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Image,
    ActivityIndicator
} from 'react-native';
import { MapPin, Clock, Phone, CheckCircle, Package, Bike, Home } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown, SlideInRight } from 'react-native-reanimated';
import { Fonts, FontSizes } from '../utils/fonts';

const OrderTrackingScreen = ({ route, navigation }) => {
    const { orderId } = route.params || { orderId: 'ORD12345' };
    const [currentStatus, setCurrentStatus] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const statusSteps = [
        { id: 1, name: 'Order Placed', icon: CheckCircle, time: 'Just now' },
        { id: 2, name: 'Preparing', icon: Package, time: '5-10 min' },
        { id: 3, name: 'Out for Delivery', icon: Bike, time: '15-20 min' },
        { id: 4, name: 'Delivered', icon: Home, time: '30-40 min' }
    ];

    useEffect(() => {
        // Simulate order status updates
        const interval = setInterval(() => {
            setCurrentStatus(prev => {
                if (prev < statusSteps.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                return prev;
            });
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const getStatusColor = (stepId) => {
        if (stepId < currentStatus) return '#4CAF50';
        if (stepId === currentStatus) return '#a16207';
        return '#e0e0e0';
    };

    return (
        <ScrollView className="flex-1 bg-gray-100">
            {/* Header */}
            <View className="bg-primary px-5 pt-12 pb-6">
                <Text
                    className="text-white text-2xl font-bold"
                    style={{ fontFamily: Fonts.Poppins.bold }}
                >
                    Order Tracking
                </Text>
                <Text
                    className="text-white/80 mt-1"
                    style={{ fontFamily: Fonts.Poppins.regular }}
                >
                    Order ID: {orderId}
                </Text>
            </View>

            {/* Progress Steps */}
            <View className="bg-white mx-5 mt-5 p-5 rounded-2xl shadow-lg">
                {statusSteps.map((step, index) => (
                    <Animated.View
                        key={step.id}
                        entering={SlideInRight.delay(index * 100)}
                        className="flex-row items-center mb-6"
                    >
                        <View className="relative">
                            <View
                                className={`w-12 h-12 rounded-full items-center justify-center bg-${getStatusColor(step.id)}/10`}
                                style={{ backgroundColor: `${getStatusColor(step.id)}20` }}
                            >
                                <step.icon
                                    size={24}
                                    color={getStatusColor(step.id)}
                                    strokeWidth={1.5}
                                />
                            </View>
                            {index < statusSteps.length - 1 && (
                                <View
                                    className="absolute top-12 left-5 w-0.5 h-10"
                                    style={{
                                        backgroundColor: step.id < currentStatus ? '#4CAF50' : '#e0e0e0'
                                    }}
                                />
                            )}
                        </View>
                        <View className="ml-4 flex-1">
                            <Text
                                className="text-gray-800 font-semibold"
                                style={{ fontFamily: Fonts.Poppins.semiBold }}
                            >
                                {step.name}
                            </Text>
                            <Text
                                className="text-gray-500 text-sm mt-1"
                                style={{ fontFamily: Fonts.Poppins.regular }}
                            >
                                {step.id <= currentStatus ? step.time : 'Pending'}
                            </Text>
                        </View>
                        {step.id === currentStatus && (
                            <ActivityIndicator size="small" color="#a16207" />
                        )}
                    </Animated.View>
                ))}
            </View>

            {/* Delivery Info */}
            <Animated.View
                entering={FadeInUp.delay(300)}
                className="bg-white mx-5 mt-5 p-5 rounded-2xl shadow-lg"
            >
                <Text
                    className="text-gray-800 text-lg font-bold mb-4"
                    style={{ fontFamily: Fonts.Poppins.bold }}
                >
                    Delivery Details
                </Text>
                <View className="flex-row items-center mb-3">
                    <MapPin size={20} color="#a16207" />
                    <Text
                        className="ml-3 text-gray-700 flex-1"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        123 Coffee Street, Downtown, City - 123456
                    </Text>
                </View>
                <View className="flex-row items-center mb-3">
                    <Clock size={20} color="#a16207" />
                    <Text
                        className="ml-3 text-gray-700"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        Estimated: {statusSteps[currentStatus]?.time || '30 min'}
                    </Text>
                </View>
                <View className="flex-row items-center">
                    <Phone size={20} color="#a16207" />
                    <Text
                        className="ml-3 text-gray-700"
                        style={{ fontFamily: Fonts.Poppins.regular }}
                    >
                        Delivery Partner: +1 234 567 8900
                    </Text>
                </View>
            </Animated.View>

            {/* Action Buttons */}
            <View className="flex-row mx-5 mt-5 mb-10">
                <TouchableOpacity
                    className="flex-1 bg-primary py-4 rounded-full mr-2"
                    onPress={() => navigation.navigate('HomeTab')}
                >
                    <Text
                        className="text-white text-center font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Track on Map
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    className="flex-1 border border-primary py-4 rounded-full ml-2"
                    onPress={() => navigation.navigate('OrderHistory')}
                >
                    <Text
                        className="text-primary text-center font-semibold"
                        style={{ fontFamily: Fonts.Poppins.semiBold }}
                    >
                        Order History
                    </Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OrderTrackingScreen;