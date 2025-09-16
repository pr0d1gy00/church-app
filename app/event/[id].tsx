import React from "react";
import {
	View,
	Text,
	ScrollView,
	ActivityIndicator,
	Pressable,
} from "react-native";
import { Stack, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import useEvent from "../../hooks/useEvent";
import { useAuthOfProvider } from "../../hooks/AuthContext";

const InfoRow = ({
	icon,
	label,
	value,
}: {
	icon: keyof typeof Ionicons.glyphMap;
	label: string;
	value?: string | null;
}) => {
	if (!value) return null;

	return (
		<View className="flex-row items-start mb-6">
			<Ionicons
				name={icon}
				size={22}
				color="#4b5563"
				className="w-8 mt-1"
			/>
			<View className="flex-1 ml-4">
				<Text className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
					{label}
				</Text>
				<Text className="text-base text-gray-800 mt-1">
					{value}
				</Text>
			</View>
		</View>
	);
};

export default function EventDetailScreen() {
	const { eventDataById, loading, confirmAndDeleteUserOfEvent,confirmDeleteEvent } =
		useEvent();
	const { user } = useAuthOfProvider();
	const formattedDate = eventDataById?.event.eventDate
		? new Date(eventDataById.event.eventDate).toLocaleDateString(
				"es-ES",
				{
					weekday: "long",
					day: "numeric",
					month: "long",
				}
			)
		: "";
	const formattedTime = eventDataById?.event.eventDate
		? new Date(eventDataById.event.eventDate).toLocaleTimeString(
				"es-ES",
				{
					hour: "2-digit",
					minute: "2-digit",
					hour12: true,
				}
			)
		: "";

	if (loading && !eventDataById) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50">
				<ActivityIndicator size="large" color="#16a34a" />
			</View>
		);
	}

	if (!eventDataById) {
		return (
			<View className="flex-1 justify-center items-center bg-gray-50 p-8">
				<Ionicons
					name="alert-circle-outline"
					size={60}
					color="#d1d5db"
				/>
				<Text className="text-center text-gray-500 mt-4 text-lg">
					No se pudo cargar la información del evento.
				</Text>
			</View>
		);
	}
	return (
		<>
			<ScrollView className="flex-1 bg-white">
				{/* Banner Superior */}
				<View className="bg-green-600 flex flex-row justify-between h-30 items-center p-6">
					<Text className="text-3xl font-bold text-white">
						{eventDataById.event.title}
					</Text>
					{(user?.role === "LEADER" ||
					user?.role === "ADMIN") && (
							<Pressable
								className="bg-[#0b1c0c] p-4 rounded-lg "
								onPress={() => {
									console.log("ola");
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

				<View className="p-6">
					<View className="bg-gray-50 p-6 rounded-xl shadow-md shadow-gray-300/30">
						<InfoRow
							icon="calendar-clear-outline"
							label="Fecha"
							value={formattedDate}
						/>
						<InfoRow
							icon="time-outline"
							label="Hora"
							value={formattedTime}
						/>
						<InfoRow
							icon="location-outline"
							label="Ubicación"
							value={eventDataById.event.location}
						/>
						<InfoRow
							icon="document-text-outline"
							label="Descripción"
							value={eventDataById.event.description}
						/>
						<InfoRow
							icon="person-circle-outline"
							label="Creado por"
							value={eventDataById.event.creator?.name}
						/>
					</View>
				</View>
				{(user?.role === "LEADER" ||
					user?.role === "ADMIN")&& (
				<Pressable
					className="bg-red-600  p-4 rounded-lg w-[90%] mx-auto items-center mb-6"
					onPress={() => {
						confirmDeleteEvent(eventDataById.event.id);
					}}
				>
					<Text className="text-white text-lg">Eliminar evento</Text>
				</Pressable>
				)}
				{(user?.role === "LEADER" ||
					user?.role === "ADMIN") && (
						<View>
							<View className="flex-1 flex flex-row items-center justify-between px-6 w-full">
								<Text className="text-center text-lg text-gray-500">
									Miembros a notificar:
								</Text>
								<Pressable
									className="bg-[#0b1c0c] p-3 rounded-lg w-16 items-center"
									onPress={() => {
										router.push(
											`/event/addedMemberToEvent/${eventDataById.event.id}`
										);
									}}
								>
									<Ionicons
										name="person-add-outline"
										size={20}
										color="#fff"
									/>
								</Pressable>
							</View>
							{eventDataById.event.notifyAll ? (
								<Text className="text-center text-gray-700 mt-6 font-semibold">
									Todos los miembros serán
									notificados.
								</Text>
							) : (
								<>
									<Text className="text-gray-700 px-6 mb-4 font-semibold">
										Se notificará a los siguientes
										miembros:
									</Text>
									<View className="items-center mb-10">
										{eventDataById.event.subscriptions.map(
											(member) => (
												<View
													key={member.id}
													className="bg-gray-100 w-[90%] p-4 rounded-lg mb-2 flex flex-row items-center"
												>
													<View className="flex-row items-center">
														<Ionicons
															name="person-circle-outline"
															size={40}
															color="#4b5563"
														/>
														<Text className="ml-4 text-gray-800 text-lg">
															{member.user?.name.slice(
																0,
																25
															)}
														</Text>
													</View>
													<Pressable
														className="bg-red-600 p-3 rounded-lg ml-auto"
														onPress={() => {
															confirmAndDeleteUserOfEvent(
																member
																	.user
																	?.id
															);
														}}
													>
														<Ionicons
															name="trash-outline"
															size={20}
															color="#fff"
														/>
													</Pressable>
												</View>
											)
										)}
									</View>
								</>
							)}
						</View>
					)}
			</ScrollView>
		</>
	);
}
