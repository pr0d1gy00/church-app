import { Picker } from '@react-native-picker/picker'
import Checkbox from 'expo-checkbox'
import React from 'react'
import { FlatList, Pressable, Text, View } from 'react-native'
import useEvent from '../../../hooks/useEvent';
import { Event } from '../../../interfaces/event.interfaces';

export default function AddedMemberToEvent() {
	const { allUsers,allEvents, id,selectedEventToSend,setSelectedEventToSend, eventDataById,selectedUsers, handleValueChange,handleSubmitAddMemberToEvent,
	} = useEvent();

	return (
		<View className="w-full items-center flex-1 px-2 bg-white">
				<View className="w-[90%] py-4">
					<Text className="text-4xl text-center font-bold text-[#73937e]">
						Agregar Miembros al Evento
					</Text>
					<View className="py-4">
						<Text className="font-semibold py-2 text-lg text-[#73937e]">
							Evento:
						</Text>
						<View className="bg-[#f2f2f2]  rounded-lg">
							<Picker
								onValueChange={(val:number) => setSelectedEventToSend(val)}
								selectedValue={selectedEventToSend ? selectedEventToSend : undefined}
							>
								{allEvents?.events.filter( fil => fil.id === parseInt(id as string)).map((cell) => (
									<Picker.Item
										key={cell.id}
										label={cell.title}
										value={cell.id}
									/>
								))}
							</Picker>
						</View>
						<View className="py-4">
							<Text className="font-semibold py-2 text-[#73937e] text-lg">
								Usuarios:
							</Text>
							<FlatList
								data={allUsers?.users.filter(user=>user.id !==
									eventDataById?.event.subscriptions.find(member=>member.userId === user.id)?.userId
								)}
								keyExtractor={(user) => user.id.toString()}
								renderItem={({ item: user })=> (
									<View
										key={user.id}
										style={{

											flexDirection: "row",
											alignItems: "center",
											marginVertical: 5,
										}}
									>
										<Checkbox
											style={{
												width: 24,
												height: 24,
												marginRight: 8,
											}}
											value={selectedUsers.includes(
												user.id
											)}
											onValueChange={() =>
												handleValueChange(
													user.id
												)
											}
										/>
										<Text
											className="text-[#0b1c0c] text-lg"
										>
											{user.name}
										</Text>
									</View>
								)}
							/>
						</View>
					</View>
					<Pressable onPress={()=>handleSubmitAddMemberToEvent()}
					className="w-full active:opacity-30 bg-[#0b1c0c] h-12 rounded-lg flex justify-center items-center">
						<Text className="text-white text-center text-xl">Registrar</Text>
					</Pressable>
				</View>
			</View>
	)
}
