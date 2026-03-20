// src/utils/fonts.js
import { Platform } from 'react-native';

export const Fonts = {
    // Poppins Family
    Poppins: {
        regular: Platform.select({
            ios: 'Poppins-Regular',
            android: 'Poppins-Regular',
        }),
        medium: Platform.select({
            ios: 'Poppins-Medium',
            android: 'Poppins-Medium',
        }),
        semiBold: Platform.select({
            ios: 'Poppins-SemiBold',
            android: 'Poppins-SemiBold',
        }),
        bold: Platform.select({
            ios: 'Poppins-Bold',
            android: 'Poppins-Bold',
        }),
    },

    // Playfair Display Family (for headings)
    Playfair: {
        regular: Platform.select({
            ios: 'PlayfairDisplay-Regular',
            android: 'PlayfairDisplay-Regular',
        }),
        bold: Platform.select({
            ios: 'PlayfairDisplay-Bold',
            android: 'PlayfairDisplay-Bold',
        }),
    },

    // Montserrat Family
    Montserrat: {
        regular: Platform.select({
            ios: 'Montserrat-Regular',
            android: 'Montserrat-Regular',
        }),
        medium: Platform.select({
            ios: 'Montserrat-Medium',
            android: 'Montserrat-Medium',
        }),
        semiBold: Platform.select({
            ios: 'Montserrat-SemiBold',
            android: 'Montserrat-SemiBold',
        }),
        bold: Platform.select({
            ios: 'Montserrat-Bold',
            android: 'Montserrat-Bold',
        }),
    },
};

// Font size constants
export const FontSizes = {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
};

// Predefined text styles
export const TextStyles = {
    h1: {
        fontFamily: Fonts.Playfair.bold,
        fontSize: FontSizes['4xl'],
    },
    h2: {
        fontFamily: Fonts.Playfair.bold,
        fontSize: FontSizes['3xl'],
    },
    h3: {
        fontFamily: Fonts.Poppins.semiBold,
        fontSize: FontSizes['2xl'],
    },
    body: {
        fontFamily: Fonts.Poppins.regular,
        fontSize: FontSizes.base,
    },
    caption: {
        fontFamily: Fonts.Poppins.medium,
        fontSize: FontSizes.sm,
    },
};