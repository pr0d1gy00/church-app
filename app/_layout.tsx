import { router, Stack } from "expo-router";
import {
	SafeAreaProvider,
	SafeAreaView,
} from "react-native-safe-area-context";
import { AuthProvider } from "../hooks/AuthContext";
import messaging from "@react-native-firebase/messaging";
import "../firebase";
import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import "../global.css";

Notifications.setNotificationHandler({
	async handleNotification(notification) {
		return {
			shouldShowAlert: true,
			shouldPlaySound: true,
			shouldSetBadge: false,
			shouldShowBanner: true,
			shouldShowList: true,
		};
	},
});
export default function Layout() {


	useEffect(() => {
		const unsubscribe = messaging().onMessage(
			async (remoteMessage) => {
				if (remoteMessage.notification) {
					await Notifications.scheduleNotificationAsync({
						content: {
							title: remoteMessage.notification.title,
							body: remoteMessage.notification.body,
							data: remoteMessage.data,
						},
						trigger: null,
					});
				}
			}
		);

		return unsubscribe;
	}, []);

	return (
		<AuthProvider>
			<SafeAreaProvider>
				<SafeAreaView style={{ flex: 1 }}>
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
