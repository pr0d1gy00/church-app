import React from "react";
import {
	FlatList,
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	Pressable,
	ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import useCell from "../../hooks/useCell";
import { TransformDays } from "../../helpers/transformDays";
import Loading from "../../components/Loading";
import { router } from "expo-router";

const DetailRow = ({
	icon,
	label,
	value,
}: {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	value: string | undefined;
}) => (
	<View className="flex-row items-start mb-4">
		<Ionicons
			name={icon}
			size={22}
			color="#73937e"
			className="mt-1"
		/>
		<View className="ml-4 flex-1">
			<Text className="text-md text-gray-500">{label}</Text>
			<Text className="text-lg text-[#0b1c0c] font-semibold">
				{value || "No disponible"}
			</Text>
		</View>
	</View>
);

export default function CellById() {
	const { cellByIdData, confirmAndDeleteUserFromCell, confirmAndDeleteCell, confirmAndActivateCell,loading} =
		useCell();

	if (!cellByIdData) {
		return <Loading visible={true} />;
	}

	const { cell } = cellByIdData;
	const leaderName = cell.members.find(
		(member) => member.userId === cell.leaderId
	)?.user.name;
	if (loading) {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: "#fff",
						opacity: 0.1,
					}}
				>
					<ActivityIndicator size="large" color="#1e1e1e" />
							<Text style={{ marginTop: 10, color: "#333",fontSize:24 }}>
						Cargando...
					</Text>
				</View>
			);
		}

	return (
		<View className="flex-1 bg-white">
			<View className="w-full h-12 mb-4 flex flex-row justify-between items-center px-4">
				<View>
					<Text className="text-4xl font-bold text-[#73937e] px-2 ">
						Detalles de la célula
					</Text>
					<Text className="text-2xl font-bold text-[#0b1c0c] px-2">
						Nombre: {cell.name.slice(0, 20)}...
					</Text>
				</View>
				{cell.deletedAt === null && (
				<Pressable
					className="bg-[#0b1c0c] p-4 rounded-lg "
					onPress={() => {
						router.push(`/cell/editInfo/${cell.id}`);
					}}
				>
					<Ionicons
						name="pencil-outline"
						size={20}
						color="#fff"
					/>
				</Pressable>
				)}
			</View>

			{/* Tarjeta de Detalles Principales */}
			<View className="bg-gray-50 mx-4 p-5 rounded-xl border border-gray-200">
				<DetailRow
					icon="person-circle-outline"
					label="Líder"
					value={leaderName?.slice(0, 20)}
				/>
				<DetailRow
					icon="calendar-outline"
					label="Día de Reunión"
					value={TransformDays(cell.meetingDay)}
				/>
				<DetailRow
					icon="time-outline"
					label="Hora"
					value={new Date(
						cell.meetingTime
					).toLocaleTimeString([], {
						hour: "2-digit",
						minute: "2-digit",
					})}
				/>
				<DetailRow
					icon="location-outline"
					label="Ubicación"
					value={cell.location}
				/>
			</View>
			<View className="w-full flex items-center">
				{cellByIdData.cell.deletedAt === null ? (
					<Pressable
						className="bg-red-400 w-[90%] mx-auto rounded-lg h-12 mt-6 justify-center items-center"
						onPress={() => {
							confirmAndDeleteCell(
								cellByIdData.cell.id
							);
						}}
					>
						<Text className="text-white text-lg font-bold">
							Eliminar Célula
						</Text>
					</Pressable>
				) : (
					<Pressable
						className="bg-green-500 w-[90%] mx-auto rounded-lg h-12 mt-6 justify-center items-center"
						onPress={() => {
							confirmAndActivateCell(
								cellByIdData.cell.id
							);
						}}
					>
						<Text className="text-white text-lg font-bold">
							Activar Célula
						</Text>
					</Pressable>
				)}
			</View>

			{/* Sección de Miembros */}
			<FlatList
				className="mx-4 mt-8"
				data={cell?.members}
				keyExtractor={(item) => item.id.toString()}
				renderItem={({ item: member }) => (
					<View
						key={member.id}
						className="flex-row items-center bg-gray-50 p-3 rounded-lg mb-3 border border-gray-200"
					>
						<View className="flex items-center flex-row flex-1">
							<Ionicons
								name="person-outline"
								size={24}
								color="#0b1c0c"
							/>
							<Text className="ml-3 text-lg text-gray-800">
								{member.user.name}
							</Text>
						</View>
						{cellByIdData.cell.deletedAt === null && (
						<Pressable
							className="bg-red-400 p-3 rounded-lg ml-auto"
							onPress={() => {
								confirmAndDeleteUserFromCell(member.userId);
							}}
						>
							<Ionicons
								name="trash-outline"
								size={20}
								color="#fff"
							/>
						</Pressable>
						)}
					</View>
				)}
				ListHeaderComponent={
					<View className="mb-4 flex-1 flex flex-row items-center justify-between">
						<Text className="text-2xl font-bold text-[#0b1c0c]">
							Miembros ({cell.members.length})
						</Text>
						{cellByIdData.cell.deletedAt === null && (

						<Pressable
							className="bg-[#0b1c0c] p-3 rounded-lg w-16 items-center"
							onPress={() => {
								router.push(
									`cell/addedMemberToCell/${cell.id}`
								);
							}}
						>
							<Ionicons
								name="person-add-outline"
								size={20}
								color="#fff"
							/>
						</Pressable>
						)}
					</View>
				}
			/>
		</View>
	);
}
