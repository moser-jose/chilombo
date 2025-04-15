import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

export default function UserLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: 'Perfil',
				headerStyle: {
					backgroundColor: Colors.primary,
				},
				headerTitleStyle: {
					color: 'white',
					fontSize: FontSize.lg,
					fontFamily: fontFamily.poppins.bold,
				},
			}}
		/>
	)
}
