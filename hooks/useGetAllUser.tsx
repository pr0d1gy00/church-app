import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { Alert } from 'react-native';
import { UsersGetAllResponse } from '../interfaces/user.interfaces';
import users from '../app/(tabs)/users';
import { useFocusEffect } from 'expo-router';

export default function useGetAllUser() {
	const [allUsers, setAllUsers] = useState<UsersGetAllResponse | null>(null);
	const [loading, setLoading] = useState(false);

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
	  useFocusEffect(
        useCallback(() => {
            fetchAllUsers();
        }, []) // El array de dependencias vacío asegura que esto se ejecute solo cuando la pantalla obtiene el foco.
    );

	return {
		allUsers,
		fetchAllUsers,
		loading
	};
}
