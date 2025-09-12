// helpers/alerts.ts
import { Alert } from 'react-native';

interface ConfirmationAlertParams {
  title: string;
  message: string;
  onConfirm: () => void; // La función que se ejecutará si el usuario confirma
}

/**
 * Muestra un diálogo de confirmación nativo.
 * @param title - El título del diálogo.
 * @param message - El mensaje principal del diálogo.
 * @param onConfirm - La función a ejecutar si el usuario presiona "Aceptar" o "Eliminar".
 */
export const showConfirmationAlert = ({ title, message, onConfirm }: ConfirmationAlertParams) => {
  Alert.alert(
    title,
    message,
    [
      // Botón 1: Cancelar
      {
        text: 'Cancelar',
        onPress: () => {}, // No hace nada, solo cierra el diálogo
        style: 'cancel', // 'cancel' le da un tratamiento especial en iOS/Android
      },
      // Botón 2: Confirmar (la acción destructiva)
      {
        text: 'Eliminar',
        onPress: onConfirm, // Ejecuta la función que pasamos como parámetro
        style: 'destructive', // 'destructive' pone el texto en rojo en iOS, indicando peligro
      },
    ],
    { cancelable: true } // Permite cerrar el diálogo tocando fuera en Android
  );
};