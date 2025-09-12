// app/(tabs)/_layout.tsx

import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuthOfProvider } from "../../hooks/AuthContext";

// Definimos una interfaz para la estructura de nuestras pantallas
interface TabScreen {
	name: string;
	title: string;
	icon: keyof typeof Ionicons.glyphMap;
	roles: string[]; // Roles que pueden ver esta pestaña
}

export default function Layout() {
	const { user } = useAuthOfProvider();

	const allScreens: TabScreen[] = [
		{
			name: "index",
			title: "Home",
			icon: "home",
			roles: ["ADMIN", "MEMBER", "LEADER"],
		},
		{
			name: "users",
			title: "Usuarios",
			icon: "people",
			roles: ["ADMIN", "LEADER"],
		},
		{
			name: "cell",
			title: "Células",
			icon: "apps",
			roles: ["ADMIN", "LEADER"],
		},
		{
			name: "events",
			title: "Eventos",
			icon: "calendar",
			roles: ["ADMIN", "LEADER"],
		},
		{
			name: "profile",
			title: "Perfil",
			icon: "person",
			roles: ["ADMIN", "MEMBER", "LEADER"],
		},
	];

	// 2. Filtramos esa lista para obtener solo las pantallas a las que el usuario actual tiene acceso
	return (
		<Tabs
			screenOptions={{
				headerShown: false,
				tabBarActiveTintColor: "#73937e",
				// ...tus otros screenOptions
			}}
		>
			{/* 3. Mapeamos el array filtrado para renderizar solo las pestañas permitidas */}
			{allScreens.map((screen) => {
				const allowed =
					user && screen.roles.includes(user.role);

                let screenHref: string | null = null;
                if (allowed) {
                    screenHref = screen.name === 'index' ? '/' : screen.name;
                }
				return (
					<Tabs.Screen
						key={screen.name}
						name={screen.name} // Usamos 'as any' para satisfacer a TypeScript aquí
						options={{
							title: screen.title,
							tabBarIcon: () => (
								<Ionicons
									size={24}
									name={screen.icon}
									color={"#0b1c0c"}
								/>
							),
							href: screenHref,
						}}
					/>
				);
			})}
		</Tabs>
	);
}
