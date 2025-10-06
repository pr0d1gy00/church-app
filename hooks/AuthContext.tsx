import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	ReactNode,
} from "react";
import { router, useSegments } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { User } from "../interfaces/user.interfaces";
import { ActivityIndicator, Text, View } from "react-native";
import JWT, { SupportedAlgorithms } from 'expo-jwt';

interface AuthContextData {
	dataUserWithBiometrics: {
		email: string;
		token: string;
	} | null;
	user: User | null;
	login: (userData: User) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
	dataUserWithBiometrics: null,
	user: null,
	login: async () => {},
	logout: async () => {},
});

export function useAuthOfProvider() {
	return useContext(AuthContext);
}

function useProtectedRoute(user: any, isLoading: boolean) {
	const segments:string[] = useSegments();

	useEffect(() => {
		if (isLoading || segments[0]?.length === 0) {
			return;
		}

		const inAuthGroup = segments.length === 0 ||
			segments.includes("login") ||
			segments.includes("registeruser");
		if (!user && !inAuthGroup) {
			router.replace("/login");
		} else if (user && inAuthGroup) {
			router.replace("/(tabs)");
		}
	}, [user, segments, isLoading]);
}

export function AuthProvider({ children }: { children: ReactNode }) {

	const [user, setUser] = useState<any>(null);
	const [dataUserWithBiometrics, setDataUserWithBiometrics] = useState<{
		email: string;
		token: string;
	} | null>(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadUser = async () => {
		try {
			const storedUser = await AsyncStorage.getItem("user");
			if (storedUser) {
				try {
					const parsed = JSON.parse(storedUser);
					if (parsed) {
						setDataUserWithBiometrics({
							email: parsed.email,
							token: parsed.token,
						});
					} else {
						await AsyncStorage.removeItem("user");
					}
				} catch {
					await AsyncStorage.removeItem("user");
				}
			}
		} catch (e) {
			console.error("Failed to load user from storage", e);
		} finally {
			setIsLoading(false);
		}
	};
	useEffect(() => {
		loadUser();
	}, []);

	const login = async (userData: any) => {
		setUser(userData)
		const passwordToken = JWT.encode({
			email: userData.email,
			password: userData.password
		}, process.env.EXPO_PUBLIC_JWT_SECRET!);
		await AsyncStorage.setItem("user", JSON.stringify({
			...userData,
			token: passwordToken
		}));
		const isFirstLoginStr = await AsyncStorage.getItem("isFirstLogin");
		if (isFirstLoginStr === null) {
			await AsyncStorage.setItem("isFirstLogin", "false");
		}

		await AsyncStorage.setItem(
			"credentialsToLoginWithBiometrics",
			JSON.stringify({
				email: userData.email,
				token: passwordToken,
			})
		);
		const credentials = await AsyncStorage.getItem(
			"credentialsToLoginWithBiometrics"
		);
		setDataUserWithBiometrics(credentials ? JSON.parse(credentials) : null);
	};

	const logout = async () => {
		setUser(null);
		await AsyncStorage.removeItem("user");
	};
	useProtectedRoute(user, isLoading);

	if (isLoading) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: "center",
					alignItems: "center",
					backgroundColor: "#fff",
				}}
			>
				<ActivityIndicator size="large" color="#333" />
				<Text style={{ marginTop: 10, color: "#333" }}>
					Restaurando sesión...
				</Text>
			</View>
		);
	}

	return (
		<AuthContext.Provider value={{ user, login, logout, dataUserWithBiometrics }}>
			{children}
		</AuthContext.Provider>
	);
}
