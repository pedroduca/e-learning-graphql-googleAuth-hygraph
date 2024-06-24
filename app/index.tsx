import { Text, View } from 'react-native'

import { useFonts } from 'expo-font'

export default function Index() {
  const [fontsLoaded] = useFonts({
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    'outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{ fontFamily: 'outfit' }}>
        Edit app/index.tsx to edit this screen.
      </Text>
    </View>
  )
}
