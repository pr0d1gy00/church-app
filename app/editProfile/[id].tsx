import React, { useState } from "react";
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Image,
	ScrollView,
	KeyboardAvoidingView,
	ActivityIndicator,
	StyleSheet,
	Platform,
	Pressable,
} from "react-native";
import useUser from "../../hooks/useUser";
import { useAuthOfProvider } from "../../hooks/AuthContext";
import { Picker } from "@react-native-picker/picker";
import { Ionicons } from "@expo/vector-icons";

const imageLogin = require("../../assets/LogoJuvenilAsset 24.png");
const roles = ["MEMBER", "LEADER", "ADMIN"];

export default function editProfile() {
	const { dataUserRegister, handleChange, handleSubmit, loading, confirmDeleteUser,confirmActivateUser } = useUser();
	const { user } = useAuthOfProvider();
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	console.log(user)
	if (loading) {
		return (
			<ActivityIndicator
				size="large"
				color="#73937e"
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
				}}
			/>
		);
	}
	return (
		<KeyboardAvoidingView
			style={{ flex: 1, backgroundColor: "#f9fafb" }}
			behavior={Platform.OS === "ios" ? "padding" : undefined}
		>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.logoContainer}>
					<Image
						source={imageLogin}
						style={styles.logo}
						resizeMode="contain"
					/>
				</View>
				<View className="flex flex-row w-full justify-between px-6">
					<View>
						<Text style={styles.title}>Editar Datos</Text>
						<Text style={styles.subtitle}>Por favor ingresa tus datos</Text>
					</View>
					{dataUserRegister?.deletedAt === null ? (
					<Pressable
						className="bg-red-500 justify-center h-16 w-24 rounded-lg items-center p-2"
						onPress={() => confirmDeleteUser()}
					>
						<Ionicons
							name="trash-outline"
							size={28}
							color="#ffffff"
						/>


					</Pressable>
					): (
<Pressable
						className="bg-green-500 justify-center h-16 w-24 rounded-lg items-center p-2"
						onPress={() => confirmActivateUser()}
					>
						<Ionicons
							name="checkmark-outline"
							size={28}
							color="#ffffff"
						/>


					</Pressable>
						)}
				</View>
				<View style={styles.formContainer}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nombre Completo</Text>
						<View style={styles.inputIconContainer}>
							<Ionicons
								name="person-outline"
								size={22}
								color="#73937e"
								style={styles.icon}
							/>
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
							<Ionicons
								name="mail-outline"
								size={22}
								color="#73937e"
								style={styles.icon}
							/>
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
					{(user?.role === "ADMIN" || user?.role === "LEADER") && (
						<>
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Contraseña</Text>
								<View style={styles.inputIconContainer}>
									<Ionicons
										name="lock-closed-outline"
										size={22}
										color="#73937e"
										style={styles.icon}
									/>
									<TextInput
										id="password"
										style={styles.input}
										placeholder="Ingresa tu contraseña"
										placeholderTextColor="#9ca3af"
										secureTextEntry={!showPassword}
										value={dataUserRegister.password}
										onChangeText={(e) =>
											handleChange({ name: "password", value: e })
										}
									/>
									<TouchableOpacity
										onPress={() =>
											setShowPassword((prev) => !prev)
										}
									>
										<Ionicons
											name={
												showPassword
													? "eye-outline"
													: "eye-off-outline"
											}
											size={22}
											color="#73937e"
										/>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Confirmar Contraseña</Text>
								<View style={styles.inputIconContainer}>
									<Ionicons
										name="checkmark-done-outline"
										size={22}
										color="#73937e"
										style={styles.icon}
									/>
									<TextInput
										id="confirmPassword"
										style={styles.input}
										placeholder="Confirma tu contraseña"
										placeholderTextColor="#9ca3af"
										secureTextEntry={!showConfirmPassword}
										value={dataUserRegister.confirmPassword}
										onChangeText={(e) =>
											handleChange({
												name: "confirmPassword",
												value: e,
											})
										}
									/>
									<TouchableOpacity
										onPress={() =>
											setShowConfirmPassword((prev) => !prev)
										}
									>
										<Ionicons
											name={
												showConfirmPassword
													? "eye-outline"
													: "eye-off-outline"
											}
											size={22}
											color="#73937e"
										/>
									</TouchableOpacity>
								</View>
							</View>
							<View style={styles.inputGroup}>
								<Text style={styles.label}>Rol</Text>
								<View style={styles.pickerContainer}>
									<Picker
										selectedValue={dataUserRegister.role}
										onValueChange={(val: string) =>
											handleChange({ name: "role", value: val })
										}
										style={styles.picker}
									>
										{roles.map((role) => (
											<Picker.Item key={role} label={role} value={role} />
										))}
									</Picker>
								</View>
							</View>
						</>
					)}
				</View>
				{user?.deletedAt === null && (
				<TouchableOpacity
					style={styles.button}
					onPress={() => handleSubmit()}
				>
					<Text style={styles.buttonText}>Actualizar</Text>
				</TouchableOpacity>
				)}
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
		backgroundColor: "#f9fafb",
	},
	logoContainer: {
		marginBottom: 24,
		alignItems: "center",
	},
	logo: {
		width: 140,
		height: 140,
		borderRadius: 28,
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
	},
	subtitle: {
		fontSize: 16,
		color: "#6b7280",
		marginBottom: 24,
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
		borderWidth: 1,
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
	pickerContainer: {
		backgroundColor: "#ebebeb",
		borderRadius: 10,
		borderWidth: 1,
		borderColor: "#73937e",
		marginTop: 8,
		marginBottom: 8,
	},
	picker: {
		width: "100%",
		height: 54,
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
