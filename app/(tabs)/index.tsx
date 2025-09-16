import {
	ActivityIndicator,
	FlatList,
	Text,
	View,
	StyleSheet,
} from "react-native";
import "../../global.css";
import useEvent from "../../hooks/useEvent";
import { useAuthOfProvider } from "../../hooks/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import EventCard from "../../components/eventCard";
import { format } from "date-fns";
import { es } from "date-fns/locale";

export default function Index() {
	const { eventDataByUserId, loading } = useEvent();
	const { user } = useAuthOfProvider();

	const today = new Date();
	const formattedDate = format(today, "EEEE, d 'de' MMMM", { locale: es });
	const capitalizedDate =
		formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);

	return (
		<View style={{ flex: 1, backgroundColor: "#f9fafb" }}>
			<View style={styles.header}>
				<Text style={styles.dateText}>{capitalizedDate}</Text>
				<Text style={styles.welcomeText}>
					Hola, {user?.name.split(" ")[0]}
				</Text>
			</View>

			<View style={styles.container}>
				<Text style={styles.title}>Próximos Eventos</Text>
				<View style={styles.separator} />
				{loading ? (
					<View style={styles.loaderContainer}>
						<ActivityIndicator size="large" color="#16a34a" />
					</View>
				) : (
					<FlatList
						data={eventDataByUserId?.events}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => <EventCard event={item} />}
						contentContainerStyle={styles.listContent}
						ListEmptyComponent={
							<View style={styles.emptyContainer}>
								<Ionicons
									name="calendar-outline"
									size={60}
									color="#d1d5db"
								/>
								<Text style={styles.emptyText}>
									No hay eventos disponibles.
								</Text>
							</View>
						}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	header: {
		backgroundColor: "#73937e",
		paddingHorizontal: 24,
		paddingTop: 50,
		paddingBottom: 40,
		borderBottomLeftRadius: 30,
		borderBottomRightRadius: 30,
	},
	dateText: {
		color: "white",
		fontSize: 16,
		fontWeight: "300",
		opacity: 0.9,
	},
	welcomeText: {
		color: "white",
		fontSize: 28,
		fontWeight: "bold",
		marginTop: 4,
	},
	container: {

		flex: 1,
		width: "100%",																							
		paddingHorizontal: 16,
		marginTop: 20,
	},
	title: {
		fontSize: 22,
		fontWeight: "600",
		color: "#0b1c0c",
		textAlign: "center",
		marginBottom: 12,
	},
	separator: {
		height: 1,
		backgroundColor: "#e5e7eb",
		width: "90%",
		alignSelf: "center",
		marginBottom: 16,
	},
	loaderContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	listContent: {
		paddingTop: 8,
		paddingBottom: 24,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		marginTop: 60,
		padding: 20,
	},
	emptyText: {
		color: "#6b7280",
		marginTop: 16,
		fontSize: 18,
		textAlign: "center",
	},
});
