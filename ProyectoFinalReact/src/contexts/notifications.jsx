import { createContext, useContext, useState, useEffect } from 'react';

export const NotificationsContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationsContext);
};

export function NotificationsProvider({ children }) {
    const notificationsManager = new Notifications();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const storedNotifications = notificationsManager.getNotifications();
        setNotifications(storedNotifications);
    }, []);

    useEffect(() => {
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    const addNotification = (notification) => {
        notificationsManager.addNotification(notification);
        setNotifications(notificationsManager.getNotifications());
    };

    const removeNotification = (id) => {
        notificationsManager.removeNotification(id);
        setNotifications(notificationsManager.getNotifications());
    };

    const clearNotifications = () => {
        notificationsManager.clearNotifications();
        setNotifications([]);
    };

    const markAsRead = (id) => {
        notificationsManager.markAsRead(id);
        setNotifications(notificationsManager.getNotifications());
    };

    const getUnreadNotifications = () => {
        return notificationsManager.getUnreadNotifications();
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                clearNotifications,
                markAsRead,
                getUnreadNotifications,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
}