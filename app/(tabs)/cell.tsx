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
import { Ionicons } from '@expo/vector-icons';
import Search from "../../components/Search";
import HeaderWithTitleAndActions from "../../components/headerWithTitleAndActions";
export default function CellScreen() {
	const { allCells } = useCell();
	const [showMenu, setShowMenu] = React.useState(false);

	return (
			<View className="flex-1 bg-white items-center">
				<HeaderWithTitleAndActions
					title="Células"
					setShowMenu={setShowMenu}
					showMenu={showMenu}
					options={[
						{
							label: "Registrar Célula",
							icon: "add-circle-outline",
							urlToNavigate: "/registercell"
						},
						{
							label: "Agregar miembro",
							icon: "person-add-outline",
							urlToNavigate: "/addedMemberToCell"

						}
					]}
					handleMenuOption={(path:string) => {
						setShowMenu(false);
						router.push(path);
					}
					}
					showSearch={true}
				/>
				<>
				{allCells?.cells.length === 0 ? (
					<Text className="text-center text-gray-500 mt-4">
						No hay células disponibles.
					</Text>
				):(
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
				</>
				</View>
	);
}

const styles = StyleSheet.create({

	list: {
		paddingVertical: 8,
		backgroundColor: "white",
	},
});
