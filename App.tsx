import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import './global.css'
import { SafeAreaProvider } from 'react-native-safe-area-context';
export default function App() {
  return (
        <SafeAreaProvider style={{flex:1}}>

          <StatusBar style="auto" />
      </SafeAreaProvider>);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
