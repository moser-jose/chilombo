import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Stack, useRouter } from 'expo-router'
import { useTheme } from '@/src/hooks/useTheme'
import { Theme } from '@/src/types/theme'

type ThemeOption = 'light' | 'dark' | 'system'

export default function AppearanceScreen() {
	const router = useRouter()
	const { themePreference, setThemePreference, theme } = useTheme()
	const styles = makeStyles(theme as Theme)

	const handleSelectTheme = (option: ThemeOption) => {
		setThemePreference(option)
	}

	const renderThemeOption = (option: ThemeOption, label: string) => {
		const isSelected = themePreference === option
		return (
			<TouchableOpacity
				style={styles.optionButton}
				onPress={() => handleSelectTheme(option)}
				activeOpacity={0.7}
			>
				<Text style={styles.optionText}>{label}</Text>
				{isSelected && (
					<Ionicons
						name="checkmark-circle"
						size={24}
						color={theme.colors.primary}
					/>
				)}
			</TouchableOpacity>
		)
	}

	const screenOptions = {
		headerTitle: 'Aparência',
		headerShown: true,
		headerTitleStyle: {
			fontFamily: theme.fonts.medium.fontFamily,
			fontSize: theme.size.sm,
			color: theme.colors.textHeader,
		},
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
		headerTintColor: theme.colors.textHeader,
		headerLeft: () => (
			<TouchableOpacity onPress={() => router.back()}>
				<Ionicons
					name="chevron-back"
					size={22}
					color={theme.colors.textHeader}
					style={{ marginLeft: 10 }}
				/>
			</TouchableOpacity>
		),
	}

	return (
		<>
			<Stack.Screen options={screenOptions} />
			<View style={[styles.container]}>
				<View style={styles.optionsContainer}>
					{renderThemeOption('light', 'Claro')}
					{renderThemeOption('dark', 'Escuro')}
					{renderThemeOption('system', 'Padrão do Sistema')}
				</View>
				<Text style={styles.infoText}>
					A opção "Padrão do Sistema" usará o tema claro ou escuro definido nas
					configurações do seu dispositivo.
				</Text>
			</View>
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		container: {
			flex: 1,
			paddingTop: 20,
			backgroundColor: theme.colors.background,
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
			borderBottomColor: 'rgba(147, 137, 137, 0.15)',
		},
		optionText: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
		},
		infoText: {
			marginTop: 15,
			marginHorizontal: 20,
			fontSize: theme.size.xs,
			fontFamily: theme.fonts.regular.fontFamily,
			color: '#444',
			textAlign: 'center',
		},
	})
