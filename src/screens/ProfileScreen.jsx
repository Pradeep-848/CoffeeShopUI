// src/screens/ProfileScreen.jsx
import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { User, Mail, Phone, MapPin, LogOut } from 'lucide-react-native';
import { Fonts, FontSizes } from '../utils/fonts';

const ProfileScreen = ({ navigation }) => {
    return (
        <ScrollView className="flex-1 bg-gray-100">
            <View className="bg-primary py-4 items-center">
                <View className="bg-white/20 p-4 rounded-full">
                    <Image source={require('../assets/images/profile.jpg')} className="w-28 h-28 rounded-full" />
                </View>
                <Text className="text-black text-xl font-bold">George</Text>
            </View>

            <View className="p-5">
                <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl mb-3">
                    <Mail size={20} color="#713f12" />
                    <Text className="flex-1 ml-3 text-gray-700">Email</Text>
                    <Text className="text-gray-400">george23@gmail.com</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl mb-3">
                    <Phone size={20} color="#713f12" />
                    <Text className="flex-1 ml-3 text-gray-700">Phone</Text>
                    <Text className="text-gray-400">123-456-7890</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-xl mb-3">
                    <MapPin size={20} color="#713f12" />
                    <Text className="flex-1 ml-3 text-gray-700">Addresses</Text>
                    <Text className="text-gray-400">123 Main St, City, State 12345</Text>
                </TouchableOpacity>

                <TouchableOpacity className="flex-row items-center bg-red-500 p-4 rounded-xl mt-5">
                    <LogOut size={20} color="#fff" />
                    <Text className="flex-1 ml-3 text-white font-semibold">Sign Out</Text>
                </TouchableOpacity>
            </View>

            <View className="mt-16 pt-6 flex-row items-center justify-center gap-2">
                <Text className="text-center text-gray-600" style={{ fontFamily: Fonts.Poppins.regular, fontSize: FontSizes.sm }}                >
                    Crafted with ❤️ by
                </Text>
                <Text className="text-center text-primary font-semibold" style={{ fontFamily: Fonts.Poppins.regular, fontSize: FontSizes.lg }}>
                    Pradeep
                </Text>
            </View>
        </ScrollView>
    );
};

export default ProfileScreen;