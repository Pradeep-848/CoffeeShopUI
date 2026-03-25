import { useEffect, useCallback } from 'react';
import notifee from '@notifee/react-native';
import notificationService from '../services/notificationService';

export const useNotifee = () => {
    // Initialize notifications on component mount
    useEffect(() => {
        const initializeNotifications = async () => {
            // Request permissions
            await notificationService.requestPermissions();

            // Create channels
            await notificationService.createChannels();

            // Handle notification press
            const unsubscribe = notifee.onForegroundEvent(({ type, detail }) => {
                switch (type) {
                    case 'press':
                        // Handle notification press
                        console.log('Notification pressed:', detail.notification);
                        // Navigate based on notification data
                        if (detail.notification?.data?.screen) {
                            // You can add navigation logic here
                            // navigation.navigate(detail.notification.data.screen);
                        }
                        break;
                    case 'action':
                        // Handle action button press
                        console.log('Action pressed:', detail.pressAction?.id);
                        if (detail.pressAction?.id === 'view_order') {
                            // Navigate to order details
                        }
                        break;
                    case 'dismiss':
                        console.log('Notification dismissed');
                        break;
                }
            });

            return () => {
                unsubscribe();
            };
        };

        initializeNotifications();
    }, []);

    // Wrapper functions for easy use
    const showOrderSuccess = useCallback((orderDetails) => {
        return notificationService.showOrderSuccessNotification(orderDetails);
    }, []);

    const showInfo = useCallback((title, body, data = {}) => {
        return notificationService.showInfoNotification(title, body, data);
    }, []);

    const showWarning = useCallback((title, body, data = {}) => {
        return notificationService.showWarningNotification(title, body, data);
    }, []);

    const showError = useCallback((title, body, data = {}) => {
        return notificationService.showErrorNotification(title, body, data);
    }, []);

    const showProgress = useCallback(() => {
        return notificationService.showProgressNotification();
    }, []);

    const cancelAll = useCallback(() => {
        return notificationService.cancelAllNotifications();
    }, []);

    return {
        showOrderSuccess,
        showInfo,
        showWarning,
        showError,
        showProgress,
        cancelAll,
    };
};