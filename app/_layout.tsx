import { Stack } from "expo-router";
import {
	SafeAreaProvider,
	SafeAreaView,
} from "react-native-safe-area-context";
import { AuthProvider } from "../hooks/AuthContext";

export default function Layout() {
	return (
		<AuthProvider>
		<SafeAreaProvider>

					<SafeAreaView style={{flex:1}}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" />
				<Stack.Screen name="login" />
				<Stack.Screen name="registeruser" />
				<Stack.Screen name="registercell" />
				<Stack.Screen name="addedMemberToCell" />
   			</Stack>

			</SafeAreaView>
		</SafeAreaProvider>
		</AuthProvider>
	);
}
