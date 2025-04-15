import {
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
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
				style={styles.scrollView}
				showsVerticalScrollIndicator={false}
				contentInsetAdjustmentBehavior="automatic"
			>
				<View style={styles.container}>
					<View style={styles.headerContainer}>
						<View>
							<View style={styles.imageContainer}>
								<Image
									style={styles.profileImage}
									source={{ uri: user?.imageUrl }}
								/>
								<View style={styles.editImageButton}>
									<Ionicons name="ribbon-outline" size={18} color="white" />
								</View>
							</View>
							<Text
								style={[
									styles.userName,
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
							<Text style={styles.userName}>{user?.lastName}</Text>
						</View>
						<View style={styles.actionsContainer}>
							<View style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}>
								<View style={styles.actionsContainerButtons}>
									<View style={styles.actionsButton}>
										<Ionicons
											name="wallet-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color="rgba(43, 39, 39, 0.85)"
										/>
										<Text style={styles.actionsButtonText}>1</Text>
									</View>
									<View style={styles.actionsButton}>
										<Ionicons
											name="chatbubbles-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color="rgba(43, 39, 39, 0.85)"
										/>
										<Text style={styles.actionsButtonText}>12</Text>
									</View>
									<View style={styles.actionsButton}>
										<Ionicons
											name="heart-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color="rgba(43, 39, 39, 0.85)"
										/>
										<Text style={styles.actionsButtonText}>12</Text>
									</View>

									<View style={styles.actionsButton}>
										<Ionicons
											name="star-outline"
											size={26}
											style={{
												backgroundColor: 'rgba(43, 39, 39, 0.05)',
												borderRadius: 12,
												padding: 6,
											}}
											color="rgba(43, 39, 39, 0.85)"
										/>
										<Text style={styles.actionsButtonText}>4.5</Text>
									</View>
								</View>
								<View style={styles.actionsTextContainer}>
									<View style={styles.verifyContainer}>
										<Ionicons
											name="ribbon-outline"
											size={18}
											color="rgba(43, 39, 39, 0.85)"
										/>
										<Text style={styles.actionsText}>Perfil verificado</Text>
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
									style={{ backgroundColor: 'rgba(43, 39, 39, 0.02)' }}
								/>
							</View>
						)}
					/>

					<View
						style={styles.separator}
						lightColor="#eee"
						darkColor="rgba(255,255,255,0.1)"
					/>

					<View style={styles.menuContainer}>
						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => router.push('/(user)/edit-profile')}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="person-outline" size={24} />
								<Text style={styles.menuText}>Editar Perfil</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							style={styles.menuItem}
							onPress={() => router.push('/(user)/edit-profile')}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="location-outline" size={24} />
								<Text style={styles.menuText}>Adicionar Endereços</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="notifications-outline" size={24} />
								<Text style={styles.menuText}>Notificações</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="shield-checkmark-outline" size={24} />
								<Text style={styles.menuText}>Segurança e Privacidade</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity style={styles.menuItem}>
							<View style={styles.menuLeftContent}>
								<Ionicons name="wallet-outline" size={24} />
								<Text style={styles.menuText}>Pagamentos</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/(user)/privacity')}
							style={styles.menuItem}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="lock-closed-outline" size={24} />
								<Text style={styles.menuText}>Política de Privacidade</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>

						<TouchableOpacity
							onPress={() => router.push('/(user)/terms')}
							style={styles.menuItem}
						>
							<View style={styles.menuLeftContent}>
								<Ionicons name="document-text-outline" size={24} />
								<Text style={styles.menuText}>Termos de Uso</Text>
							</View>
							<Ionicons name="chevron-forward-outline" size={24} color="#ccc" />
						</TouchableOpacity>
					</View>
				</View>
			</ScrollView>
		</>
	)
}

const styles = StyleSheet.create({
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
		backgroundColor: 'rgba(43, 39, 39, 0.1)',
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
		borderWidth: 5,
		borderColor: '#007AFF',
		padding: 4,
	},
	editImageButton: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		backgroundColor: '#007AFF',
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
		borderBottomColor: '#eee',
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
	},
	logoutText: {
		color: Colors.secondary,
		fontFamily: fontFamily.poppins.medium,
	},
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(0, 0, 0, 0.6)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		backgroundColor: 'white',
		borderRadius: 25,
		padding: 25,
		width: '85%',
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
	},
	modalIconContainer: {
		width: 70,
		height: 70,
		backgroundColor: Colors.primary + '15',
		borderRadius: 40,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 20,
	},
	modalTitle: {
		fontSize: FontSize.base,
		fontFamily: fontFamily.poppins.bold,
		marginBottom: 15,
		color: Colors.primary,
	},
	modalText: {
		fontSize: FontSize.sm,
		fontFamily: fontFamily.poppins.regular,
		marginBottom: 25,
		textAlign: 'center',
		color: '#666',
		paddingHorizontal: 10,
	},
	modalButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		gap: 15,
	},
	modalButton: {
		flex: 1,
		paddingVertical: 10,
		borderRadius: 14.67,
		elevation: 2,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.2,
		shadowRadius: 0.41,
	},
	cancelButton: {
		backgroundColor: '#f5f5f5',
		borderWidth: 1,
		borderColor: '#e5e5e5',
	},
	confirmButton: {
		backgroundColor: Colors.secondary,
	},
	modalButtonText: {
		fontSize: FontSize.xsB,
		fontFamily: fontFamily.poppins.medium,
		textAlign: 'center',
	},
	cancelButtonText: {
		color: '#666',
	},
	confirmButtonText: {
		color: 'white',
	},
})
