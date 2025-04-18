import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: 'Configurações',
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
