import axios, { isAxiosError } from "axios";
import { router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import { useAuthOfProvider } from "./AuthContext";

export default function useAuth() {
	const [user, setUser] = useState({
		email: "",
		password: "",
	});
	const { login } = useAuthOfProvider();
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
	const handleSubmit = async () => {
		if (!user.email || !user.password) {
			Alert.alert("Por favor, completa todos los campos");
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
				Alert.alert("Usuario autenticado con éxito");
				login(response.data.user);
				setUser({
					email: "",
					password: "",
				});
				router.replace("/(tabs)");
			}
		} catch (error) {
			if(isAxiosError(error))
			Alert.alert(error.response?.data?.message || "Error", "No se pudo autenticar el usuario");
		}
	};
	return {
		user,
		handleChange,
		handleSubmit
	};
}
