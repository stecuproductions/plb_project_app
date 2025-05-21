import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import '../global.css';

export const API_URL = 'https://plbprojectapp-production.up.railway.app'; 

export default function RootLayout() {
  // Load fonts
  useFonts({
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });
  return (
    <>
      <StatusBar hidden={true} />
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="QuizDetailPage" options={{ headerShown: false }} />
        <Stack.Screen name="QuizGameplay" options={{ headerShown: false }} />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
