import React, { useState } from 'react'
import {
	Image,
	ScrollView,
	Text,
	TextInput,
	TouchableOpacity,
	View
} from 'react-native'
import DateTimePicker, { DateTimePickerEvent } from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import useCell from '../hooks/useCell';
import { Ionicons } from '@expo/vector-icons';


export default function Registercell() {
	const { cell, handleChange, allUsers, handleSubmit} = useCell();
	const [showTimePicker, setShowTimePicker] = useState(false);

	return (
			<ScrollView
				style={{ flex: 1, width: "100%" }}
				contentContainerStyle={{
					width: "100%",
					flexGrow: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: 'white'
				}}
				className="w-full"
			>
				<Text className="text-4xl h-12 text-[#73937e] font-bold">
					Registra una Célula!
				</Text>
				<Text className="text-lg text-[#73937e]">
					Por favor ingresa los datos
				</Text>
				<View className="flex-col w-[80%] h-auto mt-4">
					<Text className="text-lg font-bold text-[#73937e]">
						Nombre de la celula
					</Text>
					<TextInput
						value={cell.name}
						onChangeText={(text) => handleChange('name', text)}
						id="name"
						className="bg-[#ebebeb] focus:border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Ingresa tu nombre completo"

					/>
					<Text className="text-lg font-bold text-[#73937e]">
						Lider
					</Text>
					{
						allUsers?.users.length === 0 ? (
							<Text className='text-red-500'>No hay usuarios disponibles</Text>
						) : (
							<View className="bg-[#ebebeb] focus:border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center">

							<Picker
								selectedValue={cell.leaderId}
								onValueChange={(val:string) => handleChange('leaderId', val)}

							>
								{allUsers?.users.map((user) => (
									<Picker.Item key={user.id} label={user.name} value={user.id} />
								))}
							</Picker>
							</View>
						)
					}
					<Text className="text-lg font-bold text-[#73937e]	">
						Dia de reunión
					</Text>
					<View className="bg-[#ebebeb] focus:border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center">
						<Picker
							selectedValue={cell.meetingDay}
							onValueChange={(val:string) => handleChange('meetingDay', val)}

						>
							<Picker.Item label="Lunes" value="Monday" />
							<Picker.Item label="Martes" value="Tuesday" />
							<Picker.Item label="Miércoles" value="Wednesday" />
							<Picker.Item label="Jueves" value="Thursday" />
							<Picker.Item label="Viernes" value="Friday" />
							<Picker.Item label="Sábado" value="Saturday" />
							<Picker.Item label="Domingo" value="Sunday" />
						</Picker>
					</View>
					<Text className="text-lg font-bold text-[#73937e]">
						Hora de reunión
					</Text>
					<TouchableOpacity
						onPress={() => setShowTimePicker(true)}
						className="bg-[#ebebeb] focus:border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
					>
										<Text>
											{cell.meetingTime ? cell.meetingTime.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' }) : 'Selecciona una hora'}
										</Text>
					</TouchableOpacity>
					{showTimePicker && (
    <DateTimePicker
        value={cell.meetingTime}
        mode="time"
        display="default"
						onChange={(event: DateTimePickerEvent, selectedDate?: Date) => {
							handleChange('meetingTime',selectedDate!)
							setShowTimePicker(false);
						}}
    />
)}
					<Text className="text-lg font-bold text-[#73937e]">
						Lugar de reunión
					</Text>
					<TextInput
						value={cell.location}
						onChangeText={(text) => handleChange('location', text)}
						id="confirmPassword"
						className="bg-[#ebebeb] focus:border-[#73937e] rounded-lg w-full h-12 mt-2 mb-4 justify-center px-4"
						placeholder="Iglesia Costa"


					/>
				</View>
				<TouchableOpacity
					className="bg-[#0b1c0c] w-[80%] rounded-lg h-12 mt-4 justify-center items-center"
					onPress={() => handleSubmit()}
				>
					<Text className="text-white text-lg font-bold">
						Registrarse
					</Text>
				</TouchableOpacity>
			</ScrollView>
	)
}
