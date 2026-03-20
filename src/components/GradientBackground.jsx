import React from 'react';
import { View } from 'react-native';

export const GradientBackground = ({ colors, children, className, style }) => {
    // Simple View with background color fallback
    // For actual gradients, you'd need react-native-linear-gradient
    return (
        <View className={className} style={[style, { backgroundColor: colors[0] }]}>
            {children}
        </View>
    );
};