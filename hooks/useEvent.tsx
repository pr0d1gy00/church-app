import { useAuthOfProvider } from "./AuthContext";
import { useCallback, useEffect, useState } from "react";
import {
	EventByIdApiResponse,
	EventData,
	EventsApiResponse,
} from "../interfaces/event.interfaces";
import { Alert } from "react-native";
import axios, { isAxiosError } from "axios";
import {
	router,
	useFocusEffect,
	useLocalSearchParams,
} from "expo-router";
import { UsersApiResponse } from "../interfaces/user.interfaces";
import { showConfirmationAlert } from "../helpers/alert";

export default function useEvent() {
	const { user } = useAuthOfProvider();
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
	const [eventDataByUserId, setEventDataByUserId] = useState<EventsApiResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [eventDataById, setEventDataById] =
		useState<EventByIdApiResponse | null>(null);
	const [selectedEventToSend, setSelectedEventToSend] = useState<
		number | null
	>(null);
	const [allUsers, setAllUsers] = useState<UsersApiResponse | null>(
		null
	);
	const [allEvents, setAllEvents] =
		useState<EventsApiResponse | null>(null);
	const [eventData, setEventData] = useState<
		Omit<EventData, "createdBy">
	>({
		title: "",
		eventDate: new Date(),
		description: "",
		location: "",
		notifyAll: false,
	});
	const { id } = useLocalSearchParams();
	const handleChange = (
		name: string,
		value: string | Date | boolean
	) => {
		setEventData({
			...eventData,
			[name]: value,
		});
	};
	const fetchAllEvents = async () => {
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events`
			);
			setAllEvents(response.data);
		} catch (error) {
			Alert.alert("Error", "No se pudieron cargar los eventos. Estamos resolviéndolo.");
		}
	};
	const confirmAndDeleteUserOfEvent = (id: number) => {
		showConfirmationAlert({
			title: "Confirmar eliminación",
			message:
				"¿Estás seguro de que deseas eliminar este usuario del evento?",
			onConfirm: () => {
				handleDeleteUserOfEvent(id);
			},
		});
	};
	const confirmDeleteEvent = (id:number) => {
		showConfirmationAlert({
			title: "Confirmar eliminación",
			message: "¿Estás seguro de que deseas eliminar este evento?",
			onConfirm: () => {
				handleDeleteEvent(id);
			},
		});
	};
	const handleDeleteEvent = async (id:number) => {
		try {
			const response = await axios.delete(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/deleteEvent`,
				{
					params: {
						eventId: id,
						userId: user!.id
					},
				}
			);
			if (response.status === 200) {
				Alert.alert(
					response.data.message ||
						"Evento eliminado con éxito"
				);
				router.back();
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo eliminar el evento"
				);
		}
	};
	const handleDeleteUserOfEvent = async (idUser: number) => {
		try {
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/removeUserOfEventToNotify`,{},
				{
					params: {
						eventId: id,
						userId: idUser,
					},
				}
			);
			if (response.status === 200) {
				Alert.alert(
					response.data.message ||
						"Usuario eliminado con éxito"
				);
				fetchEventById(id as string);
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo eliminar el usuario del evento"
				);
		}
	};
	const fetchEventByUserId = async (id: string) => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/getEventByUserSubscription`,
				{
					params: { userId: id },
				}
			);
			setEventDataByUserId(response.data);
		} catch (error) {
			Alert.alert("Error", "No se pudo obtener la información del evento.Estamos resolviéndolo.");
		}finally{
			setLoading(false);
		}
	};
	const handleSubmit = async () => {
		if (!eventData.title || !eventData.eventDate) {
			Alert.alert(
				"Error",
				"El título y la fecha son obligatorios."
			);
			return;
		}
		if(!eventData.location || eventData.description===""){
			Alert.alert(
				"Error",
				"La ubicación y la descripción son obligatorias."
			);
			return;
		}
		setLoading(true);
		try {
			const dataToSend: EventData = {
				...eventData,
				createdBy: user!.id,
			};

			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/createEvent`,
				dataToSend
			);

			if (response.status === 201) {
				Alert.alert("Éxito", "Evento creado correctamente.");
				router.back();
			}
		} catch (error) {
			if (isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo crear el evento."
				);
			} else {
				Alert.alert("Error", "Ocurrió un error inesperado.");
			}
		} finally {
			setLoading(false);
		}
	};
	const handleGetUsers = async () => {
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/users/getAllUsers`
			);
			setAllUsers(response.data);
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener los usuarios"
				);
		}
	};
	const handleValueChange = (userId: number) => {
		setSelectedUsers((currentSelectedUsers) => {
			if (currentSelectedUsers.includes(userId)) {
				// Si ya está seleccionado, lo filtramos (eliminamos)
				return currentSelectedUsers.filter(
					(id) => id !== userId
				);
			} else {
				// Si no está seleccionado, lo agregamos
				return [...currentSelectedUsers, userId];
			}
		});
	};

	const fetchEventById = async (id: string) => {
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/getEventById`,
				{
					params: { id: id ? id : selectedEventToSend },
				}
			);
			setEventDataById(response.data);
		} catch (error) {
			Alert.alert("Error", "No se pudo obtener la información del evento.Estamos resolviéndolo.");
		}
	};
	const handleSubmitAddMemberToEvent = async () => {
		if (!selectedEventToSend || selectedUsers.length === 0) {
			Alert.alert(
				"Por favor, selecciona una célula y al menos un usuario"
			);
			return;
		}
		try {
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/events/addUserToEvent`,
				{
					userId: selectedUsers,
				},
				{
					params: {
						eventId: selectedEventToSend,
					},
				}
			);
			if (response.status >= 200 && response.status < 300) {
				Alert.alert(
					response.data.message ||
						"Miembros 	agregados con éxito"
				);
				setTimeout(() => {
					router.back();
				}, 1000);
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener los usuarios"
				);
		}
	};
	useFocusEffect(
		useCallback(() => {
			if (id || selectedEventToSend) {
				fetchEventById(id as string);
				handleGetUsers();
			}
		}, [id,selectedEventToSend])
	);

	useFocusEffect(
		useCallback(() => {
			fetchAllEvents();
			handleGetUsers();
		}, [])
	);
	useFocusEffect(
		useCallback(() => {
			if (user) {
				fetchEventByUserId(user.id.toString());
			}
		}, [user])
	);
	return {
		eventData,
		handleChange,
		handleSubmit,
		loading,
		allEvents,
		eventDataById,
		allUsers,
		id,
		selectedEventToSend,
		setSelectedEventToSend,
		selectedUsers,
		setSelectedUsers,
		handleValueChange,
		handleSubmitAddMemberToEvent,
		confirmAndDeleteUserOfEvent,
		eventDataByUserId,
		confirmDeleteEvent
	};
}
