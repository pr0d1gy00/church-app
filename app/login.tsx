import React from "react";
import {
	View,
	Text,
	TextInput,
	Image,
	TouchableOpacity,
	ScrollView,
} from "react-native";

import { Link } from "expo-router";
import useAuth from "../hooks/useAuth";
const imageLogin = require("../assets/LogoJuvenilAsset 24.png");

export default function Login() {
	const { user, handleChange, handleSubmit } = useAuth();
	return (
		<ScrollView
			className="w-full h-full"
			contentContainerStyle={{
				flexGrow: 1,
				justifyContent: "center",
				alignItems: "center",
			}}
			style={{ backgroundColor: 'white' }}
		>

				<View className="items-center pt-24 flex-col w-full h-full ">
				<Image
					source={imageLogin}
					className="w-48 h-48 mb-6 object-contain"
					resizeMode="contain"
				/>
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
					<Link href="/registercell" className="text-[#73937e] text-xl mt-4">
						Cambiar contraseña{" "}
					</Link>
					<Link
						href="/registeruser"
						className="text-[#73937e] text-xl mt-4"
					>
						Registrarse
					</Link>
				</View>

					</View>
		</ScrollView>
	);
}