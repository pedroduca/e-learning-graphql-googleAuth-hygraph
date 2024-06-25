import { SafeAreaView, Text } from 'react-native'

import { useFonts } from 'expo-font'
import LoginScreen from './screen/LoginScreen'

import * as SecureStore from 'expo-secure-store'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo'
import { SignedIn, SignedOut } from '@clerk/clerk-expo'

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env',
  )
}

export interface TokenCache {
  getToken: (key: string) => Promise<string | undefined | null>
  saveToken: (key: string, token: string) => Promise<void>
  clearToken?: (key: string) => void
}

const tokenCache: TokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}
export default function Index() {
  const [fontsLoaded] = useFonts({
    outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Light': require('../assets/fonts/Outfit-Light.ttf'),
    'outfit-SemiBold': require('../assets/fonts/Outfit-SemiBold.ttf'),
  })

  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <ClerkLoaded>
        <SafeAreaView
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <SignedIn>
            <Text>You are Signed in</Text>
          </SignedIn>
          <SignedOut>
            <LoginScreen />
          </SignedOut>
        </SafeAreaView>
      </ClerkLoaded>
    </ClerkProvider>
  )
}
