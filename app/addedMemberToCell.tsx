import React, { useState } from "react";
import {
	FlatList,
	ScrollView,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import useCell from "../hooks/useCell";
import { Picker } from "@react-native-picker/picker";
import { Checkbox } from "expo-checkbox";

export default function AddedMemberToCell() {
	const { allUsers, allCells,setSelectedCellToSend,selectedCellToSend, handleValueChange, selectedUsers, handeSubmitaddMemberToCell } = useCell();


	return (
			<View className="w-full items-center flex-1 px-2 bg-white">
				<View className="w-[90%] py-4">
					<Text className="text-4xl text-center font-bold text-[#73937e]">
						Agregar Miembros a la Célula
					</Text>
					<View className="py-4">
						<Text className="font-semibold py-2 text-lg text-[#73937e]">
							Célula:
						</Text>
						<View className="bg-[#f2f2f2]  rounded-lg">
							<Picker
								onValueChange={(val:number) => setSelectedCellToSend(val)}
								selectedValue={selectedCellToSend ? selectedCellToSend : undefined}
							>
								{allCells?.cells.map((cell) => (
									<Picker.Item
										key={cell.id}
										label={cell.name}
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
								data={allUsers?.users}
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
					<TouchableOpacity onPress={()=>handeSubmitaddMemberToCell()} className="w-full bg-[#0b1c0c] h-12 rounded-lg flex justify-center items-center">
						<Text className="text-white text-center text-xl">Registrar</Text>
					</TouchableOpacity>
				</View>
			</View>
	);
}
