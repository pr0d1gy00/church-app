// components/CellCard.tsx
import React from "react";
import {
	View,
	Text,
	StyleSheet,
	TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Cell } from "../interfaces/cell.interfaces"; // Asegúrate de que la ruta a tu interfaz sea correcta
import { TransformDays } from "../helpers/transformDays";

interface CellCardProps {
	cell: Cell;
	onPress: () => void;
}

export default function CellCard({ cell, onPress }: CellCardProps) {
	// Formatear la hora para mostrarla amigablemente
	const meetingTime = new Date(cell.meetingTime).toLocaleTimeString(
		"es-ES",
		{
			hour: "2-digit",
			minute: "2-digit",
		}
	);

	return (
		<TouchableOpacity onPress={onPress} style={styles.card}>
			<View style={styles.cardHeader}>
				<Ionicons
					name="apps-outline"
					size={24}
					color="#4A5568"
				/>
				<Text style={styles.cardTitle}>{cell.name}</Text>
			</View>
			<View style={styles.cardBody}>
				<View style={styles.infoRow}>
					<Ionicons
						name="person-outline"
						size={18}
						color="#718096"
					/>
					<Text style={styles.infoText}>
						Líder: {cell.leader?.name || "Sin líder"}
					</Text>
					{/* Idealmente aquí mostrarías el nombre del líder, no el ID */}
				</View>
				<View style={styles.infoRow}>
					<Ionicons
						name="location-outline"
						size={18}
						color="#718096"
					/>
					<Text style={styles.infoText}>
						{cell.location}
					</Text>
				</View>
			</View>
			<View style={styles.cardFooter}>
				<View style={styles.pill}>
					<Ionicons
						name="calendar-outline"
						size={16}
						color="#FFFFFF"
					/>
					<Text style={styles.pillText}>
						{TransformDays(cell.meetingDay)}
					</Text>
				</View>
				<View style={styles.pill}>
					<Ionicons
						name="time-outline"
						size={16}
						color="#FFFFFF"
					/>
					<Text style={styles.pillText}>{meetingTime}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "white",
		borderRadius: 12,
		padding: 16,
		marginVertical: 8,
		marginHorizontal: 2,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 5,
	},
	cardHeader: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 12,
	},
	cardTitle: {
		fontSize: 18,
		fontWeight: "bold",
		marginLeft: 8,
		color: "#2D3748",
	},
	cardBody: {
		marginBottom: 12,
	},
	infoRow: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 6,
	},
	infoText: {
		fontSize: 14,
		marginLeft: 8,
		color: "#4A5568",
	},
	cardFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		borderTopColor: "#E2E8F0",
		paddingTop: 12,
	},
	pill: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#0b1c09",
		borderRadius: 16,
		paddingVertical: 4,
		paddingHorizontal: 10,
	},
	pillText: {
		marginLeft: 6,
		fontSize: 12,
		fontWeight: "600",
		color: "#FFFFFF",
	},
});
