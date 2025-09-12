import React, { useState, createContext, useContext, useEffect, ReactNode } from 'react';
import { router, useSegments } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../interfaces/user.interfaces';

// Interfaz para los datos del contexto de autenticación
interface AuthContextData {
  user: User | null;
  login: (userData: any) => Promise<void>;
  logout: () => Promise<void>;
}

// Crear el contexto de autenticación
export const AuthContext = createContext<AuthContextData>({
  user: null,
  login: async () => {},
  logout: async () => {},
});

// Hook para usar el contexto de autenticación
export function useAuthOfProvider() {
  return useContext(AuthContext);
}

function useProtectedRoute(user: any, isLoading: boolean) {
  const segments = useSegments();

  useEffect(() => {
    // 2. Si estamos cargando O los segmentos del router no están listos, no hacemos nada.
    if (isLoading || segments.length === 0) {
      return;
    }

    const inAuthGroup = segments.includes('login') || segments.includes('registeruser');

    if (!user && !inAuthGroup) {
      router.replace('/login');
    }
    else if (user && inAuthGroup) {
      router.replace('/(tabs)');
    }
  }, [user, segments, isLoading]); // 3. Añadimos isLoading a las dependencias
}


export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const storedUser = await AsyncStorage.getItem('user');
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
   await AsyncStorage.setItem('user', JSON.stringify(userData));
 };

 const logout = async () => {
   setUser(null);
   await AsyncStorage.removeItem('user');
 };
  // 4. Llamamos al hook INCONDICIONALMENTE en cada renderizado
  useProtectedRoute(user, isLoading);

  // Mantenemos esta lógica para evitar el error de navegación inicial
  if (isLoading) {
    return null;
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
