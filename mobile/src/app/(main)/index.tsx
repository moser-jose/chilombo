import Header from '@/src/components/front/Header'
import { useUser } from '@clerk/clerk-expo';
import { Stack } from 'expo-router'
import React from 'react'
import { View, Text } from 'react-native'

export default function HomeScreen() {
	const { user } = useUser()

	return (
		<>
			<Stack.Screen options={{ header: () => <Header /> }} />
			<View>
				<Text>Home {user?.fullName}</Text>
			</View>
		</>
	)
}
