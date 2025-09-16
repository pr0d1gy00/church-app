// app/(tabs)/cell.tsx
import React, { useEffect } from "react";
import {
	View,
	FlatList,
	StyleSheet,
	ScrollView,
	Text,
	TouchableOpacity,
	TextInput,
} from "react-native";
import useCell from "../../hooks/useCell";
import CellCard from "../../components/cellCard";
import { router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import Search from "../../components/Search";
import HeaderWithTitleAndActions from "../../components/headerWithTitleAndActions";
import { Picker } from "@react-native-picker/picker";
export default function CellScreen() {
	const { allCells, setStateToShow, stateToShow } = useCell();
	const [showMenu, setShowMenu] = React.useState(false);

	return (
		<View className="flex-1 w-full bg-white items-center">
			<HeaderWithTitleAndActions
				title="Células"
				setShowMenu={setShowMenu}
				showMenu={showMenu}
				options={[
					{
						label: "Registrar Célula",
						icon: "add-circle-outline",
						urlToNavigate: "/registercell",
					},
					{
						label: "Agregar miembro",
						icon: "person-add-outline",
						urlToNavigate: "/addedMemberToCell",
					},
				]}
				handleMenuOption={(path: string) => {
					setShowMenu(false);
					router.push(path);
				}}
				showSearch={true}
			/>

			<View className="flex-1 w-full px-4">
				<Text className="text-gray-600 font-semibold p-2">
					Filtrar por estado:
				</Text>
				<View className="rounded-2xl bg-[#ebebeb] mb-2 shadow-lg elevation-md">
					<Picker
						selectedValue={stateToShow}
						onValueChange={(itemValue) =>
							setStateToShow(
								itemValue as "active" | "inactive"
							)
						}
					>
						<Picker.Item label="Activos" value="active" />
						<Picker.Item
							label="Inactivos"
							value="inactive"
						/>
					</Picker>
				</View>
				{allCells?.cells.length === 0 ? (
					<Text className="text-center text-gray-500 mt-4">
						No hay células disponibles.
					</Text>
				) : (
					<FlatList
						style={{ flex: 1, width: "100%" }}
						data={allCells?.cells}
						keyExtractor={(item) => item.id.toString()}
						renderItem={({ item }) => (
							<CellCard
								cell={item}
								onPress={() => {
									router.push(`/cell/${item.id}`);
								}}
							/>
						)}
						contentContainerStyle={styles.list}
					/>
				)}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	list: {
		paddingVertical: 8,
		backgroundColor: "white",
	},
});
