import { Stack } from 'expo-router'
import { useTheme } from '@/src/hooks/useTheme'
import { View } from 'react-native'

export default function CheckoutLayout() {
	const { theme } = useTheme()
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
