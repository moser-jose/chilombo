import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	// useColorScheme, // No longer needed here
} from 'react-native'
import { Ionicons } from '@expo/vector-icons'
// import { useThemeColor } from '@/src/components/Themed' // Use context colors instead
import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack, useRouter } from 'expo-router'
// import AsyncStorage from '@react-native-async-storage/async-storage' // Handled by context
import { useCustomTheme } from '@/src/context/ThemeContext' // Import the custom hook

type ThemeOption = 'light' | 'dark' | 'system' // Keep this type definition

export default function AppearanceScreen() {
	const router = useRouter()
	// const deviceTheme = useColorScheme() ?? 'light'
	// Load persisted theme or default to 'system'
	// const [selectedTheme, setSelectedTheme] = useState<ThemeOption>('system')
	// const theme = selectedTheme === 'system' ? deviceTheme : selectedTheme

	// Get theme state and functions from context
	const {
		themePreference,
		effectiveTheme,
		setThemePreference,
		themeColors, // Get the resolved color object
	} = useCustomTheme()

	// useEffect(() => {
	// 	const loadTheme = async () => {
	// 		try {
	// 			const storedTheme = (await AsyncStorage.getItem(
	// 				'theme',
	// 			)) as ThemeOption | null
	// 			if (storedTheme) {
	// 				setSelectedTheme(storedTheme)
	// 			}
	// 		} catch (error) {
	// 			console.error('Failed to load theme from storage', error)
	// 		}
	// 	}
	// 	loadTheme()
	// }, []) // Loading is now handled in the context provider

	// const backgroundColor = useThemeColor({}, 'background')
	// const textColor = useThemeColor({}, 'text')
	// const iconColor = Colors[theme].colors.colorIconInput
	// const checkmarkColor = Colors[theme].colors.primary // Or choose another distinct color

	// Use colors directly from the theme context
	const backgroundColor = themeColors.colors.background
	const textColor = themeColors.colors.text
	// const iconColor = themeColors.colors.colorIconInput // Keep if needed elsewhere, but header uses fixed white
	const checkmarkColor = themeColors.colors.primary

	const handleSelectTheme = async (option: ThemeOption) => {
		// setSelectedTheme(option)
		// try {
		// 	await AsyncStorage.setItem('theme', option)
		// 	// TODO: Update global theme context here after persisting
		// 	// This might involve calling a function from your theme context
		// 	// e.g., updateTheme(option)
		// } catch (error) {
		// 	console.error('Failed to save theme to storage', error)
		// }
		await setThemePreference(option) // Use the context function to update and persist
	}

	const renderThemeOption = (option: ThemeOption, label: string) => {
		// const isSelected = selectedTheme === option
		const isSelected = themePreference === option // Check against themePreference from context
		return (
			<TouchableOpacity
				style={styles.optionButton}
				onPress={() => handleSelectTheme(option)}
				activeOpacity={0.7}
			>
				<Text style={[styles.optionText, { color: textColor }]}>{label}</Text>
				{isSelected && (
					<Ionicons name="checkmark-circle" size={24} color={checkmarkColor} />
				)}
			</TouchableOpacity>
		)
	}

	// Define options inside the component
	const screenOptions = {
		headerTitle: 'Aparência',
		headerShown: true,
		headerTitleStyle: {
			fontFamily: fontFamily.poppins.medium, // Access font here
			fontSize: FontSize.sm,
			color: 'white',
		},
		headerStyle: {
			backgroundColor: Colors.primary,
		},
		headerTintColor: 'white',
		headerLeft: () => (
			<TouchableOpacity onPress={() => router.back()}>
				<Ionicons
					name="arrow-back"
					size={24}
					color="white"
					style={{ marginLeft: 10 }}
				/>
			</TouchableOpacity>
		),
	}

	return (
		<>
			<Stack.Screen options={screenOptions} />
			<View style={[styles.container, { backgroundColor }]}>
				<View style={styles.optionsContainer}>
					{renderThemeOption('light', 'Claro')}
					{renderThemeOption('dark', 'Escuro')}
					{renderThemeOption('system', 'Padrão do Sistema')}
				</View>
				<Text style={[styles.infoText, { color: textColor }]}>
					A opção "Padrão do Sistema" usará o tema claro ou escuro definido nas
					configurações do seu dispositivo.
				</Text>
			</View>
		</>
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: 20, 
	},
	optionsContainer: {
		marginTop: 20,
		marginHorizontal: 16,
		borderRadius: 10,
		overflow: 'hidden',
	},
	optionButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 18,
		paddingHorizontal: 16,
		borderBottomWidth: 1,
		borderBottomColor: 'rgba(147, 137, 137, 0.15)', // Separator color
		// backgroundColor: useThemeColor({}, 'card'), // Use card background if available
	},
	optionText: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.regular,
	},
	infoText: {
		marginTop: 15,
		marginHorizontal: 20,
		fontSize: FontSize.xs,
		fontFamily: fontFamily.poppins.regular,
		color: '#444', // Adjust color based on theme
		textAlign: 'center',
	},
})
