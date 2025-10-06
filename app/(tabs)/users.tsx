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
import HeaderWithTitleAndActions from "../../components/headerWithTitleAndActions"
import { router } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { se } from "date-fns/locale";
export default function users() {
	const { allUsers, loading,setUserStateToShow,userStateToShow } = useGetAllUser();
	const { handleRemoveLeadership } = useUser();
	const handleUserPress = () => {};
	const [showMenu, setShowMenu] = React.useState(false);

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
			<HeaderWithTitleAndActions
				title="Usuarios"
				setShowMenu={() => {
					setShowMenu(!showMenu);
				}}
				showMenu={showMenu}
				options={[
					{
						label: "Agregar Usuario",
						icon: "person-add-outline",
						urlToNavigate: "/registeruser"
					}
				]}
				handleMenuOption={(path:string) => {
					setShowMenu(false);
					router.push(path);
				}}
				showSearch={true}
			/>
			<View className="flex-1 w-full px-6 ">
				<Text className="text-gray-600 font-semibold p-2">Filtrar por estado:</Text>
				<View className="rounded-2xl bg-[#ebebeb] mb-2 shadow-lg elevation-md">
				<Picker
					selectedValue={userStateToShow}
					onValueChange={(itemValue) => setUserStateToShow(itemValue as string)}
				>
					<Picker.Item label="Activos" value="all" />
					<Picker.Item label="Inactivos" value="inactive" />
				</Picker>
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
