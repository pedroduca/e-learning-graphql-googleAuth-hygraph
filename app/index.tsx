import { Text, View } from 'react-native'

import { useFonts } from 'expo-font'

export default function Index() {
  const [fontsLoaded, fontError] = useFonts({
    'Inter-Black': require('./assets/fonts/Inter-Black.otf'),
  })

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>Edit app/index.tsx to edit this screen.</Text>
    </View>
  )
}
