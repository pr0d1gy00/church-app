import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	StyleSheet,
	Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useUser from "../hooks/useUser";
const imageLogin = require("../assets/LogoJuvenilAsset 24.png");

export default function Hola() {
	const { dataUserRegister, handleChange, handleSubmit, loading } = useUser();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: "#f9fafb" }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView
				contentContainerStyle={styles.scrollContent}
			>
				<View style={styles.logoContainer}>
					<Image
						source={imageLogin}
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>
				<Text style={styles.title}>Registrarse</Text>
				<Text style={styles.subtitle}>Por favor ingresa tus datos</Text>
				<View style={styles.formContainer}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nombre Completo</Text>
						<View style={styles.inputIconContainer}>
							<Ionicons name="person-outline" size={22} color="#73937e" style={styles.icon} />
							<TextInput
								value={dataUserRegister.name}
								style={styles.input}
								placeholder="Ingresa tu nombre completo"
								placeholderTextColor="#9ca3af"
								onChangeText={(e) =>
									handleChange({ name: "name", value: e })
								}
							/>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Email</Text>
						<View style={styles.inputIconContainer}>
							<Ionicons name="mail-outline" size={22} color="#73937e" style={styles.icon} />
							<TextInput
								value={dataUserRegister.email}
								style={styles.input}
								placeholder="Ingresa tu email"
								placeholderTextColor="#9ca3af"
								onChangeText={(e) =>
									handleChange({ name: "email", value: e })
								}
							/>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Contraseña</Text>
						<View style={styles.inputIconContainer}>
							<Ionicons name="lock-closed-outline" size={22} color="#73937e" style={styles.icon} />
							<TextInput
								value={dataUserRegister.password}
								style={styles.input}
								placeholder="Ingresa tu contraseña"
								placeholderTextColor="#9ca3af"
								secureTextEntry={!showPassword}
								onChangeText={(e) =>
									handleChange({ name: "password", value: e })
								}
							/>
							<TouchableOpacity onPress={() => setShowPassword((prev) => !prev)}>
								<Ionicons
									name={showPassword ? "eye-outline" : "eye-off-outline"}
									size={22}
									color="#73937e"
								/>
							</TouchableOpacity>
						</View>
					</View>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Confirmar Contraseña</Text>
						<View style={styles.inputIconContainer}>
							<Ionicons name="checkmark-done-outline" size={22} color="#73937e" style={styles.icon} />
							<TextInput
								value={dataUserRegister.confirmPassword}
								style={styles.input}
								placeholder="Confirma tu contraseña"
								placeholderTextColor="#9ca3af"
								secureTextEntry={!showConfirmPassword}
								onChangeText={(e) =>
									handleChange({ name: "confirmPassword", value: e })
								}
							/>
							<TouchableOpacity onPress={() => setShowConfirmPassword((prev) => !prev)}>
								<Ionicons
									name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
									size={22}
									color="#73937e"
								/>
							</TouchableOpacity>
						</View>
					</View>
				</View>
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleSubmit()}
				>
					<Text style={styles.buttonText}>
						{loading ? "Registrando..." : "Registrarse"}
					</Text>
				</TouchableOpacity>
			</ScrollView>
		</KeyboardAvoidingView>
	);
}

const styles = StyleSheet.create({
	scrollContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40,
		backgroundColor: "#ffffff",
	},
	logoContainer: {
		marginBottom: 24,
		alignItems: "center",
	},
	logo: {
		width: 120,
		height: 120,
		borderRadius: 24,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.08,
		shadowRadius: 8,
		elevation: 2,
	},
	title: {
		fontSize: 32,
		fontWeight: "bold",
		color: "#73937e",
		marginBottom: 8,
		textAlign: "center",
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 24,
		textAlign: "center",
	},
	formContainer: {
		width: "90%",
		maxWidth: 400,
		marginBottom: 24,
	},
	inputGroup: {
		marginBottom: 18,
	},
	label: {
		fontSize: 15,
		fontWeight: "600",
		color: "#374151",
		marginBottom: 6,
	},
	inputIconContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#ebebeb",
		borderRadius: 10,
		borderColor: "#73937e",
		paddingHorizontal: 10,
		height: 48,
	},
	icon: {
		marginRight: 8,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#111827",
	},
	button: {
		backgroundColor: "#0b1c0c",
		borderRadius: 12,
		height: 50,
		width: "90%",
		maxWidth: 400,
		justifyContent: "center",
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	buttonText: {
		color: "#ebebeb",
		fontSize: 18,
		fontWeight: "bold",
	},
});
