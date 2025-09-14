import React, { useState } from "react";
import {
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	StyleSheet,
	Platform,
} from "react-native";
import DateTimePicker, {
	DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import useCell from "../hooks/useCell";
import { Ionicons } from "@expo/vector-icons";

export default function Registercell() {
	const { cell, handleChange, allUsers, handleSubmit } = useCell();
	const [showTimePicker, setShowTimePicker] = useState(false);

	const handleTimeChange = (
		event: DateTimePickerEvent,
		selectedDate?: Date
	) => {
		setShowTimePicker(Platform.OS === "ios");
		if (selectedDate) {
			handleChange("meetingTime", selectedDate);
		}
	};

	return (
		<ScrollView
			style={styles.scrollView}
			contentContainerStyle={styles.scrollViewContent}
		>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Registra una Célula</Text>
					<Text style={styles.subtitle}>
						Completa los siguientes campos para continuar.
					</Text>
				</View>

				<View style={styles.form}>
					<View style={styles.inputGroup}>
						<Text style={styles.label}>Nombre de la célula</Text>
						<View style={styles.inputContainer}>
							<Ionicons
								name="create-outline"
								size={20}
								color="#6b7280"
								style={styles.icon}
							/>
							<TextInput
								value={cell.name}
								onChangeText={(text) => handleChange("name", text)}
								style={styles.input}
								placeholder="Ej: Célula de jóvenes"
								placeholderTextColor="#9ca3af"
							/>
						</View>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Líder</Text>
						{allUsers?.users.length === 0 ? (
							<Text style={styles.errorText}>
								No hay usuarios disponibles para ser líder.
							</Text>
						) : (
							<View style={styles.pickerContainer}>
								<Picker
									selectedValue={cell.leaderId}
									onValueChange={(val: string) =>
										handleChange("leaderId", val)
									}
									style={styles.picker}
								>
									<Picker.Item label="Selecciona un líder" value="" />
									{allUsers?.users.map((user) => (
										<Picker.Item
											key={user.id}
											label={user.name}
											value={user.id}
										/>
									))}
								</Picker>
							</View>
						)}
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Día de reunión</Text>
						<View style={styles.pickerContainer}>
							<Picker
								selectedValue={cell.meetingDay}
								onValueChange={(val: string) =>
									handleChange("meetingDay", val)
								}
								style={styles.picker}
							>
								<Picker.Item label="Lunes" value="Monday" />
								<Picker.Item label="Martes" value="Tuesday" />
								<Picker.Item label="Miércoles" value="Wednesday" />
								<Picker.Item label="Jueves" value="Thursday" />
								<Picker.Item label="Viernes" value="Friday" />
								<Picker.Item label="Sábado" value="Saturday" />
								<Picker.Item label="Domingo" value="Sunday" />
							</Picker>
						</View>
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Hora de reunión</Text>
						<TouchableOpacity
							onPress={() => setShowTimePicker(true)}
							style={styles.inputContainer}
						>
							<Ionicons
								name="time-outline"
								size={20}
								color="#6b7280"
								style={styles.icon}
							/>
							<Text style={styles.timeText}>
								{cell.meetingTime
									? new Date(cell.meetingTime).toLocaleTimeString("es-ES", {
											hour: "2-digit",
											minute: "2-digit",
									  })
									: "Selecciona una hora"}
							</Text>
						</TouchableOpacity>
						{showTimePicker && (
							<DateTimePicker
								value={cell.meetingTime ? new Date(cell.meetingTime) : new Date()}
								mode="time"
								display="default"
								onChange={handleTimeChange}
							/>
						)}
					</View>

					<View style={styles.inputGroup}>
						<Text style={styles.label}>Lugar de reunión</Text>
						<View style={styles.inputContainer}>
							<Ionicons
								name="location-outline"
								size={20}
								color="#6b7280"
								style={styles.icon}
							/>
							<TextInput
								value={cell.location}
								onChangeText={(text) => handleChange("location", text)}
								style={styles.input}
								placeholder="Ej: Iglesia Costa del Este"
								placeholderTextColor="#9ca3af"
							/>
						</View>
					</View>
				</View>

				<TouchableOpacity style={styles.button} onPress={() => handleSubmit()}>
					<Text style={styles.buttonText}>Registrar Célula</Text>
				</TouchableOpacity>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	scrollView: {
		flex: 1,
		backgroundColor: "#f9fafb",
	},
	scrollViewContent: {
		flexGrow: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingVertical: 40,
	},
	container: {
		width: "90%",
		maxWidth: 400,
	},
	header: {
		marginBottom: 32,
		alignItems: "center",
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
	},
	form: {
		marginBottom: 24,
	},
	inputGroup: {
		marginBottom: 20,
	},
	label: {
		fontSize: 16,
		fontWeight: "600",
		color: "#374151",
		marginBottom: 8,
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#f3f4f6",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#e5e7eb",
		paddingHorizontal: 12,
		height: 50,
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
		backgroundColor: "#f3f4f6",
		borderRadius: 12,
		borderWidth: 1,
		borderColor: "#e5e7eb",
		justifyContent: "center",
		height: 50,
	},
	picker: {
		width: "100%",
	},
	timeText: {
		fontSize: 16,
		color: "#111827",
	},
	errorText: {
		color: "#ef4444",
		marginTop: 4,
	},
	button: {
		backgroundColor: "#0b1c0c",
		borderRadius: 12,
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		elevation: 2,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	},
	buttonText: {
		color: "white",
		fontSize: 18,
		fontWeight: "bold",
	},
});
