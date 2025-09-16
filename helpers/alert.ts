// helpers/alerts.ts
import { Alert } from 'react-native';

interface ConfirmationAlertParams {
  title: string;
  message: string;
  isDelete?: boolean;
  onConfirm: () => void;
}

/**
 * Muestra un diálogo de confirmación nativo.
 * @param title - El título del diálogo.
 * @param message - El mensaje principal del diálogo.
 * @param onConfirm - La función a ejecutar si el usuario presiona "Aceptar" o "Eliminar".
 */
export const showConfirmationAlert = ({ title, message, onConfirm,isDelete }: ConfirmationAlertParams) => {
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancelar',
        onPress: () => {},
        style: 'cancel',
      },

      {
        text: isDelete ? 'Eliminar' : 'Aceptar',
        onPress: onConfirm,
        style: isDelete ? 'destructive' : 'default',
      },
    ],
    { cancelable: true }
  );
};