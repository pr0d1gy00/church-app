import React from "react";
import {
	View,
	Text,
	ActivityIndicator,
	FlatList,
	Alert,
} from "react-native";
import useGetAllUser from "../../hooks/useGetAllUser";
import UserCard from "../../components/UserCard";
import Search from "../../components/Search";
import useUser from "../../hooks/useUser";

export default function users() {
	const { allUsers, loading } = useGetAllUser();
	const { handleRemoveLeadership } = useUser();
	const handleUserPress = () => {};


	// Estado de carga
	if (loading) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50">
				<ActivityIndicator size="large" color="#73937e" />
			</View>
		);
	}

	return (
		<View className="flex-1 bg-white flex items-center w-full">
			<Search placeholder="Buscar usuario..." />
			<View className="flex-1 w-full px-4  ">
				<View className="px-4 mt-2">
					<Text className="text-3xl font-bold text-gray-800">
						Usuarios Registrados
					</Text>
					<Text className="text-base text-gray-500">
						{allUsers?.users.length} usuarios en total
					</Text>
				</View>
				<FlatList
					data={allUsers?.users}
					keyExtractor={(item) => item.id.toString()}
					renderItem={({ item }) => (
						<UserCard
							user={item}
							onPress={() => handleUserPress()}
							onRemoveLeadership={handleRemoveLeadership}
						/>
					)}
					contentContainerStyle={{ paddingTop: 16 }}
				/>
			</View>
		</View>
	);
}
