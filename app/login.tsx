import React, { useEffect, useState } from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native";
import * as LocalAuthentication from "expo-local-authentication";
import { Link, router } from "expo-router";
import useAuth from "../hooks/useAuth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";
const imageLogin = require("../assets/LogoJuvenilAsset 24.png");

export default function Login() {
	const { user, handleChange, handleSubmit, setUser, loading } =
		useAuth();
	const [checkingBiometric, setCheckingBiometric] = useState(false);
	const [storedUser, setStoredUser] = useState<boolean | null>(null);
	const fetchStoredUser = async () => {
		const user = await AsyncStorage.getItem("isFirstLogin");
		const isFirstLogin = user ? JSON.parse(user) : true;
		console.log('isFirstLogin',isFirstLogin)
		setStoredUser(isFirstLogin);
	};

	useEffect(() => {
		console.log(AsyncStorage.getItem("isFirstLogin"));

		fetchStoredUser();
	}, []);
	const checkBiometricLogin = async () => {
		setCheckingBiometric(true);
		const storedUser = await AsyncStorage.getItem("isFirstLogin");
		if (storedUser === null) {
			router.replace("/login");
		}
		const credentials = await AsyncStorage.getItem(
			"credentialsToLoginWithBiometrics"
		);
		const hasHardware =
			await LocalAuthentication.hasHardwareAsync();
		console.log("hasHardware:", hasHardware);
		const isEnrolled =
			await LocalAuthentication.isEnrolledAsync();
		console.log("enrolled:", isEnrolled);
		if (hasHardware && isEnrolled) {
			const result =
				await LocalAuthentication.authenticateAsync({
					promptMessage: "Accede con tu huella",
				});
			if (result.success) {
				setUser(JSON.parse(credentials!));
				setTimeout(() => {
					handleSubmit();
				}, 500);
			} else {
				// Si falla, borra el usuario y manda al login
				await AsyncStorage.removeItem("user");
				router.replace("/login");
			}
		}
		setCheckingBiometric(false);
	};

	if (checkingBiometric) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#fff",
					opacity: 0.5,
				}}
			>
				<ActivityIndicator size="large" color="#333" />
				<Text style={{ marginTop: 10, color: "#333" }}>
					Verificando biometría...
				</Text>
			</View>
		);
	}
	if (loading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#fff",
					opacity: 0.1,
				}}
			>
				<ActivityIndicator size="large" color="#1e1e1e" />
				<Text style={{ marginTop: 10, color: "#333" }}>
					Cargando...
				</Text>
			</View>
		);
	}

	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<ScrollView
				className="w-full h-full"
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
				style={{ backgroundColor: "white" }}
			>
				<View className="items-center pt-24 flex-col w-full h-full ">
					<View className="w-32 h-32 mb-6">
						<Image
							source={imageLogin}
							className="w-32 h-32 mb-6 object-contain"
							resizeMode="contain"
							width={128}
							height={128}
							style={{
								width: 128,
								height: 128,
								resizeMode: "contain",
							}}
						/>
					</View>
					<Text></Text>
					<Text className="text-5xl text-[#73937e] font-bold">
						Iniciar Sesión
					</Text>
					<Text className="text-lg text-[#73937e]">
						Por favor ingresa tus credenciales
					</Text>
					<View className="flex-col w-[80%] h-auto mt-6">
						<Text className="text-lg font-bold text-[#73937e]">
							Email
						</Text>
						<TextInput
							value={user.email}
							id="email"
							onChangeText={(e) =>
								handleChange({
									name: "email",
									value: e,
								})
							}
							className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
							placeholder="Ingresa tu email"
						/>
						<Text className="text-lg font-bold text-[#73937e]">
							Contraseña
						</Text>
						<TextInput
							value={user.password}
							id="password"
							onChangeText={(e) =>
								handleChange({
									name: "password",
									value: e,
								})
							}
							className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
							placeholder="Ingresa tu contraseña"
							secureTextEntry
						/>
						<TouchableOpacity
							className="bg-[#0b1c0c] rounded-lg w-full h-12 mt-4 justify-center items-center"
							onPress={() => handleSubmit()}
						>
							<Text className="text-[#f2f2f2] text-lg font-bold">
								Iniciar Sesión
							</Text>
						</TouchableOpacity>
					</View>
					<View className="w-[70%] flex-row justify-center items-center mt-4">
						<View className="w-36 border border-[#f2f2f2] "></View>
						<Text className="text-[#f2f2f2] mx-2">O</Text>
						<View className="w-36 border border-[#f2f2f2] "></View>
					</View>
					<View className="w-[78%] flex-row justify-between items-center mt-2">
						<Link
							href="/registercell"
							className="text-[#73937e] text-xl mt-4"
						>
							Cambiar contraseña{" "}
						</Link>
						<Link
							href="/registeruser"
							className="text-[#73937e] text-xl mt-4"
						>
							Registrarse
						</Link>
					</View>
					{storedUser === false && (
						<TouchableOpacity
							onPress={() => checkBiometricLogin()}
							style={{
								flexDirection: "row",
								alignItems: "center",
								backgroundColor: "#e6f0ea",
								padding: 12,
								borderRadius: 8,
								marginTop: 16,
								justifyContent: "center",
								width: 100,
							}}
						>
							<Ionicons
								name="finger-print"
								size={42}
								color="#73937e"
							/>
						</TouchableOpacity>
					)}
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
