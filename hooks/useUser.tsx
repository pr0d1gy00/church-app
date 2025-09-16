import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import useGetAllUser from "./useGetAllUser";
import { registerForPushNotificationsAsync } from "./useNotification";
import { showConfirmationAlert } from "../helpers/alert";

interface DataUserRegister {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role?: string;
	deletedAt?: string | null;
}

export default function useUser() {
	const [loading, setLoading] = useState(false);
	const [dataUserRegister, setDataUserRegister] =
		useState<DataUserRegister>({
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
			role: "",
			deletedAt: null,
		});
	const { id } = useLocalSearchParams();
	console.log(dataUserRegister.deletedAt)
	const confirmDeleteUser = () => {
		showConfirmationAlert({
			title: "Confirmar eliminación",
			message: "¿Estás seguro de que deseas eliminar este usuario?",
			onConfirm: () => handleDeleteUser(Number(id)),
		});
	}
		const handleDeleteUser = async (id:number)=>{
				try {
					const response = await axios.delete(`${process.env.EXPO_PUBLIC_API_URL}/church/users/deleteUserbyId`,{
						params: { id },
					});
					Alert.alert(response.data.message || "Usuario eliminado con éxito");
					router.back();
				} catch (error) {
					if (axios.isAxiosError(error)) {
						Alert.alert(
							error.response?.data?.message || "Error",
							"No se pudo eliminar el usuario"
						);
					}
				}
			}
	const confirmActivateUser = () => {
		showConfirmationAlert({
			title: "Confirmar Activación",
			isDelete: false,
			message: "¿Estás seguro de que deseas activar este usuario?",
			onConfirm: () => handleActivateUser(Number(id)),
		});
	}

	const handleChange = ({
		name,
		value,
	}: {
		name: string;
		value: string;
	}) => {
		setDataUserRegister({
			...dataUserRegister,
			[name]: value,
		});
	};
	const fetchUserById = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/users/getUserbyId`,
				{
					params: { id },
				}
			);
			console.log(response.data)
			setDataUserRegister({
				name: response.data.user.name,
				email: response.data.user.email,
				password: "",
				confirmPassword: "",
				role: response.data.user.role,
				deletedAt: response.data.user.deletedAt,
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener la información del usuario"
				);
			}
		} finally {
			setLoading(false);
		}
	};

	const handleActivateUser = async (id:number)=>{
		try {
			const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/church/users/activateUserbyId`,{},{
				params: { id },
			});
			Alert.alert(response.data.message || "Usuario activado con éxito");
			router.back();
		} catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo activar el usuario"
				);
			}
		}
	}

	const handleRemoveLeadership = (userId: number) => {
		Alert.alert(
			"Confirmar",
			"¿Estás seguro de que quieres quitar el liderazgo a este usuario?",
			[
				{ text: "Cancelar" },
				{
					text: "Sí, quitar",
					onPress: () => {
						fetchRemoveLeadership(userId);
					},
				},
			]
		);
	};
	const fetchRemoveLeadership = async (userId: number) => {
		try
		{
			const response = await axios.put(`${process.env.EXPO_PUBLIC_API_URL}/church/users/removeLeaderFromCells`,{},{
				params: {
					userId
				}
			});
			Alert.alert(response.data.message || "Liderazgo quitado con éxito");
		}catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo quitar el liderazgo"
				);
			}
	}
	};
	const handleSubmit = async () => {
		setLoading(true);
		const token = await registerForPushNotificationsAsync();
		if (!id) {
			if (
				!dataUserRegister.name ||
				!dataUserRegister.email ||
				!dataUserRegister.password ||
				!dataUserRegister.confirmPassword
			) {
				Alert.alert("Por favor, completa todos los campos");
				setLoading(false);

				return;
			}
			if(dataUserRegister.password.length < 5 || dataUserRegister.confirmPassword.length > 18){
				Alert.alert("La contraseña debe tener entre 5 y 18 caracteres");
				setLoading(false);
				return;
			}
			if (
				dataUserRegister.password !==
				dataUserRegister.confirmPassword
			) {
				Alert.alert("Las contraseñas no coinciden");
				setLoading(false);

				return;
			}
			const user = {
				name: dataUserRegister.name,
				email: dataUserRegister.email,
				password: dataUserRegister.password,
				role: "MEMBER",
			};
			const device = {
				deviceToken: token,
				platform: Platform.OS,
			};
			const userData = {
				user,
				device,
			};
			try {
				const response = await axios.post(
					`${process.env.EXPO_PUBLIC_API_URL}/church/users/createUser`,
					userData
				);
				if (response.status >= 200 && response.status < 300) {
					Alert.alert("Usuario registrado con éxito");
					setDataUserRegister({
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
					});
					router.back();
				}
			} catch (error) {
				if (axios.isAxiosError(error)) {
					Alert.alert(
						error.response?.data?.message || "Error",
						"No se pudo registrar el usuario"
					);
				}
			} finally {
				setLoading(false);
			}
		} else {
			const token = await registerForPushNotificationsAsync();

			if (!dataUserRegister.name || !dataUserRegister.email) {
				Alert.alert("Por favor, completa todos los campos");
				setLoading(false);

				return;
			}
			if (
				dataUserRegister.password.length > 0 ||
				dataUserRegister.confirmPassword.length > 0
			) {
				if (
					dataUserRegister.password !==
					dataUserRegister.confirmPassword
				) {
					Alert.alert("Las contraseñas no coinciden");
					setLoading(false);

					return;
				}
			}
			const user = {
				name: dataUserRegister.name,
				email: dataUserRegister.email,
				password: dataUserRegister.password
					? dataUserRegister.password
					: undefined,
				confirmPassword: dataUserRegister.confirmPassword
					? dataUserRegister.confirmPassword
					: undefined,
				role: dataUserRegister.role,
			};
			const device = {
				deviceToken: token,
				platform: Platform.OS,
			};
			const userData = {
				user,
				device,
			};
			try {
				const response = await axios.put(
					`${process.env.EXPO_PUBLIC_API_URL}/church/users/updateUserbyId`,
					userData,
					{
						params: { id },
					}
				);
				if (response.status >= 200 && response.status < 300) {
					Alert.alert("Usuario actualizado con éxito");
					setDataUserRegister({
						name: "",
						email: "",
						password: "",
						confirmPassword: "",
					});
					router.back();
				}
			} catch (error) {
				Alert.alert(
					"Error",
					"No se pudo actualizar el usuario"
				);
			} finally {
				setLoading(false);
			}
		}
	};

	useEffect(() => {
		if (id) {
			fetchUserById();
		}
	}, [id]);
	return {
		dataUserRegister,
		handleChange,
		handleSubmit,
		loading,
		setDataUserRegister,
		handleRemoveLeadership,
		confirmDeleteUser,
		confirmActivateUser,

	};
}
