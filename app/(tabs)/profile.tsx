// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useAuthOfProvider } from '../../hooks/AuthContext'; // 1. Importa el hook useAuth
import { Ionicons } from '@expo/vector-icons';
import { transformRol } from '../../helpers/transformRol';
import { router } from 'expo-router';

export default function ProfileScreen() {
  const { user, logout } = useAuthOfProvider();

  if (!user) {
    return (
      <View style={styles.container}>
        <Text>Cargando perfil...</Text>
      </View>
    );
  }

  const handleLogout = () => {
    Alert.alert(
      "Cerrar Sesión",
      "¿Estás seguro de que quieres cerrar sesión?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Sí, cerrar sesión",
          onPress: () => logout() // Llama a la función de logout del contexto
        }
      ]
    );
  };

  return (
    <View style={styles.container}>


      <View style={styles.header}>
        <Ionicons name="person-circle-outline" size={100} color="#4A5568" />
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Ionicons name="shield-checkmark-outline" size={24} color="#0b1c0c" />
          <Text style={styles.infoText}>Rol: {transformRol(user.role)}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="time-outline" size={24} color="#0b1c0c" />
          <Text style={styles.infoText}>Miembro desde: {new Date(user.createdAt).toLocaleDateString()}</Text>
        </View>
        <TouchableOpacity
          className='bg-[#0b1c0c] w-[100%] h-12 rounded-md flex justify-center items-center mt-4 '
          onPress={() => {
            router.push('/editProfile/' + user.id);
          }}
        >
          <Text className='text-white font-medium'>Editar información</Text>
        </TouchableOpacity>
            </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={22} color="#FFF" />
        <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    justifyContent: "space-between",
    padding: 20,
    position:'relative',
  },
  header: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#2D3748',
  },
  email: {
    fontSize: 16,
    color: '#718096',
    marginTop: 4,
  },
  infoContainer: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 3,
  },
  infoRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ffffff',
  },
  infoText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#4A5568',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E53E3E',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    marginTop: 'auto', // Empuja el botón hacia abajo
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
});