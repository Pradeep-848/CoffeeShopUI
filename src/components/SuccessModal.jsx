import React from 'react';
import { View, Text, TouchableOpacity, Image, Modal } from 'react-native';
import { CheckCircle } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInDown } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';

const SuccessModal = ({ visible, coffee, selectedSize, quantity, onViewCart, onContinue }) => {
    const navigation = useNavigation();

    return (
        <Modal
            visible={visible}
            transparent={true}
            animationType="slide"
            onRequestClose={onContinue}
            onTouchCancel={onContinue}
        >
            <View className="flex-1 justify-end bg-black/50 mb-4">
                <Animated.View
                    entering={FadeInUp}
                    className="bg-white rounded-t-3xl p-6"
                    style={{ maxHeight: '50%' }}
                >
                    <View className="items-center mb-5">
                        <CheckCircle size={60} color="#4CAF50" strokeWidth={1.5} />
                        <Text className="text-2xl font-bold text-gray-800 mt-3">Added to Cart!</Text>
                    </View>

                    <Animated.View entering={FadeInDown.delay(200)} className="flex-row bg-gray-100 p-4 rounded-xl mb-6">
                        <Image source={coffee?.image} className="w-20 h-20 rounded-xl" />
                        <View className="ml-4 justify-center">
                            <Text className="text-lg font-semibold text-gray-800">{coffee?.name}</Text>
                            <Text className="text-base text-gray-600 mt-1">Size: {selectedSize}</Text>
                            <Text className="text-base text-gray-600">Quantity: {quantity}</Text>
                        </View>
                    </Animated.View>

                    <Animated.View entering={FadeInDown.delay(300)}>
                        <TouchableOpacity
                            className="bg-yellow-900/50 py-4 rounded-full items-center mb-3"
                            onPress={onViewCart}
                        >
                            <Text className="text-white text-lg font-semibold">View Cart</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="py-4 rounded-full items-center border border-yellow-900"
                            onPress={() => navigation.navigate('HomeTab')}
                        >
                            <Text className="text-yellow-900 text-lg font-semibold">Continue Shopping</Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
            </View>
        </Modal>
    );
};

export default SuccessModal;