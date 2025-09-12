import { useEffect, useState } from "react";
import { Alert, Platform } from "react-native";
import axios from "axios";
import { router, useLocalSearchParams } from "expo-router";
import useGetAllUser from "./useGetAllUser";

interface DataUserRegister {
	name: string;
	email: string;
	password: string;
	confirmPassword: string;
	role?: string;
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
		});
	const { id } = useLocalSearchParams();

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
				`http://192.168.110.232:4000/church/users/getUserbyId`,
				{
					params: { id },
				}
			);
			setDataUserRegister({
				name: response.data.user.name,
				email: response.data.user.email,
				password: "",
				confirmPassword: "",
				role: response.data.user.role,
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
			console.log(userId)
			const response = await axios.put('http://192.168.110.232:4000/church/users/removeLeaderFromCells',{},{
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
				deviceToken: "jhdjhdklasjkdhaskjldhjklasq12313",
				platform: Platform.OS,
			};
			const userData = {
				user,
				device,
			};
			try {
				const response = await axios.post(
					"http://192.168.110.232:4000/church/users/createUser",
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
				Alert.alert(
					"Error",
					"No se pudo registrar el usuario"
				);
			} finally {
				setLoading(false);
			}
		} else {
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
				deviceToken: "jhdjhdklasjkdhaskjldhjklasq12313",
				platform: Platform.OS,
			};
			const userData = {
				user,
				device,
			};
			try {
				const response = await axios.put(
					"http://192.168.110.232:4000/church/users/updateUserbyId",
					userData,
					{
						params: { id },
					}
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
				Alert.alert(
					"Error",
					"No se pudo registrar el usuario"
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
		handleRemoveLeadership
	};
}
