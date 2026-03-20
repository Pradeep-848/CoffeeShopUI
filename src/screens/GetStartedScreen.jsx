import React from 'react';
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    StatusBar,
    Dimensions
} from 'react-native';
import { Coffee, ArrowRight } from 'lucide-react-native';
import Animated, { FadeInDown, FadeInUp } from 'react-native-reanimated';
import { Fonts, FontSizes, TextStyles } from '../utils/fonts';

const { height } = Dimensions.get('window');

const GetStartedScreen = ({ navigation }) => {
    return (
        <View className="flex-1">
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <ImageBackground
                source={require('../assets/images/getstarted.jpg')}
                className="flex-1"
                style={{ height: height }}
            >
                <View className="flex-1 bg-black/40 justify-end pb-16 px-6">

                    <Animated.View
                        entering={FadeInUp.delay(200)}
                        className="items-center mb-6"
                    >
                        <View className="bg-white/20 p-4 rounded-full">
                            <Coffee size={60} color="#fff" />
                        </View>
                    </Animated.View>

                    {/* Title with Playfair Bold font */}
                    <Animated.View entering={FadeInDown.delay(400)}>
                        <Text
                            className="text-white text-center mb-3"
                            style={{
                                fontFamily: Fonts.Playfair.bold,
                                fontSize: FontSizes['5xl']
                            }}
                        >
                            Coffee Shop
                        </Text>
                        <Text
                            className="text-white/90 text-center mb-8 px-4"
                            style={{
                                fontFamily: Fonts.Poppins.regular,
                                fontSize: FontSizes.lg
                            }}
                        >
                            Discover the perfect cup of coffee tailored just for you
                        </Text>
                    </Animated.View>

                    {/* Button with Poppins SemiBold */}
                    <Animated.View entering={FadeInDown.delay(800)}>
                        <TouchableOpacity
                            className="bg-yellow-900 py-4 rounded-full flex-row items-center justify-center"
                            onPress={() => navigation.replace('Home')}
                        >
                            <Text
                                className="text-white mr-2"
                                style={{
                                    fontFamily: Fonts.Poppins.semiBold,
                                    fontSize: FontSizes.lg
                                }}
                            >
                                Get Started
                            </Text>
                            <ArrowRight size={20} color="#fff" />
                        </TouchableOpacity>

                        <TouchableOpacity
                            className="mt-4"
                            onPress={() => navigation.replace('Home')}
                        >
                            <Text
                                className="text-white/70 text-center underline"
                                style={{
                                    fontFamily: Fonts.Poppins.regular,
                                    fontSize: FontSizes.sm
                                }}
                            >
                                Skip for now
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </View>
            </ImageBackground>
        </View>
    );
};

export default GetStartedScreen;