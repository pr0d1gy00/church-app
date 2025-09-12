import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal, Text } from 'react-native';

const Loading = ({ visible = false }: { visible: boolean }) => {
  if (!visible) return null;

  return (
    <Modal
      transparent={true}
      animationType="fade"
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={styles.activityIndicatorWrapper}>
          <ActivityIndicator size="large" color="#0b1c0c" />
          <Text style={styles.loadingText}>Cargando...</Text>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  activityIndicatorWrapper: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  loadingText: {
    color: '#0b1c0c',
    fontSize: 16,
  }
});

export default Loading;
