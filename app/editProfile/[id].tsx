import React from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
} from "react-native";
import useUser from "../../hooks/useUser";
import { useAuthOfProvider } from "../../hooks/AuthContext";
import { Picker } from "@react-native-picker/picker";

const imageLogin = require("../../assets/LogoJuvenilAsset 24.png");
const roles = ["MEMBER", "LEADER", "ADMIN"];


export default function editProfile() {
	const { dataUserRegister, handleChange, handleSubmit, loading } =
		useUser();
	const { user } = useAuthOfProvider();
	if (loading) {
		return <ActivityIndicator size="large" color="#0000ff" />;
	}
	return (
		<KeyboardAvoidingView style={{ flex: 1 }} behavior="padding">
			<ScrollView
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={{
					width: "100%",
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",

					backgroundColor: "white",
				}}
				className="w-full"
			>
				<Image
					source={imageLogin}
					className="w-48 h-48 mb-6 object-contain"
					resizeMode="contain"
				/>
				<Text className="text-5xl h-12 text-[#73937e] font-bold">
					Editar Datos
				</Text>
				<Text className="text-lg text-[#73937e]">
					Por favor ingresa tus datos
				</Text>
				<View className="flex-col w-[80%] h-auto mt-4">
					<Text className="text-lg font-bold text-[#73937e]">
						Nombre Completo
					</Text>
					<TextInput
						value={dataUserRegister.name}
						id="name"
						className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu nombre completo"
						onChangeText={(e) =>
							handleChange({
								name: "name",
								value: e,
							})
						}
					/>
					<Text className="text-lg font-bold text-[#73937e]">
						Email
					</Text>
					<TextInput
						value={dataUserRegister.email}
						id="email"
						className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu email"
						onChangeText={(e) =>
							handleChange({
								name: "email",
								value: e,
							})
						}
					/>
					{user?.role === "ADMIN" ||
					user?.role === "LEADER" ? (
						<>
							<Text className="text-lg font-bold text-[#73937e]	">
								Contraseña
							</Text>
							<TextInput
								id="password"
								className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
								placeholder="Ingresa tu contraseña"
								secureTextEntry
								value={dataUserRegister.password}
								onChangeText={(e) =>
									handleChange({
										name: "password",
										value: e,
									})
								}
							/>
							<Text className="text-lg font-bold text-[#73937e]">
								Confirmar Contraseña
							</Text>
							<TextInput
								id="confirmPassword"
								className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
								placeholder="Confirma tu contraseña"
								secureTextEntry
								value={dataUserRegister.confirmPassword}
								onChangeText={(e) =>
									handleChange({
										name: "confirmPassword",
										value: e,
									})
								}
							/>
							<Picker
								className="bg-[#ebebeb] focus:border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center"
								selectedValue={dataUserRegister.role}
								onValueChange={(val: string) =>
									handleChange({ name: "role", value: val })
								}
							>
								{
									roles.map((role) => (
										<Picker.Item
											key={role}
											label={role}
											value={role}
										/>
									))
								}

							</Picker>
						</>
					) : null}
				</View>
				<TouchableOpacity
					className="bg-[#0b1c0c] w-[80%] rounded-lg h-12 mt-4 justify-center items-center"
					onPress={() => handleSubmit()}
				>
					<Text className="text-[#ebebeb] text-lg font-bold">
						Actualizar
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
