// components/UserCard.tsx
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserWithAllOfData } from "../interfaces/user.interfaces";
import { router } from "expo-router";

const roleColors: { [key: string]: string } = {
    ADMIN: "bg-red-100 text-red-800",
    LEADER: "bg-blue-100 text-blue-800",
    MEMBER: "bg-green-100 text-green-800",
};
export default function UserCard({
	user,
	onPress,
	onRemoveLeadership,
}: {
	user: UserWithAllOfData;
	onPress: () => void;
	onRemoveLeadership?: (userId: number) => void;
}) {
	const roleStyle =
		roleColors[user.role] || "bg-gray-100 text-gray-800";
	const [showCells, setShowCells] = React.useState(false);

	return (
		<TouchableOpacity
			onPress={() => router.push(`editProfile/${user.id}`)}
			className="p-4 rounded-xl shadow-lg elevation-md mb-4 bg-white"
		>
			<View className="flex-row items-center">
				<View className="w-12 h-12 rounded-full justify-center items-center">
					<Ionicons name="person" size={24} color="#73937e" />
				</View>
				<View className="flex-1 ml-4">
					<Text
						className="text-lg font-bold text-gray-800"
						numberOfLines={1}
					>
						{user.name}
					</Text>
					<Text className="text-sm text-gray-500">{user.email}</Text>
				</View>
				<View className="flex-col items-end">
					<View
						className={`px-3 py-1 rounded-full ${
							roleStyle.split(" ")[0]
						}`}
					>
						<Text
							className={`text-xs font-bold ${
								roleStyle.split(" ")[1]
							}`}
						>
							{user.role}
						</Text>
					</View>
					{user.role === "LEADER" && onRemoveLeadership && (
						<TouchableOpacity
							onPress={(e) => {
								e.stopPropagation();
								onRemoveLeadership(user.id);
							}}
							className="mt-2 flex-row items-center bg-yellow-100 px-2 py-1 rounded-md active:opacity-70"
						>
							<Ionicons
								name="shield-outline"
								size={14}
								color="#ca8a04"
							/>
							<Text className="text-xs font-semibold text-yellow-700 ml-1">
								Quitar Liderazgo
							</Text>
						</TouchableOpacity>
					)}
				</View>
			</View>
			<View>
				<TouchableOpacity
					className="text-sm font-semibold text-center text-gray-600 mt-2 flex flex-row items-center justify-center gap-2"
					onPress={(e) => {
						e.stopPropagation();
						setShowCells(!showCells);
					}}
				>
					<Ionicons
						name={showCells ? "eye-off-outline" : "eye-outline"}
						size={16}
						color="#6b7280"
					/>
					<Text className="text-sm font-semibold text-center text-gray-600">
						{showCells ? "Ocultar Células" : "Ver Células"}
					</Text>
				</TouchableOpacity>
				{showCells &&
					(user.cellMembers && user.cellMembers.length > 0 ? (
						user.cellMembers.map((cm) => (
							<View
								key={cm.cell.id}
								className="border-t border-gray-300 mt-3 pt-3 flex-row items-center"
							>
								<Ionicons
									name="apps-outline"
									size={16}
									color="#6b7280"
								/>
								<Text className="text-sm text-gray-600 ml-2">
									{cm.cell.name}
								</Text>
							</View>
						))
					) : (
						<View className="border-t border-gray-300 mt-3 pt-3 flex-row items-center">
							<Ionicons
								name="apps-outline"
								size={16}
								color="#6b7280"
							/>
							<Text className="text-sm text-gray-600 ml-2">
								Sin célula asignada
							</Text>
						</View>
					))}
			</View>
		</TouchableOpacity>
	);
}