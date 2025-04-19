import { StyleSheet, ScrollView, TouchableOpacity } from 'react-native'
import * as Linking from 'expo-linking'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useClerk } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import ModalMessage from '@/src/components/ui/ModalMessage'
import Constants from 'expo-constants'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'

export default function SettingsScreen() {
	const { signOut } = useClerk()
	const [showLogoutModal, setShowLogoutModal] = useState(false)
	const router = useRouter()
	const { theme } = useCustomTheme()
	const styles = makeStyles(theme as Theme)
	const handleSignOut = async () => {
		try {
			await signOut()
			Linking.openURL(Linking.createURL('/'))
		} catch (err) {
			console.error(JSON.stringify(err, null, 2))
		}
	}

	return (
		<>
			<ScrollView
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
			>
				<View style={styles.container}>
					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>

					<View style={styles.menuContainer}>
						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => router.push('/(main)/(settings)/appearance')}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="sunny-outline"
									size={24}
									color={theme.colors.colorIconInput}
								/>
								<Text style={styles.menuText}>Aparência</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={'#ccc'}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="help-circle-outline"
									size={24}
									color={theme.colors.colorIconInput}
								/>
								<Text style={styles.menuText}>Ajuda</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={'#ccc'}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="share-social-outline"
									size={24}
									color={theme.colors.colorIconInput}
								/>
								<Text style={styles.menuText}>Compartilhar</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="star-outline"
									size={24}
									color={theme.colors.colorIconInput}
								/>
								<Text style={styles.menuText}>Avalie o App</Text>
							</View>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => setShowLogoutModal(true)}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons
									name="log-out-outline"
									size={24}
									color={theme.colors.primary}
								/>
								<Text style={[styles.menuText, styles.logoutText]}>Sair</Text>
							</View>
						</TouchableOpacity>
					</View>
				</View>
				<View style={styles.footerContainer}>
					<Text style={styles.footerText}>Versão</Text>
					<Text style={styles.footerNumber}>
						V{Constants.expoConfig?.version} T0.1
						{/* V1.4.T01 */}
					</Text>
				</View>
			</ScrollView>

			<ModalMessage
				setShowLogoutModal={setShowLogoutModal}
				showLogoutModal={showLogoutModal}
				modalIcon="log-out-outline"
				modalTitle="Sair do App"
				textButton="Sim"
				modalText="Tem certeza que deseja sair do app?"
				cancelButton={true}
				handleOk={handleSignOut}
			/>
		</>
	)
}

const makeStyles = (theme: Theme) =>
	StyleSheet.create({
		scrollView: {
			flex: 1,
			height: '100%',
		},
		container: {
			flex: 1,
			padding: 16,
		},

		footerContainer: {
			position: 'fixed',
			bottom: 0,
		},
		footerText: {
			textAlign: 'center',
			fontSize: FontSize.xss,
			fontFamily: fontFamily.poppins.semibold,
			color: '#666',
		},
		footerNumber: {
			textAlign: 'center',
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
			color: '#666',
		},
		separator: {
			marginTop: 10,
			height: 1,
			width: '100%',
		},
		menuContainer: {
			marginTop: 10,
		},
		menuItem: {
			flexDirection: 'row',
			alignItems: 'center',
			paddingVertical: 15,
			borderBottomWidth: 1,
			borderBottomColor: 'rgba(147, 137, 137, 0.28)',
			justifyContent: 'space-between',
		},
		menuLeftContent: {
			flexDirection: 'row',
			alignItems: 'center',
		},
		menuText: {
			fontSize: 16,
			marginLeft: 15,
			fontFamily: fontFamily.poppins.regular,
			color: theme.colors.text,
		},
		logoutText: {
			fontFamily: fontFamily.poppins.medium,
			color: Colors.dark.colors.primary,
		},
	})
