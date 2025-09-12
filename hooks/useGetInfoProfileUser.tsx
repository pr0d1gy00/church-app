import { useLocalSearchParams } from 'expo-router';
import React, { useEffect, useState } from 'react'
import { User } from '../interfaces/user.interfaces';
import axios from 'axios';
import { Alert } from 'react-native';
import { use } from 'react';
import useUser from './useUser';

export default function useGetInfoProfileUser() {
	const [loading, setLoading] = useState(false);
	const [user, setUser] = useState<User | null>(null);
	const {setDataUserRegister}=useUser()


	const fetchUserById = async () => {
		setLoading(true);
		try {
			const response = await axios.get(`http://192.168.110.232:4000/church/users/getUserbyId`,{
				//params: { id }
			});
			setDataUserRegister({
				name: response.data.user.name,
				email: response.data.user.email,
				password: "",
				confirmPassword: "",
			});
		} catch (error) {
			if (axios.isAxiosError(error)) {
				Alert.alert(
					error.response?.data?.message || "Error",
					"No se pudo obtener la información del usuario"
				);
			}
		} finally {
			setLoading(false);
		}
	};

	// useEffect(() => {
	// 	fetchUserById();
	// }, [id]);

	return {
		user,
		loading
	}
}
