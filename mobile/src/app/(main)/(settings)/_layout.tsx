import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack } from 'expo-router'

export default function SettingsLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: 'Configurações',
				headerTitleStyle: {
					color: 'white',
					fontSize: FontSize.smB,
					fontFamily: fontFamily.poppins.bold,
				},
			}}
		/>
	)
}
