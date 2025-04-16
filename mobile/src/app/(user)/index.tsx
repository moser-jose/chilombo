import {
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
	useColorScheme,
} from 'react-native'
import * as Linking from 'expo-linking'
import { Text, View } from '@/src/components/Themed'
import { Ionicons } from '@expo/vector-icons'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack, useRouter } from 'expo-router'
import Colors from '@/src/constants/Colors'
import { useState } from 'react'
import CompletedServiceCard from '@/src/components/front/CompletedServiceCard'
import { Separador } from '@/src/components/front/Separador'

const completedServices = [
	{
		id: 1,
		title: 'Limpeza Residencial',
		image:
			'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1470&auto=format&fit=crop',
		stars: 4.8,
		likes: 126,
		address: 'Rua Bié, Huambo, HBO',
		description: 'Limpeza completa de residência com 3 quartos e 2 banheiros.',
	},
	{
		id: 2,
		title: 'Limpeza de Tapetes',
		image:
			'https://images.unsplash.com/photo-1603848198135-5ace8c4a91c3?q=80&w=1374&auto=format&fit=crop',
		stars: 4.7,
		likes: 98,
		address: 'Cidade Alta, Huambo, HBO',
		description:
			'Limpeza profunda e higienização de tapetes de sala e quartos.',
	},
	{
		id: 3,
		title: 'Limpeza Empresarial',
		image:
			'https://images.unsplash.com/photo-1600585152220-90363fe7e115?q=80&w=1470&auto=format&fit=crop',
		stars: 4.9,
		likes: 215,
		address: 'Rua dos Ministros, Huambo, HBO',
		description: 'Serviço completo de limpeza para escritório com 10 salas.',
	},
	{
		id: 4,
		title: 'Limpeza de Sofás',
		image:
			'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=1470&auto=format&fit=crop',
		stars: 4.6,
		likes: 87,
		address: 'Lossambo, Huambo, HBO',
		description:
			'Higienização e limpeza profunda de sofá de 4 lugares e 2 poltronas.',
	},
]

export default function UserScreen() {
	const { user } = useUser()
	const { signOut } = useClerk()
	const [showLogoutModal, setShowLogoutModal] = useState(false)
	const router = useRouter()

	const theme = useColorScheme() ?? 'light'

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
			<Stack.Screen
				options={{
					headerTitle: 'Perfil',

					headerTitleStyle: {
						fontFamily: fontFamily.poppins.medium,
						fontSize: FontSize.sm,
						color: 'white',
					},
					headerStyle: {
						backgroundColor: Colors.primary,
					},
					headerTintColor: 'white',
					headerLeft: () => (
						<TouchableOpacity onPress={() => router.back()}>
							<Ionicons name="arrow-back" size={24} color="white" />
						</TouchableOpacity>
					),
				}}
			/>
			<ScrollView
				style={styles(theme).scrollView}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
			>
				<View style={styles(theme).container}>
					<View style={styles(theme).headerContainer}>
						<View>
							<View style={styles(theme).imageContainer}>
								<Image
									style={styles(theme).profileImage}
									source={{ uri: user?.imageUrl }}
								/>
								<View style={styles(theme).editImageButton}>
									<Ionicons name="ribbon-outline" size={18} color="white" />
								</View>
							</View>
							<Text
								style={[
									styles(theme).userName,
									{
										color: '#666',
										marginBottom: -10,
										fontFamily: fontFamily.poppins.regular,
										fontSize: FontSize.xl,
									},
								]}
							>
								{user?.firstName}
							</Text>
							<Text style={styles(theme).userName}>{user?.lastName}</Text>
						</View>
						<View style={styles(theme).actionsContainer}>
							<View
								style={{
									justifyContent: 'center',
									alignItems: 'center',
									width: '100%',
								}}
							>
								<View style={styles(theme).actionsContainerButtons}>
									<View style={styles(theme).actionsButton}>
										<Ionicons
											name="wallet-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color={Colors[theme].colors.colorIconInput}
										/>
										<Text style={styles(theme).actionsButtonText}>1</Text>
									</View>
									<View style={styles(theme).actionsButton}>
										<Ionicons
											name="chatbubbles-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color={Colors[theme].colors.colorIconInput}
										/>
										<Text style={styles(theme).actionsButtonText}>12</Text>
									</View>
									<View style={styles(theme).actionsButton}>
										<Ionicons
											name="heart-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color={Colors[theme].colors.colorIconInput}
										/>
										<Text style={styles(theme).actionsButtonText}>12</Text>
									</View>

									<View style={styles(theme).actionsButton}>
										<Ionicons
											name="star-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color={Colors[theme].colors.colorIconInput}
										/>
										<Text style={styles.actionsButtonText}>4.5</Text>
									</View>
								</View>
								<View style={styles(theme).actionsTextContainer}>
									<View style={styles(theme).verifyContainer}>
										<Ionicons
											name="ribbon-outline"
											size={18}
											color={Colors[theme].colors.colorIconInput}
										/>
										<Text style={styles(theme).actionsText}>
											Perfil verificado
										</Text>
									</View>
								</View>
							</View>
						</View>
					</View>
					<Separador text="Meus Serviços" more />
					<FlatList
						horizontal
						showsHorizontalScrollIndicator={false}
						data={completedServices}
						keyExtractor={item => item.id.toString()}
						renderItem={({ index, item }) => (
							<View
								style={{
									marginLeft: index === 0 ? 16 : 16,
									marginRight: index === completedServices.length - 1 ? 16 : 0,
									flex: 1,
								}}
							>
								<CompletedServiceCard
									data={item}
									/* style={{ backgroundColor: 'rgba(43, 39, 39, 0.02)' }} */
								/>
							</View>
						)}
					/>

					<View
						style={styles(theme).separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>

					<View style={styles(theme).menuContainer}>
						<TouchableOpacity
							style={styles(theme).menuItem}
							onPress={() => router.push('/(user)/edit-profile')}
						>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="person-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>Editar Perfil</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							style={styles(theme).menuItem}
							onPress={() => router.push('/(user)/edit-profile')}
						>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="location-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>Adicionar Endereços</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles(theme).menuItem}>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="notifications-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>Notificações</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles(theme).menuItem}>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="shield-checkmark-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>
									Segurança e Privacidade
								</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity style={styles(theme).menuItem}>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="wallet-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>Pagamentos</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/(user)/privacity')}
							style={styles(theme).menuItem}
						>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons name="lock-closed-outline" size={24} color={Colors[theme].colors.colorIconInput} />
								<Text style={styles(theme).menuText}>
									Política de Privacidade
								</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/(user)/terms')}
							style={styles(theme).menuItem}
						>
							<View style={styles(theme).menuLeftContent}>
								<Ionicons
									name="document-text-outline"
									size={24}
									color={Colors[theme].colors.colorIconInput}
								/>
								<Text style={styles(theme).menuText}>Termos de Uso</Text>
							</View>
							<Ionicons
								name="chevron-forward-outline"
								size={24}
								color={Colors[theme].colors.colorIconInput}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

const styles = (theme: 'light' | 'dark') =>
	StyleSheet.create({
		scrollView: {
			flex: 1,
		},
		container: {
			flex: 1,
		},
		headerContainer: {
			flexDirection: 'row',
			//alignItems: 'center',
			justifyContent: 'space-between',
			paddingVertical: 20,
			paddingHorizontal: 16,
		},
		actionsContainer: {
			alignItems: 'center',
			justifyContent: 'center',
			flex: 1,
		},

		actionsTextContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			marginTop: 20,
		},
		verifyContainer: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 10,
			backgroundColor: Colors[theme].colors.ImputBackgroundColors,
			borderRadius: 5,
			paddingHorizontal: 10,
			paddingVertical: 4,
		},
		actionsText: {
			fontSize: FontSize.xsB,
			fontFamily: fontFamily.poppins.regular,
		},
		actionsContainerButtons: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 20,
		},
		actionsButtonText: {
			fontSize: FontSize.sm,
			fontFamily: fontFamily.poppins.regular,
		},
		actionsButton: {
			alignItems: 'center',
		},
		imageContainer: {
			position: 'relative',
			marginBottom: 0,
			flex: 1,
			justifyContent: 'center',
			//alignItems: 'center',
		},
		profileImage: {
			width: 80,
			height: 80,
			borderRadius: 60,
			borderWidth: 3,
			borderColor: Colors[theme].colors.primary,
			padding: 2,
		},
		editImageButton: {
			position: 'absolute',
			right: 6,
			bottom: 10,
			backgroundColor: Colors[theme].colors.primary,
			width: 32,
			height: 32,
			borderRadius: 18,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 3,
			borderColor: 'white',
		},
		userName: {
			fontSize: FontSize.base,
			fontFamily: fontFamily.poppins.bold,
		},
		userEmail: {
			fontSize: FontSize.xsB,
			color: '#666',
			fontFamily: fontFamily.poppins.regular,
		},
		separator: {
			marginTop: 10,
			height: 1,
			width: '100%',
		},
		menuContainer: {
			marginTop: 10,
			paddingHorizontal: 16,
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
			fontSize: FontSize.sm,
			marginLeft: 15,
			fontFamily: fontFamily.poppins.regular,
		},
	})
