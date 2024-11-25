import React from 'react';
import { useNotifications } from '../../contexts/notifications';
import Styles from './index.module.css';

const Notifications = () => {
    const { notifications, removeNotification } = useNotifications();

    console.log('Renderizando componente Notifications con:', notifications);
    console.log('Clases aplicadas:', Styles);

    return (
        <div className={Styles['notifications-container']}>
            <h2 className={Styles['notifications-title']}>Notificaciones</h2>
            <ul className={Styles['notifications-list']}>
                {notifications.map((notification) => (
                    <li key={notification.id} className={Styles['notification-item']}>
                        <p>{notification.message}</p>
                        <div className={Styles['notification-actions']}>
                            <button className={Styles['notification-button']} onClick={() => removeNotification(notification.id)}>Eliminar</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Notifications;
