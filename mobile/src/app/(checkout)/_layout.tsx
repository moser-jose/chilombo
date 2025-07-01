import { Stack } from 'expo-router'
import { View } from 'react-native'
import { useCustomTheme } from '@/src/context/ThemeContext'

export default function CheckoutLayout() {
	const { theme } = useCustomTheme()
	return (
		<Stack
			screenOptions={{
				headerShown: true,

				headerBackground: () => (
					<View
						style={{
							backgroundColor: theme.colors.backgroundHeader,
							height: '100%',
							width: '100%',
							borderBottomWidth: 0.5,
							borderBottomColor: theme.colors.border,
						}}
					/>
				),

				headerTintColor: theme.colors.text,
			}}
		>
			<Stack.Screen name="address-select" options={{ title: 'Endereço' }} />
			<Stack.Screen name="order-review" options={{ title: 'Revisão' }} />
			<Stack.Screen name="payment" options={{ title: 'Pagamento' }} />
		</Stack>
	)
}
