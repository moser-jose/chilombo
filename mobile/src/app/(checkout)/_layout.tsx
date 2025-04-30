import { Stack } from 'expo-router'
import { CheckoutProvider } from '../../context/CheckoutContext'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Theme } from '@/src/types/theme'
import { useCustomTheme } from '@/src/context/ThemeContext'

const HeaderAddress = () => {
	const { theme } = useCustomTheme()
	const styles = useStyles(theme as Theme)
	return (
		<View
			style={{
				backgroundColor: 'red',
				flexDirection: 'row',
				alignItems: 'center',
				justifyContent: 'space-between',
				paddingHorizontal: 16,
				paddingVertical: 12,
				width: '100%',
				flex: 1,
			}}
		>
			<Ionicons name="chevron-back" size={24} color="white" />
			<Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
				Endereço
			</Text>
		</View>
	)
}

export default function CheckoutLayout() {
	const { theme } = useCustomTheme()
	return (
		<CheckoutProvider>
			<Stack
				screenOptions={{
					headerShown: true,
					headerStyle: {
						backgroundColor: theme.colors.backgroundHeaderScreen,
					},
					headerTintColor: theme.colors.text,
				}}
			>
				<Stack.Screen name="address-select" options={{ title: 'Endereço' }} />
				<Stack.Screen name="order-review" options={{ title: 'Revisão' }} />
				<Stack.Screen name="payment" options={{ title: 'Pagamento' }} />
			</Stack>
		</CheckoutProvider>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		text: {
			color: theme.colors.text,
			fontSize: 16,
			fontWeight: 'bold',
		},
	})
