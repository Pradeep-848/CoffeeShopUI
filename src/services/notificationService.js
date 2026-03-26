import notifee, {
    AndroidImportance, TriggerType,
} from '@notifee/react-native';

class NotificationService {
    async requestPermission() {
        await notifee.requestPermission();
    }

    async createChannel() {
        return await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            importance: AndroidImportance.HIGH,
        });
    }

    async displayNotification(title, body, data = {}) {
        const channelId = await this.createChannel();

        await notifee.displayNotification({
            title,
            body,
            android: {
                channelId,
                pressAction: {
                    id: 'default',
                },
            },
            data,
        });
    }

    async scheduleNotification(title, body, seconds = 5) {
        const channelId = await this.createChannel();

        await notifee.createTriggerNotification(
            {
                title,
                body,
                android: {
                    channelId,
                },
            },
            {
                type: TriggerType.TIMESTAMP,
                timestamp: Date.now() + seconds * 1000,
            }
        );
    }

    async cancelAll() {
        await notifee.cancelAllNotifications();
    }
}

export default new NotificationService();