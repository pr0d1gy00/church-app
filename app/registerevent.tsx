import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Switch,
    Platform,
    ActivityIndicator,
    KeyboardAvoidingView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker, {
    DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import useEvent from "../hooks/useEvent";

export default function RegisterEventScreen() {
    const { eventData, handleChange, handleSubmit, loading } = useEvent();
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const onDateChange = (
        event: DateTimePickerEvent,
        selectedDate?: Date
    ) => {
        setShowDatePicker(false);
        if (selectedDate) {
            const newDateTime = new Date(eventData.eventDate);
            newDateTime.setFullYear(selectedDate.getFullYear());
            newDateTime.setMonth(selectedDate.getMonth());
            newDateTime.setDate(selectedDate.getDate());
            handleChange("eventDate", newDateTime);
        }
    };

    // Manejador para cuando cambia la hora
    const onTimeChange = (
        event: DateTimePickerEvent,
        selectedTime?: Date
    ) => {
        setShowTimePicker(false); // Ocultar el picker
        if (selectedTime) {
            const newDateTime = new Date(eventData.eventDate);
            newDateTime.setHours(selectedTime.getHours());
            newDateTime.setMinutes(selectedTime.getMinutes());
            handleChange("eventDate", newDateTime);
        }
    };
    if (loading) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        backgroundColor: "#fff",
                        opacity: 0.1,
                    }}
                >
                    <ActivityIndicator size="large" color="#1e1e1e" />
                            <Text style={{ marginTop: 10, color: "#333",fontSize:24 }}>
                        Cargando...
                    </Text>
                </View>
            );
        }

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <ScrollView
                className="flex-1 bg-white"
                contentContainerStyle={{ paddingBottom: 40 }}
                keyboardShouldPersistTaps="handled"
            >
                <View className="px-6 py-8">
                    <Text className="text-3xl font-bold text-gray-800 mb-6 text-center">
                        Crear Nuevo Evento
                    </Text>

                    {/* Título del Evento */}
                    <View className="mb-5">
                        <Text className="text-base font-semibold text-gray-600 mb-2">
                            Título del Evento
                        </Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-lg p-3">
                            <Ionicons
                                name="text-outline"
                                size={20}
                                color="#6b7280"
                            />
                            <TextInput
                                className="flex-1 ml-3 text-base text-gray-900"
                                placeholder="Ej: Noche de Adoración"
                                placeholderTextColor="#9ca3af"
                                value={eventData.title}
                                onChangeText={(text) =>
                                    handleChange("title", text)
                                }
                            />
                        </View>
                    </View>

                    {/* Fecha y Hora del Evento */}
                    <View className="mb-5">
                        <Text className="text-base font-semibold text-gray-600 mb-2">
                            Fecha y Hora
                        </Text>
                        <View className="flex-row justify-between">
                            {/* Botón de Fecha */}
                            <TouchableOpacity
                                onPress={() => setShowDatePicker(true)}
                                className="flex-1 flex-row items-center bg-gray-50 border border-gray-300 rounded-lg p-3 mr-2"
                            >
                                <Ionicons
                                    name="calendar-outline"
                                    size={20}
                                    color="#6b7280"
                                />
                                <Text className="ml-2 text-base text-gray-900">
                                    {eventData.eventDate.toLocaleDateString(
                                        "es-ES",
                                        { dateStyle: "medium" }
                                    )}
                                </Text>
                            </TouchableOpacity>

                            {/* Botón de Hora */}
                            <TouchableOpacity
                                onPress={() => setShowTimePicker(true)}
                                className="flex-1 flex-row items-center bg-gray-50 border border-gray-300 rounded-lg p-3 ml-2"
                            >
                                <Ionicons
                                    name="time-outline"
                                    size={20}
                                    color="#6b7280"
                                />
                                <Text className="ml-2 text-base text-gray-900">
                                    {eventData.eventDate.toLocaleTimeString(
                                        "es-ES",
                                        { timeStyle: "short" }
                                    )}
                                </Text>
                            </TouchableOpacity>
                        </View>

                        {/* Pickers Modales */}
                        {showDatePicker && (
                            <DateTimePicker
                                value={eventData.eventDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}
                        {showTimePicker && (
                            <DateTimePicker
                                value={eventData.eventDate}
                                mode="time"
                                display="default"
                                onChange={onTimeChange}
                            />
                        )}
                    </View>

                    {/* Ubicación */}
                    <View className="mb-5">
                        <Text className="text-base font-semibold text-gray-600 mb-2">
                            Ubicación
                        </Text>
                        <View className="flex-row items-center bg-gray-50 border border-gray-300 rounded-lg p-3">
                            <Ionicons
                                name="location-outline"
                                size={20}
                                color="#6b7280"
                            />
                            <TextInput
                                className="flex-1 ml-3 text-base text-gray-900"
                                placeholder="Ej: Templo Principal"
                                placeholderTextColor="#9ca3af"
                                value={eventData.location || ""}
                                onChangeText={(text) =>
                                    handleChange("location", text)
                                }
                            />
                        </View>
                    </View>

                    {/* Descripción */}
                    <View className="mb-6">
                        <Text className="text-base font-semibold text-gray-600 mb-2">
                            Descripción
                        </Text>
                        <View className="bg-gray-50 border border-gray-300 rounded-lg p-3">
                            <TextInput
                                className="h-24 text-base text-gray-900"
                                placeholder="Añade detalles adicionales..."
                                placeholderTextColor="#9ca3af"
                                multiline
                                textAlignVertical="top"
                                value={eventData.description || ""}
                                onChangeText={(text) =>
                                    handleChange("description", text)
                                }
                            />
                        </View>
                    </View>

                    {/* Notificar a todos */}
                    <View className="flex-row items-center justify-between mb-8 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <View className="flex-1 pr-4">
                            <Text className="text-base font-semibold text-gray-800">
                                Notificar a todos
                            </Text>
                            <Text className="text-sm text-gray-500 mt-1">
                                Enviar una notificación push del evento.
                            </Text>
                        </View>
                        <Switch
                            trackColor={{ false: "#d1d5db", true: "#a7f3d0" }}
                            thumbColor={
                                eventData.notifyAll ? "#059669" : "#f3f4f6"
                            }
                            ios_backgroundColor="#3e3e3e"
                            onValueChange={(value) =>
                                handleChange("notifyAll", value)
                            }
                            value={eventData.notifyAll}
                        />
                    </View>

                    {/* Botón de Enviar */}
                    <TouchableOpacity
                        onPress={handleSubmit}
                        className={`h-14 rounded-lg flex-row justify-center items-center px-6 ${
                            loading
                                ? "bg-gray-400"
                                : "bg-green-600 active:bg-green-700"
                        }`}
                    >
                        {loading ? (
                            <ActivityIndicator color="#ffffff" />
                        ) : (
                            <>
                                <Ionicons
                                    name="checkmark-circle-outline"
                                    size={22}
                                    color="#ffffff"
                                />
                                <Text className="text-white text-lg font-bold ml-3">
                                    Crear Evento
                                </Text>
                            </>
                        )}
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}