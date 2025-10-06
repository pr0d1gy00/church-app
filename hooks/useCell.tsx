import axios, { isAxiosError } from "axios";
import { use, useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";
import { UsersApiResponse } from "../interfaces/user.interfaces";
import { CellApiResponseById, CellsApiResponse } from "../interfaces/cell.interfaces";
import { router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { useAuthOfProvider } from "./AuthContext";
import { showConfirmationAlert } from "../helpers/alert";
import { set } from "date-fns";

export default function useCell() {
	const [cell, setCell] = useState({
		name: "",
		leaderId: "",
		meetingDay: "Monday",
		meetingTime: new Date(),
		location: "",
	});
	const [cellByIdData, setCellByIdData] = useState<CellApiResponseById | null>(null);
	const {id} = useLocalSearchParams();
	const [allCells, setAllCells] = useState<CellsApiResponse | null>(
		null
	);
	const [loading, setLoading] = useState(false);
	const [allUsers, setAllUsers] = useState<UsersApiResponse | null>(
		null
	);
	const [stateToShow, setStateToShow] = useState<"active" | "inactive">("active");
	const {user} = useAuthOfProvider()
	const [selectedCellToSend, setSelectedCellToSend] = useState<
		number | null
	>(allCells?.cells[0]?.id || null);
	const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

	const confirmAndDeleteUserFromCell = (id:number)=>{
		showConfirmationAlert({
			title: "Confirmar eliminación",
			message: "¿Estás seguro de que deseas eliminar esta célula?",
			onConfirm: ()=>{handleDeleteUserFromCell(	id)
		}}

		)
			}
	const confirmAndDeleteCell= (id:number)=>{
		showConfirmationAlert({
			title: "Confirmar eliminación",
			message: "¿Estás seguro de que deseas eliminar esta célula?",
			onConfirm: ()=>{handleDeleteCell(	id)
		}}
		)
			}
				const confirmAndActivateCell= (id:number)=>{
		showConfirmationAlert({
			title: "Confirmar Activación",
			isDelete: false,
			message: "¿Estás seguro de que deseas activar esta célula?",
			onConfirm: ()=>{handleActivateCell(	id)

		}}
		)
			}

	const handleValueChange = (userId: number) => {
		setSelectedUsers((currentSelectedUsers) => {
			if (currentSelectedUsers.includes(userId)) {
				// Si ya está seleccionado, lo filtramos (eliminamos)
				return currentSelectedUsers.filter(
					(id) => id !== userId
				);
			} else {
				// Si no está seleccionado, lo agregamos
				return [...currentSelectedUsers, userId];
			}
		});
	};
	const handleChange = (name: string, value: string | Date) => {
		setCell({
			...cell,
			[name]: value,
		});
	};
	const handleGetCellById = async (id:number) => {
		setLoading(true);
		try {
			const response = await axios.get(`${process.env.EXPO_PUBLIC_API_URL}/church/cells/getCellById`,{
				params:{
					id
				}
			})
			if(response.status === 200){
				setCellByIdData(response.data);
				setSelectedCellToSend(response.data.cell.id)
			}
		}catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener la células"
				);
		} finally {
			setLoading(false);
		}
	}
	const handeSubmitaddMemberToCell = async () => {
		if (!selectedCellToSend || selectedUsers.length === 0) {
			Alert.alert("Por favor, selecciona una célula y al menos un usuario");
			return;
		}
		setLoading(true);

		try {
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/addUserToCell`,
				{
					userId: selectedUsers
				},
				{
					params:{
						cellId:selectedCellToSend
					}
				}
			)
			if (response.status >= 200 && response.status < 300) {
							Alert.alert(response.data.message || "Miembros 	agregados con éxito");
							setTimeout( () => {
							router.back();
							}, 1000);
						}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener los usuarios"
				);
		}finally {
			setLoading(false);
		}
	}
	const handleGetUsers = async () => {
				setLoading(true);

		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/users/getAllUsers`
			);
			setAllUsers(response.data);
		} catch (error) {
		if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener los usuarios"
				);
		} finally {
			setLoading(false);
		}
	};
	const handleSubmit = async () => {
		if (
			!cell.name ||
			!cell.leaderId ||
			!cell.meetingDay ||
			!cell.meetingTime ||
			!cell.location
		) {
			Alert.alert("Por favor, completa todos los campos");
			return;
		}
		const cellData: {
			name: string;
			leaderId: number;
			meetingDay: string;
			meetingTime: Date;
			location: string;
			userId: number;
		} = {
			name: cell.name,
			leaderId: parseInt(cell.leaderId),
			meetingDay: cell.meetingDay,
			meetingTime: new Date(cell.meetingTime.toISOString()),
			location: cell.location,
			userId: user?.id as number,
		};
		if( !id ){
			setLoading(true);
		try {
			const response = await axios.post(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/createCell`,
				{
					...cellData,
				}
			);
			Alert.alert(
				response.data.message || "Célula registrada con éxito"
			);
			setCell({
				name: "",
				leaderId: "",
				meetingDay: "Monday",
				meetingTime: new Date(),
				location: "",
			});
			router.push("/(tabs)/cell");

		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo registrar la célula"
				);
		}finally {
			setLoading(false);
		}
	}else{
			setLoading(true);
			try {
			const response = await axios.put(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/updateCell`,
				{
					...cellData,
				},{
					params:{
						id: Number(id)
					}
				}
			);
			Alert.alert(
				response.data.message || "Célula registrada con éxito"
			);
			setCell({
				name: "",
				leaderId: "",
				meetingDay: "Monday",
				meetingTime: new Date(),
				location: "",
			});
			router.back();
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo registrar la célula"
				);


		}finally {
			setLoading(false);
		}
	}
	};

	const handleDeleteCell = async (id:number) => {
			setLoading(true);
		try {
			const response = await axios.delete(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/deleteCell`,
				{
					params: {
						id
					}
				}
			);
			if (response.status === 200) {
				Alert.alert(response.data.message || "Célula eliminada con éxito");
				handleGetCells();
				router.back();
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo eliminar la célula"
				);
		}finally {
			setLoading(false);
		}
	};
		const handleActivateCell = async (id:number) => {
			setLoading(true);
		try {
			const response = await axios.put(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/activateCell`,{},
				{
					params: {
						id
					}
				}
			);
			if (response.status === 200) {
				Alert.alert(response.data.message || "Célula activada con éxito");
				handleGetCells();
				router.back();
			}
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo activada la célula"
				);
		}
		finally {
			setLoading(false);
		}
	};

	const handleDeleteUserFromCell = async (idUser:number) => {
			setLoading(true);
		try {
			const response = await axios.delete(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/removeUserFromCell`,
				{
					params: {
						cellId:id,
						userId: idUser,
					}
				}
			)
			if (response.status === 200) {
				Alert.alert(response.data.message || "Célula eliminada con éxito");
				handleGetCellById(Number(id));
			}
			}catch (error) {
				if (isAxiosError(error))
					Alert.alert(
						error.response?.data?.message || "Error",
						"No se pudo eliminar la célula"
					);
		}finally {
			setLoading(false);
		}
	};

	const handleGetCells = async () => {
			setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/getAllCells`
			);
			setAllCells(response.data);
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener las células"
				);
		}finally {

			setLoading(false);
		}
	};
	const handleGetCellsDeleted = async () => {
			setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/cells/getCellsDeleted`
			);
			setAllCells(response.data);
		} catch (error) {
			if (isAxiosError(error))
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener las células"
				);
		}
		finally {
			setLoading(false);
		}
	};
	useFocusEffect(
		useCallback(() => {
		handleGetUsers();
		}, [])
	);

	useFocusEffect(
		useCallback(() => {
		if(stateToShow === "active"){
			handleGetCells();
		}else{
			handleGetCellsDeleted();
		}
	}, [stateToShow])
	);

	useFocusEffect(
		useCallback(() => {
		if(id){
			handleGetCellById(Number(id));
		}
	}, [id]));

	return {
		cell,
		handleChange,
		allUsers,
		handleSubmit,
		allCells,
		setSelectedCellToSend,
		selectedCellToSend,
		selectedUsers,
		handleValueChange,
		handeSubmitaddMemberToCell,
		cellByIdData,
		setCell,
		confirmAndDeleteUserFromCell,
		confirmAndDeleteCell,
		id,
		confirmAndActivateCell,
		stateToShow,
		setStateToShow,
		loading,
	};
}
