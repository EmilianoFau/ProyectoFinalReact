import { createContext, useContext, useState, useEffect } from 'react';
import Notifications from '../services/notifications';
import { getElement } from '../shared/server';
import Styles from '../components/Notifications/index.module.css';

export const NotificationsContext = createContext();

export const useNotifications = () => {
    return useContext(NotificationsContext);
};

export function NotificationsProvider({ children }) {
    const notificationsManager = new Notifications();
    const [notifications, setNotifications] = useState([]);
    const [friendsCount, setFriendsCount] = useState(0);

    // Obtener el userId desde localStorage
    const userId = localStorage.getItem('profileId');

    useEffect(() => {
        const storedNotifications = notificationsManager.getNotifications();
        setNotifications(storedNotifications);
    }, []);

    useEffect(() => {
        console.log('Actualizando notificaciones en localStorage:', notifications);
        localStorage.setItem('notifications', JSON.stringify(notifications));
    }, [notifications]);

    // Monitorear cambios en los seguidores cada 5 segundos
    useEffect(() => {
        if (!userId) {
            console.error("No profileId found");
            return;
        }

        const interval = setInterval(async () => {
            try {
                const token = localStorage.getItem("token");
                if (!token) {
                    console.error("No token found");
                    return;
                }

                const data = await getElement('http://localhost:3001/api/user/profile', userId, token);
                const currentFriendsCount = data.user.friends.length;
                const previousFriendsCount = parseInt(localStorage.getItem('friendsCount'), 10);

                if (currentFriendsCount > previousFriendsCount) {
                    const newFollowersCount = currentFriendsCount - previousFriendsCount;
                    console.log(`Nuevos seguidores detectados: ${newFollowersCount}`);
                    const updatedNotifications = notificationsManager.addNotification({
                        type: 'success',
                        message: `Tienes ${newFollowersCount} nuevo(s) seguidor(es).`,
                    });
                    setNotifications([...updatedNotifications]);
                }
                
                // Actualiza el contador de amigos en localStorage
                localStorage.setItem('friendsCount', currentFriendsCount.toString());
                setFriendsCount(currentFriendsCount);
            } catch (err) {
                console.error("Error al obtener los datos del perfil: ", err);
            }
        }, 5000); // Revisar cada 5 segundos

        // Limpiar el intervalo cuando se desmonte el componente
        return () => clearInterval(interval);
    }, [userId]);

    const addNotification = (notification) => {
        const updatedNotifications = notificationsManager.addNotification(notification);
        console.log('Agregando notificación:', notification);
        setNotifications([...updatedNotifications]);
    };

    const removeNotification = (id) => {
        const updatedNotifications = notificationsManager.removeNotification(id);
        console.log('Eliminando notificación con ID:', id);
        setNotifications([...updatedNotifications]);
    };

    const clearNotifications = () => {
        notificationsManager.clearNotifications();
        console.log('Limpiando todas las notificaciones');
        setNotifications([]);
    };

    return (
        <NotificationsContext.Provider
            value={{
                notifications,
                addNotification,
                removeNotification,
                clearNotifications,
            }}
        >
            {children}
        </NotificationsContext.Provider>
    );
}
