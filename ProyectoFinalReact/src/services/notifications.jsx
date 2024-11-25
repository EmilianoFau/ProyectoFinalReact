class Notifications {
    constructor() {
        if (!localStorage.getItem('notifications')) {
            localStorage.setItem('notifications', JSON.stringify([]));
        }
        if (!localStorage.getItem('friendsCount')) {
            localStorage.setItem('friendsCount', '0');
        }
    }

    // Obtener todas las notificaciones
    getNotifications() {
        return JSON.parse(localStorage.getItem('notifications')) || [];
    }

    // Agregar una notificación nueva
    addNotification(notification) {
        const notifications = this.getNotifications();
        notifications.push({
            id: new Date().getTime(),
            ...notification,
        });
        localStorage.setItem('notifications', JSON.stringify(notifications));
        return notifications;
    }

    // Eliminar una notificación por su ID
    removeNotification(id) {
        let notifications = this.getNotifications();
        notifications = notifications.filter(notification => notification.id !== id);
        localStorage.setItem('notifications', JSON.stringify(notifications));
        return notifications;
    }

    // Limpiar todas las notificaciones
    clearNotifications() {
        localStorage.setItem('notifications', JSON.stringify([]));
    }
}

export default Notifications;
