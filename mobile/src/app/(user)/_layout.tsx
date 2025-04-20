import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack } from 'expo-router'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { router } from 'expo-router'
export default function UserLayout() {
	return (
		<Stack
			screenOptions={{
				headerTitle: 'Perfil',
				headerShown: true,
				headerTitleStyle: {
					fontFamily: fontFamily.poppins.medium,
					fontSize: FontSize.smB,
					color: 'white',
				},
				headerStyle: {
					backgroundColor: Colors.dark.colors.backgroundHeaderScreen,
				},
				headerLeft: () => (
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons name="chevron-back" size={24} color="white" />
					</TouchableOpacity>
				),

			}}
		/>
	)
}
