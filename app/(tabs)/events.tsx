import React from "react";
import {
    Text,
    TouchableOpacity,
    View,
    FlatList,
    ActivityIndicator,
} from "react-native";
import Search from "../../components/Search";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import useEvent from "../../hooks/useEvent";
import EventCard from "../../components/eventCard"; // Importa el nuevo componente
import HeaderWithTitleAndActions from '../../components/headerWithTitleAndActions';

export default function EventsScreen() {
    const [showMenu, setShowMenu] = React.useState(false);
    const { allEvents, loading } = useEvent(); // Obtén el estado de carga

    const handleMenuOption = (path: string) => {
        setShowMenu(false);
        router.push(path);
    };

    return (
        <View className="flex-1 bg-white w-full">
            <HeaderWithTitleAndActions
                title="Eventos"
                setShowMenu={setShowMenu}
                showMenu={showMenu}
                options={[
                    {
                        label: "Registrar Evento",
                        icon: "add-circle-outline",
                        urlToNavigate: "/registerevent"
                    },
                    {
                        label: "Agregar Miembros",
                        icon: "person-add-outline",
                        urlToNavigate: "/addedMemberToCell"
                    }
                ]}
                handleMenuOption={handleMenuOption}
                showSearch={true}
            />

            {loading ? (
                <View className="flex-1 justify-center items-center">
                    <ActivityIndicator size="large" color="#16a34a" />
                </View>
            ) : (
                <FlatList
                    data={allEvents?.events}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => <EventCard event={item} />}
                    contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 16 }}
                    ListEmptyComponent={
                        <View className="flex-1 justify-center items-center mt-20 bg-gray-50">
                            <Ionicons
                                name="calendar-outline"
                                size={60}
                                color="#d1d5db"
                            />
                            <Text className="text-center text-gray-500 mt-4 text-lg">
                                No hay eventos disponibles.
                            </Text>
                        </View>
                    }
                />
            )}
        </View>
    );
}