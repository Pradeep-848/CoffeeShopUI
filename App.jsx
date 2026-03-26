import './global.css';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import TabNavigator from './src/navigation/TabNavigator';

import { CartProvider } from './src/context/CartContext';
import GetStartedScreen from './src/screens/GetStartedScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import CartScreen from './src/screens/CartScreen';
import OrderScreen from './src/screens/OrderScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import OrderTrackingScreen from './src/screens/OrderTrackingScreen';

import NotificationService from './src/services/notificationService';

import { FavoritesProvider, useFavorites } from './src/context/FavoritesContext';

const Stack = createNativeStackNavigator();

const App = () => {

  useEffect(() => {
    NotificationService.requestPermission();
  }, []);

  return (
    <SafeAreaProvider>
      <FavoritesProvider>

        <CartProvider>
          <NavigationContainer>
            <Stack.Navigator
              initialRouteName="GetStarted"
              screenOptions={{
                headerStyle: {
                  backgroundColor: "#713f12",
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                  fontWeight: 'bold',
                },
              }}
            >
              <Stack.Screen
                name="GetStarted"
                component={GetStartedScreen}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Home"
                component={TabNavigator}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="Details"
                component={DetailsScreen}
                options={{ title: 'Coffee Details' }}
              />
              <Stack.Screen
                name="Cart"
                component={CartScreen}
                options={{ title: 'Your Cart' }}
              />
              <Stack.Screen
                name="Order"
                component={OrderScreen}
                options={{ title: 'Place Order' }}
              />
              <Stack.Screen
                name="Favorites"
                component={FavoritesScreen}
                options={{ title: 'Favorites' }}
              />
              <Stack.Screen
                name="Profile"
                component={ProfileScreen}
                options={{ title: 'Profile' }}
              />
              <Stack.Screen
                name="OrderTracking"
                component={OrderTrackingScreen}
                options={{ title: 'Order Tracking' }}
              />
            </Stack.Navigator>
          </NavigationContainer>
        </CartProvider>
      </FavoritesProvider>
    </SafeAreaProvider>
  );
};

export default App;