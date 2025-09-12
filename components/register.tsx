import React from 'react'
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
const imageLogin = require("../assets/ArtXia-1Asset 24.png");
export default function Register() {
  return (
		<KeyboardAvoidingView
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{flex:1, width: "100%" }}
			className="bg-[#0b1c0c] w-full"
		>
			<ScrollView
				style={{ flex: 1, backgroundColor: "#0b1c0c" }}
				contentContainerStyle={{
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<Image
					source={imageLogin}
					className="w-48 h-48 mb-6 object-contain"
					resizeMode="contain"
				/>
				<Text className="text-5xl h-12 text-[#FFFFFF] font-bold">
					Registrarse
				</Text>
				<Text className="text-lg text-[#FFFFFF]">
					Por favor ingresa tus datos
				</Text>
				<View className="flex-col w-[80%] h-auto mt-4">
					<Text className="text-lg font-bold text-[#FFFFFF]">
						Nombre Completo
					</Text>
					<TextInput
						id="name"
						className="bg-white border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu nombre completo"
						// onChangeText={(e) =>
						// 	handleChange({
						// 		name: "name",
						// 		value: e,
						// 	})
						// }
					/>
					<Text className="text-lg font-bold text-[#FFFFFF]">
						Email
					</Text>
					<TextInput
						id="email"
						className="bg-white border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu email"
						// onChangeText={(e) =>
						// 	handleChange({
						// 		name: "email",
						// 		value: e,
						// 	})
						// }
					/>
					<Text className="text-lg font-bold text-[#FFFFFF]	">
						Contraseña
					</Text>
					<TextInput
						id="password"
						className="bg-white border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu contraseña"
						secureTextEntry
						// onChangeText={(e) =>
						// 	handleChange({
						// 		name: "password",
						// 		value: e,
						// 	})
						// }
					/>
					<Text className="text-lg font-bold text-[#FFFFFF]">
						Confirmar Contraseña
					</Text>
					<TextInput
						id="confirmPassword"
						className="bg-white border-2 border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Confirma tu contraseña"
						secureTextEntry
						// onChangeText={(e) =>
						// 	handleChange({
						// 		name: "confirmPassword",
						// 		value: e,
						// 	})
						// }
					/>
				</View>
				<TouchableOpacity
					className="bg-[#73937e] w-[80%] rounded-lg h-12 mt-4 justify-center items-center"
					//onPress={() => handleSubmit()}
				>
					<Text className="text-white text-lg font-bold">
						Registrarse
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}
