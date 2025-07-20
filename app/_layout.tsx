import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import '../global.css'

export default function RootLayout() {
  return (
    <>
      <StatusBar style="dark" backgroundColor="#F8FAFC" />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="doctor/[id]" options={{ presentation: 'modal' }} />
        <Stack.Screen name="booking/[id]" options={{ presentation: 'modal' }} />
      </Stack>
    </>
  )
}