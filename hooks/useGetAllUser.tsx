import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { UsersGetAllResponse } from '../interfaces/user.interfaces';
import users from '../app/(tabs)/users';
import { router, useFocusEffect } from 'expo-router';

export default function useGetAllUser() {
	const [allUsers, setAllUsers] = useState<UsersGetAllResponse | null>(null);
	const [loading, setLoading] = useState(false);
	const [userStateToShow, setUserStateToShow] = useState<string | null>('all');

	const fetchAllUsers = async () => {
		setLoading(true);
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/users/getAllUsers`
			);
			setAllUsers(response.data);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener los usuarios"
				);
			}
		}finally {
			setLoading(false);
		}
	};
	const getUserDeletedAt = async () => {
		try {
			const response = await axios.get(
				`${process.env.EXPO_PUBLIC_API_URL}/church/users/getAllUsersDeleted`
			);
			console.log(response.data)
			setAllUsers(response.data);
		}
		catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener la información del usuario"
				);
			}
		}
	}
	  useFocusEffect(
        useCallback(() => {
			if(userStateToShow === "inactive"){
				getUserDeletedAt();
			}else{
            fetchAllUsers();
}
        }, [userStateToShow]) // El array de dependencias vacío asegura que esto se ejecute solo cuando la pantalla obtiene el foco.
    );

	return {
		allUsers,
		fetchAllUsers,
		loading,
				setUserStateToShow,
		userStateToShow,

	};
}
