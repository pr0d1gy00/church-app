import axios, { isAxiosError } from "axios";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert } from "react-native";
import { useAuthOfProvider } from "./AuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useAuth() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { login, dataUserWithBiometrics } = useAuthOfProvider();
	const [hola, setHola] = useState<any>(null);
	const llamada = async () => {
		const data = await AsyncStorage.getItem("credentialsToLoginWithBiometrics");
		if (data) {
			setHola(JSON.parse(data));
		}
	};
	useEffect(() => {
		llamada();
	}, []);
	const handleChange = ({
		name,
		value,
	}: {
		name: string;
		value: string;
	}) => {
		setUser({
			...user,
			[name]: value,
		});
	};
	const [loading, setLoading] = useState(false);

	const handleSubmit = async () => {
		setLoading(true);
		if (!user.email || !user.password) {
			Alert.alert("Por favor, completa todos los campos");
			setLoading(false);
			return;
		}
		const userData = {
			email: user.email,
			password: user.password,
		};

		try {
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/auth/login`,
				{
					...userData,
				}
			);

			if (response.status >= 200 && response.status < 300) {
				login(response.data.user);
				setUser({
					email: "",
					password: "",
				});
				router.replace("/(tabs)");
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo autenticar el usuario"
				);
		} finally {
			setLoading(false);
		}
	};

	const handleLoginWithBiometrics = async () => {
			setLoading(true);
			if(!dataUserWithBiometrics){
				Alert.alert("No hay datos para login con biometría");
				setLoading(false);
				return;
			}
			try {
				const response = await axios.post(
					`${process.env.EXPO_PUBLIC_API_URL}/church/auth/login/biometric`,
					{
						...dataUserWithBiometrics,
					}
				);
				if (response.status >= 200 && response.status < 300) {
					login(response.data.user);
					setUser({
						email: "",
						password: "",
					});
					router.replace("/(tabs)");
				}
			} catch (error) {
				if (isAxiosError(error))
					Alert.alert(
						error.response?.data?.message || "Error",
						"No se pudo autenticar el usuario"
					);
			} finally {
				setLoading(false);
			}

	};

	return {
		user,
		handleChange,
		handleSubmit,
		handleLoginWithBiometrics,
		setUser,
		loading,
	};
}
