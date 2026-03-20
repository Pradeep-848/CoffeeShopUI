import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, ActivityIndicator } from 'react-native';
import { CreditCard, DollarSign, CheckCircle, Mail, Phone, MapPin } from 'lucide-react-native';
import Animated, { FadeInUp } from 'react-native-reanimated';

const OrderScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('card');
    const [orderPlaced, setOrderPlaced] = useState(false);

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        address: '',
        city: '',
        zipCode: '',
        cardNumber: '',
        expiryDate: '',
        cvv: '',
    });

    const handleInputChange = (field, value) => {
        setFormData({ ...formData, [field]: value });
    };

    const validateForm = () => {
        if (!formData.fullName || !formData.email || !formData.phone || !formData.address) {
            Alert.alert('Error', 'Please fill in all required fields');
            return false;
        }

        if (paymentMethod === 'card' && (!formData.cardNumber || !formData.expiryDate || !formData.cvv)) {
            Alert.alert('Error', 'Please fill in all card details');
            return false;
        }

        return true;
    };

    const handlePlaceOrder = () => {
        if (!validateForm()) return;

        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setOrderPlaced(true);
        }, 2000);
    };

    if (orderPlaced) {
        return (
            <Animated.View entering={FadeInUp} className="flex-1 justify-center items-center bg-gray-100 p-5">
                <CheckCircle size={80} color="#4CAF50" strokeWidth={1.5} />
                <Text className="text-2xl font-bold text-gray-800 mt-5 mb-3">Order Placed Successfully!</Text>
                <Text className="text-base text-gray-600 text-center mb-8">
                    Thank you for your order. You will receive a confirmation email shortly.
                </Text>
                <TouchableOpacity
                    className="bg-primary px-8 py-3 rounded-full"
                    onPress={() => {
                        setOrderPlaced(false);
                        navigation.popToTop();
                    }}
                >
                    <Text className="text-white text-base font-semibold">Continue Shopping</Text>
                </TouchableOpacity>
            </Animated.View>
        );
    }

    return (
        <ScrollView className="flex-1 bg-gray-100" showsVerticalScrollIndicator={false}>
            <View className="p-5">
                <Text className="text-lg font-semibold text-gray-800 mb-4">Contact Information</Text>

                <Animated.View entering={FadeInUp.delay(100)} className="mb-4">
                    <Text className="text-sm text-gray-600 mb-2">Full Name *</Text>
                    <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
                        <TextInput
                            className="flex-1 py-3 text-base text-gray-800"
                            value={formData.fullName}
                            onChangeText={(text) => handleInputChange('fullName', text)}
                            placeholder="John Doe"
                            placeholderTextColor="#999"
                        />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(150)} className="mb-4">
                    <Text className="text-sm text-gray-600 mb-2">Email *</Text>
                    <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
                        <Mail size={20} color="#999" />
                        <TextInput
                            className="flex-1 ml-2 py-3 text-base text-gray-800"
                            value={formData.email}
                            onChangeText={(text) => handleInputChange('email', text)}
                            placeholder="john@example.com"
                            keyboardType="email-address"
                            autoCapitalize="none"
                            placeholderTextColor="#999"
                        />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(200)} className="mb-4">
                    <Text className="text-sm text-gray-600 mb-2">Phone Number *</Text>
                    <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
                        <Phone size={20} color="#999" />
                        <TextInput
                            className="flex-1 ml-2 py-3 text-base text-gray-800"
                            value={formData.phone}
                            onChangeText={(text) => handleInputChange('phone', text)}
                            placeholder="+1 234 567 8900"
                            keyboardType="phone-pad"
                            placeholderTextColor="#999"
                        />
                    </View>
                </Animated.View>

                <Text className="text-lg font-semibold text-gray-800 mt-4 mb-4">Shipping Address</Text>

                <Animated.View entering={FadeInUp.delay(250)} className="mb-4">
                    <Text className="text-sm text-gray-600 mb-2">Street Address *</Text>
                    <View className="flex-row items-center bg-white rounded-xl px-4 border border-gray-200">
                        <MapPin size={20} color="#999" />
                        <TextInput
                            className="flex-1 ml-2 py-3 text-base text-gray-800"
                            value={formData.address}
                            onChangeText={(text) => handleInputChange('address', text)}
                            placeholder="123 Main St"
                            placeholderTextColor="#999"
                        />
                    </View>
                </Animated.View>

                <Animated.View entering={FadeInUp.delay(300)} className="flex-row mb-4">
                    <View className="flex-1 mr-2">
                        <Text className="text-sm text-gray-600 mb-2">City *</Text>
                        <TextInput
                            className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
                            value={formData.city}
                            onChangeText={(text) => handleInputChange('city', text)}
                            placeholder="New York"
                            placeholderTextColor="#999"
                        />
                    </View>
                    <View className="flex-1 ml-2">
                        <Text className="text-sm text-gray-600 mb-2">ZIP Code</Text>
                        <TextInput
                            className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
                            value={formData.zipCode}
                            onChangeText={(text) => handleInputChange('zipCode', text)}
                            placeholder="10001"
                            keyboardType="numeric"
                            placeholderTextColor="#999"
                        />
                    </View>
                </Animated.View>

                <Text className="text-lg font-semibold text-gray-800 mt-4 mb-4">Payment Method</Text>

                <Animated.View entering={FadeInUp.delay(350)} className="flex-row mb-6">
                    <TouchableOpacity
                        className={`flex-1 flex-row items-center justify-center py-4 mx-1 rounded-xl border ${paymentMethod === 'card'
                            ? 'bg-primary border-primary'
                            : 'bg-white border-gray-300'
                            }`}
                        onPress={() => setPaymentMethod('card')}
                    >
                        <CreditCard size={20} color={paymentMethod === 'card' ? 'black' : '#999'} />
                        <Text className={`ml-2 font-semibold ${paymentMethod === 'card' ? 'text-black' : 'text-gray-600'
                            }`}>
                            Card
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        className={`flex-1 flex-row items-center justify-center py-4 mx-1 rounded-xl border ${paymentMethod === 'paypal'
                            ? 'bg-primary border-primary'
                            : 'bg-white border-gray-300'
                            }`}
                        onPress={() => setPaymentMethod('paypal')}
                    >
                        <DollarSign size={20} color={paymentMethod === 'paypal' ? 'white' : '#999'} />
                        <Text className={`ml-2 font-semibold ${paymentMethod === 'paypal' ? 'text-white' : 'text-gray-600'
                            }`}>
                            PayPal
                        </Text>
                    </TouchableOpacity>
                </Animated.View>

                {paymentMethod === 'card' && (
                    <Animated.View entering={FadeInUp.delay(400)}>
                        <View className="mb-4">
                            <Text className="text-sm text-gray-600 mb-2">Card Number *</Text>
                            <TextInput
                                className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
                                value={formData.cardNumber}
                                onChangeText={(text) => handleInputChange('cardNumber', text)}
                                placeholder="1234 5678 9012 3456"
                                keyboardType="numeric"
                                maxLength={16}
                                placeholderTextColor="#999"
                            />
                        </View>

                        <View className="flex-row mb-4">
                            <View className="flex-1 mr-2">
                                <Text className="text-sm text-gray-600 mb-2">Expiry Date *</Text>
                                <TextInput
                                    className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
                                    value={formData.expiryDate}
                                    onChangeText={(text) => handleInputChange('expiryDate', text)}
                                    placeholder="MM/YY"
                                    maxLength={5}
                                    placeholderTextColor="#999"
                                />
                            </View>
                            <View className="flex-1 ml-2">
                                <Text className="text-sm text-gray-600 mb-2">CVV *</Text>
                                <TextInput
                                    className="bg-white rounded-xl px-4 py-3 text-base text-gray-800 border border-gray-200"
                                    value={formData.cvv}
                                    onChangeText={(text) => handleInputChange('cvv', text)}
                                    placeholder="123"
                                    keyboardType="numeric"
                                    maxLength={3}
                                    secureTextEntry
                                    placeholderTextColor="#999"
                                />
                            </View>
                        </View>
                    </Animated.View>
                )}

                <TouchableOpacity
                    className="bg-green-500 py-4 rounded-full items-center mt-6 mb-10"
                    onPress={handlePlaceOrder}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator color="#fff" />
                    ) : (
                        <Text className="text-white text-lg font-semibold">Place Order</Text>
                    )}
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default OrderScreen;