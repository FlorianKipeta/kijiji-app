import axios from "axios";
import React, { createContext, useContext } from "react";
import { useMemo } from "react";
import { useQuery } from "react-query";

function getNotification() {
	return axios.get(route('notifications')).then(res => res.data);
}

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {

	const { data: notifications, refetch } = useQuery('notifications', getNotification);


	function markAsRead(id) {
		axios.post(route('notifications.read', id)).then(() => {
			refetch()
		});
	}

	function markAllAsRead() {
		axios.post(route('notifications.readAll')).then(() => {
			refetch()
		});
	}

	const totalNotifications = useMemo(() => {
		if (!notifications) {
			return 0;
		}

		return notifications.length;
	}, [notifications]);

	return (
		<NotificationContext.Provider value={{ notifications, markAsRead, markAllAsRead, totalNotifications }}>
			{children}
		</NotificationContext.Provider>
	)
}


export const useNotificationContext = () => useContext(NotificationContext);