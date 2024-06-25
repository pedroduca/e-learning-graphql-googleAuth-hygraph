import { SafeAreaView, Text, View } from 'react-native'

import { useFonts } from 'expo-font'
import LoginScreen from './screen/LoginScreen'

export default function Index() {
  const [fontsLoaded] = useFonts({
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    'outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  })

  return (
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LoginScreen />
    </SafeAreaView>
  )
}
