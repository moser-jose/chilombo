import {
	StyleSheet,
	Image,
	ScrollView,
	TouchableOpacity,
	FlatList,
	View,
} from 'react-native'
import { Text } from '@/src/components/ui/Text'
import { Ionicons } from '@expo/vector-icons'
import { useClerk, useUser } from '@clerk/clerk-expo'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { useRouter } from 'expo-router'
import CompletedServiceCard from '@/src/components/front/CompletedServiceCard'
import { Separador } from '@/src/components/front/Separador'
import { useCustomTheme } from '@/src/context/ThemeContext'
import { Theme } from '@/src/types/theme'
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
	const router = useRouter()

	const { theme } = useCustomTheme()

	const userVerified =
		user?.phoneNumbers[0].verification?.status === 'verified' &&
		user?.emailAddresses[0].verification?.status === 'verified'

	const styles = useStyles(theme as Theme)
	return (
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
									color: theme.colors.text,
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
						<View
							style={{
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							<View style={styles.actionsContainerButtons}>
								<View style={styles.actionsButton}>
									<Ionicons
										name="wallet-outline"
										size={26}
										style={styles.icon}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.actionsButtonText}>1</Text>
								</View>
								<View style={styles.actionsButton}>
									<Ionicons
										name="chatbubbles-outline"
										size={26}
										style={styles.icon}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.actionsButtonText}>12</Text>
								</View>
								<View style={styles.actionsButton}>
									<Ionicons
										name="heart-outline"
										size={26}
										style={styles.icon}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.actionsButtonText}>12</Text>
								</View>

								<View style={styles.actionsButton}>
									<Ionicons
										name="star-outline"
										size={26}
										style={styles.icon}
										color={theme.colors.colorIconInput}
									/>
									<Text style={styles.actionsButtonText}>4.5</Text>
								</View>
							</View>
							<View style={styles.actionsTextContainer}>
								<View style={styles.verifyContainer}>
									<Ionicons
										name="ribbon-outline"
										size={18}
										color={theme.colors.primary}
									/>
									<Text style={styles.actionsText}>Perfil verificado</Text>
								</View>
							</View>
						</View>
					</View>
				</View>

				<View style={styles.verifyContent}>
					{userVerified ? (
						<Text style={styles.verifyTitle}>Você tem o perfil verificado</Text>
					) : (
						<Text style={styles.verifyTitle}>
							Você não tem o perfil totalmente verificado
						</Text>
					)}

					<View style={styles.verifyItemContainer}>
						<View style={styles.verifyItem}>
							<View style={styles.verifyItemContent}>
								<Ionicons
									name="checkmark-circle"
									size={18}
									color={theme.colors.primary}
								/>
								<Text style={styles.verifyItemText}>
									Documento de identidade
								</Text>
							</View>
						</View>
						<View style={styles.verifyItem}>
							<View style={styles.verifyItemContent}>
								{user?.emailAddresses[0].verification?.status === 'verified' ? (
									<Ionicons
										name="checkmark-circle"
										size={18}
										color={theme.colors.primary}
									/>
								) : (
									<Ionicons
										name="close-circle"
										size={18}
										color={theme.colors.colorIconInput}
									/>
								)}
								<Text style={styles.verifyItemText}>
									{user?.emailAddresses[0].emailAddress}
								</Text>
							</View>
						</View>
						<View style={styles.verifyItem}>
							<View style={styles.verifyItemContent}>
								{user?.phoneNumbers[0].verification?.status === 'verified' ? (
									<Ionicons
										name="checkmark-circle"
										size={18}
										color={theme.colors.primary}
									/>
								) : (
									<Ionicons
										name="close-circle"
										size={18}
										color={theme.colors.colorIconInput}
									/>
								)}
								<Text style={styles.verifyItemText}>
									{user?.phoneNumbers[0].phoneNumber}
								</Text>
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
							<CompletedServiceCard data={item} />
						</View>
					)}
				/>

				<View style={styles.separator} />

				<View style={styles.menuContainer}>
					<TouchableOpacity
						style={styles.menuItem}
						onPress={() => router.push('/(user)/edit-profile')}
					>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="person-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Editar Perfil</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="location-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Adicionar Endereços</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="notifications-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Notificações</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="shield-checkmark-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Segurança e Privacidade</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.menuItem}>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="wallet-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Pagamentos</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => router.push('/(user)/privacity')}
						style={styles.menuItem}
					>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="lock-closed-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Política de Privacidade</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						onPress={() => router.push('/(user)/terms')}
						style={styles.menuItem}
					>
						<View style={styles.menuLeftContent}>
							<Ionicons
								name="document-text-outline"
								size={24}
								color={theme.colors.colorIconInput}
							/>
							<Text style={styles.menuText}>Termos de Uso</Text>
						</View>
						<Ionicons
							name="chevron-forward-outline"
							size={24}
							color={theme.colors.colorIconInput}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</ScrollView>
	)
}

const useStyles = (theme: Theme) =>
	StyleSheet.create({
		scrollView: {
			flex: 1,
			backgroundColor: theme.colors.background,
		},
		verifyItemContainer: {
			paddingVertical: 16,
		},
		verifyContent: {
			paddingHorizontal: 16,
			//paddingVertical: 16,
		},
		verifyTitle: {
			fontSize: theme.size.sm,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
		},
		verifyItem: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			marginBottom: 18,
		},
		verifyItemContent: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'space-between',
			gap: 8,
		},
		verifyItemText: {
			fontSize: theme.size.xsB,
			fontFamily: theme.fonts.regular.fontFamily,
			color: theme.colors.text,
			letterSpacing: 0.3,
		},
		container: {
			flex: 1,
		},
		headerContainer: {
			flexDirection: 'row',
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
			backgroundColor: theme.colors.backgroundIcon,
			borderRadius: 5,
			paddingHorizontal: 10,
			paddingVertical: 4,
		},
		actionsText: {
			fontSize: FontSize.xs,
			fontFamily: fontFamily.poppins.regular,
		},
		actionsContainerButtons: {
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center',
			gap: 20,
		},
		actionsButtonText: {
			fontSize: FontSize.xsB,
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
			borderColor: theme.colors.primary,
			padding: 2,
		},
		editImageButton: {
			position: 'absolute',
			right: 6,
			bottom: 10,
			backgroundColor: theme.colors.primary,
			width: 32,
			height: 32,
			borderRadius: 18,
			justifyContent: 'center',
			alignItems: 'center',
			borderWidth: 3,
			borderColor: 'white',
		},
		userName: {
			fontSize: theme.size.base,
			fontFamily: theme.fonts.bold.fontFamily,
			color: theme.colors.primary,
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
			fontSize: theme.size.sm,
			marginLeft: 15,
			fontFamily: theme.fonts.regular.fontFamily,
		},
		icon: {
			backgroundColor: theme.colors.backgroundIcon,
			borderRadius: 12,
			padding: 6,
		},
	})
