import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native'
import React from 'react'

import * as WebBrowser from 'expo-web-browser'
import { useOAuth } from '@clerk/clerk-expo'

import { useWarmUpBrowser } from '@/hooks/warmUpBrowser'
import * as Linking from 'expo-linking'

import GoogleSVG from '@/assets/icons/google.svg'
import FacebookSVG from '@/assets/icons/facebook.svg'

WebBrowser.maybeCompleteAuthSession()

export default function LoginScreen() {
  useWarmUpBrowser()

  const { startOAuthFlow } = useOAuth({ strategy: 'oauth_google' })

  const onPress = React.useCallback(async () => {
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow({
          redirectUrl: Linking.createURL('/dashboard', { scheme: 'myapp' }),
        })

      if (createdSessionId) {
        setActive!({ session: createdSessionId })
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error('OAuth error', err)
    }
  }, [])

  return (
    <>
      <SafeAreaView />
      <ScrollView className=''>
        <View style={{ paddingTop: 45 }}>
          <Text className='text-2xl font-outfit text-gray-900 text-center'>
            Welcome back!
          </Text>
          <Text className='text-2xl font-outfit text-gray-900 text-center'>
            Sign in to continue!
          </Text>
        </View>

        <TouchableOpacity
          className='p-2.5 mt-8 bg-slate-200 rounded-md flex-row'
          onPress={onPress}>
          <GoogleSVG className='w-6 h-6' />
          <Text className='text-base font-outfit text-gray-900 text-center px-8'>
            Log in with Google
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className='p-2.5 mt-5 bg-slate-200 rounded-md flex-row'
          onPress={() => {}}>
          <FacebookSVG className='w-6 h-6' />
          <Text className='text-base font-outfit text-gray-900 text-center px-8'>
            Log in with Facebook
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}
