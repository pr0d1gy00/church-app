import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Event } from "../interfaces/event.interfaces";
import { router } from "expo-router";

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString("es-ES", { month: "short" });
    return { day, month: month.toUpperCase().replace(".", "") };
};

const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("es-ES", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    });
};

export default function EventCard({ event }: { event: Event }) {
    const { day, month } = formatDate(event.eventDate);
    const time = formatTime(event.eventDate);

    return (
        <TouchableOpacity
            onPress={() => router.push(`/event/${event.id}`)}
            className="bg-gray-50 rounded-xl shadow-lg mb-4 overflow-hidden flex-row"
        >
            <View className="bg-green-600 p-4 w-20 justify-center items-center">
                <Text className="text-white text-3xl font-bold">{day}</Text>
                <Text className="text-white text-base font-semibold tracking-wider">
                    {month}
                </Text>
            </View>

            <View className="flex-1 p-4 justify-center">
                <Text
                    className="text-lg font-bold text-gray-800 mb-1"
                    numberOfLines={1}
                >
                    {event.title}
                </Text>

                <View className="flex-row items-center mb-1">
                    <Ionicons name="time-outline" size={16} color="#6b7280" />
                    <Text className="text-sm text-gray-600 ml-2">{time}</Text>
                </View>

                {event.location && (
                    <View className="flex-row items-center">
                        <Ionicons
                            name="location-outline"
                            size={16}
                            color="#6b7280"
                        />
                        <Text
                            className="text-sm text-gray-600 ml-2"
                            numberOfLines={1}
                        >
                            {event.location}
                        </Text>
                    </View>
                )}
            </View>
        </TouchableOpacity>
    );
}