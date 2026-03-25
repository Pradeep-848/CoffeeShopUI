import notifee, { AndroidImportance, AndroidStyle } from '@notifee/react-native';
import { Platform } from 'react-native';

class NotificationService {
    // Create notification channel (Android only)
    async createChannels() {
        if (Platform.OS === 'android') {
            // Order Channel
            await notifee.createChannel({
                id: 'order_channel',
                name: 'Order Notifications',
                importance: AndroidImportance.HIGH,
                vibration: true,
                sound: 'default',
                lights: true,
                lightColor: '#4CAF50',
            });

            // General Channel
            await notifee.createChannel({
                id: 'general_channel',
                name: 'General Notifications',
                importance: AndroidImportance.DEFAULT,
                vibration: true,
                sound: 'default',
            });

            // Promo Channel
            await notifee.createChannel({
                id: 'promo_channel',
                name: 'Promotional Notifications',
                importance: AndroidImportance.LOW,
            });
        }
    }

    // Request permissions
    async requestPermissions() {
        const settings = await notifee.requestPermissions();

        if (settings.authorizationStatus === 1) {
            console.log('Notification permissions granted');
            return true;
        } else {
            console.log('Notification permissions denied');
            return false;
        }
    }

    // Display order success notification
    async showOrderSuccessNotification(orderDetails) {
        await this.createChannels();

        // Display notification
        await notifee.displayNotification({
            id: `order_${Date.now()}`,
            title: 'Order Placed Successfully! 🎉',
            body: `Thank you ${orderDetails.fullName}! Your order has been confirmed.`,
            data: {
                screen: 'OrderDetails',
                orderId: orderDetails.orderId || 'ORD123',
                type: 'order_success',
            },
            android: {
                channelId: 'order_channel',
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default',
                    mainComponent: 'main',
                },
                style: {
                    type: AndroidStyle.BIGTEXT,
                    text: `Order Amount: $${orderDetails.total || '0'}\nItems: ${orderDetails.items || '3 items'}\nDelivery to: ${orderDetails.address}`,
                },
                color: '#4CAF50',
                autoCancel: true,
                actions: [
                    {
                        title: 'View Order',
                        pressAction: {
                            id: 'view_order',
                            mainComponent: 'main',
                        },
                    },
                    {
                        title: 'Track Order',
                        pressAction: {
                            id: 'track_order',
                            mainComponent: 'main',
                        },
                    },
                ],
            },
            ios: {
                sound: 'default',
                categoryId: 'order',
                attachments: [
                    {
                        url: 'https://example.com/icon.png',
                        identifier: 'icon',
                    },
                ],
            },
        });
    }

    // Show info notification
    async showInfoNotification(title, body, data = {}) {
        await this.createChannels();

        await notifee.displayNotification({
            id: `info_${Date.now()}`,
            title: title,
            body: body,
            data: data,
            android: {
                channelId: 'general_channel',
                importance: AndroidImportance.DEFAULT,
                pressAction: {
                    id: 'default',
                    mainComponent: 'main',
                },
                autoCancel: true,
            },
        });
    }

    // Show warning notification
    async showWarningNotification(title, body, data = {}) {
        await this.createChannels();

        await notifee.displayNotification({
            id: `warning_${Date.now()}`,
            title: `⚠️ ${title}`,
            body: body,
            data: data,
            android: {
                channelId: 'general_channel',
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default',
                    mainComponent: 'main',
                },
                color: '#FF9800',
                autoCancel: true,
            },
        });
    }

    // Show error notification
    async showErrorNotification(title, body, data = {}) {
        await this.createChannels();

        await notifee.displayNotification({
            id: `error_${Date.now()}`,
            title: `❌ ${title}`,
            body: body,
            data: data,
            android: {
                channelId: 'general_channel',
                importance: AndroidImportance.HIGH,
                pressAction: {
                    id: 'default',
                    mainComponent: 'main',
                },
                color: '#F44336',
                autoCancel: true,
            },
        });
    }

    // Show progress notification (e.g., order processing)
    async showProgressNotification() {
        await this.createChannels();

        const notificationId = 'order_processing';

        await notifee.displayNotification({
            id: notificationId,
            title: 'Processing Your Order',
            body: 'Please wait while we confirm your order...',
            android: {
                channelId: 'order_channel',
                progress: {
                    max: 100,
                    current: 0,
                    indeterminate: true,
                },
                onlyAlertOnce: true,
                autoCancel: false,
            },
        });

        // Simulate progress update
        let progress = 0;
        const interval = setInterval(async () => {
            progress += 20;
            if (progress <= 100) {
                await notifee.displayNotification({
                    id: notificationId,
                    title: 'Processing Your Order',
                    body: `Progress: ${progress}%`,
                    android: {
                        channelId: 'order_channel',
                        progress: {
                            max: 100,
                            current: progress,
                            indeterminate: false,
                        },
                        onlyAlertOnce: true,
                        autoCancel: false,
                    },
                });
            }
            if (progress >= 100) {
                clearInterval(interval);
                await notifee.cancelNotification(notificationId);
            }
        }, 1000);
    }

    // Cancel notification
    async cancelNotification(notificationId) {
        await notifee.cancelNotification(notificationId);
    }

    // Cancel all notifications
    async cancelAllNotifications() {
        await notifee.cancelAllNotifications();
    }

    // Get displayed notifications
    async getDisplayedNotifications() {
        const notifications = await notifee.getDisplayedNotifications();
        return notifications;
    }
}

export default new NotificationService();