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

interface AuthContextData {
	user: User | null;
	login: (userData: any) => Promise<void>;
	logout: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({
	user: null,
	login: async () => {},
	logout: async () => {},
});

export function useAuthOfProvider() {
	return useContext(AuthContext);
}

function useProtectedRoute(user: any, isLoading: boolean) {
	const segments = useSegments();
  console.log(segments)
	useEffect(() => {
		if (isLoading || segments[0]?.length === 0) {
			return;
		}

		const inAuthGroup =
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
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const loadUser = async () => {
			try {
				const storedUser = await AsyncStorage.getItem("user");
				if (storedUser) {
					setUser(JSON.parse(storedUser));
				}
			} catch (e) {
				console.error("Failed to load user from storage", e);
			} finally {
				setIsLoading(false);
			}
		};
		loadUser();
	}, []);
	const login = async (userData: any) => {
		setUser(userData);
		await AsyncStorage.setItem("user", JSON.stringify(userData));
	};

	const logout = async () => {
		setUser(null);
		await AsyncStorage.removeItem("user");
	};
	useProtectedRoute(user, isLoading);

	if (isLoading) {
		return null;
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
}
