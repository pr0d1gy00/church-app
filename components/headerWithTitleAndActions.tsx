import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Search from "./Search";

interface Props {
	title: string;
	actions?: React.ReactNode;
	setShowMenu: React.Dispatch<React.SetStateAction<boolean>>;
	showMenu: boolean;
	options: {
		label: string;
		icon: React.ComponentProps<typeof Ionicons>["name"];
		urlToNavigate: string;
	}[];
	showSearch?: boolean;
	handleMenuOption: (path: string) => void;
}

export default function headerWithTitleAndActions({
	title,
	setShowMenu,
	showMenu,
	options,
	handleMenuOption,
	showSearch,
}: Props) {
	return (
		<View className="w-full">
			<View className="bg-white pt-4 items-center">
				{showSearch && (
					<Search placeholder="Buscar evento..." />
				)}
				<View className="flex px-4 flex-row w-full justify-between items-center mt-4 mb-4">
					<Text className="text-3xl text-gray-800 font-bold">
						{title}
					</Text>
					<TouchableOpacity
						onPress={() => setShowMenu(!showMenu)}
					>
						<Ionicons
							name="ellipsis-vertical"
							size={24}
							color="#0b1c0c"
						/>
					</TouchableOpacity>
				</View>
			</View>

			{/* Menú desplegable */}
			{showMenu && (
				<View className="absolute top-28 z-20 w-56 py-2 right-4 bg-white shadow-xl shadow-black/10 rounded-lg">
					{options.map((option, index) => (
						<TouchableOpacity
							key={index}
							onPress={() => {
								handleMenuOption(
									option.urlToNavigate
								);
							}}
							className="px-4 py-3 flex-row items-center"
						>
							<Ionicons
								name={option.icon}
								size={20}
								color="#4b5563"
							/>
							<Text className="text-gray-700 text-base ml-3">
								{option.label}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			)}
		</View>
	);
}
