import { FontSize } from '@/src/constants/FontSize'
import { fontFamily } from '@/src/constants/FontFamily'
import { Stack } from 'expo-router'
import Colors from '@/src/constants/Colors'

export default function SettingsLayout() {
	return (
		<Stack
			screenOptions={{
				headerShown: true,
				headerTitle: 'Meus Serviços',
				headerTitleStyle: {
					fontSize: FontSize.smB,
					fontFamily: fontFamily.poppins.bold,
					color: Colors.dark.colors.text,
				},
				headerStyle: {
					backgroundColor: Colors.black,
				},
			}}
		/>
	)
}
