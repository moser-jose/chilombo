/* eslint-disable react-native/no-color-literals */
import CarouselCard from '@/src/components/front/Carroucel'
import Header from '@/src/components/front/Header'
import UserProfile from '@/src/components/front/EmployersCard'
import { useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, FlatList, ScrollView, StyleSheet } from 'react-native'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Ionicons } from '@expo/vector-icons'
import { Separador } from '@/src/components/front/Separador'
import ServicesCard from '@/src/components/front/ServicesCard'

const users = [
	{
		id: 1,
		firstname: 'Antônio',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/5.jpg',
		role: 'Vendedor',
	},
	{
		id: 2,
		firstname: 'Miguel',
		lastname: 'Silva',
		//image: '',
		role: 'Analista',
	},
	{
		id: 3,
		firstname: 'Marcos',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/10.jpg',
		role: 'Vendedor',
	},
	{
		id: 4,
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/15.jpg',
		role: 'RH',
	},
	{
		id: 5,
		firstname: 'Marta',
		lastname: 'Santos',
		image: 'https://randomuser.me/api/portraits/women/7.jpg',
		role: 'Operações',
	},
	{
		id: 6,
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/20.jpg',
		role: 'Fiscal',
	},
]

const services = [
	{
		id: 1,
		icon: 'logo-bitbucket',
		service: 'Empregadas Domésticas',
	},
	{
		id: 2,
		icon: 'logo-flickr',
		service: 'Limpeza de Jardim',
	},
	{
		id: 3,
		icon: 'logo-wordpress',
		service: 'Limpeza Residencial',
	},
	{
		id: 4,
		icon: 'logo-wordpress',
		service: 'Limpeza Empresarial',
	},
]

export default function HomeScreen() {
	const { user } = useUser()
	return (
		<ScrollView showsVerticalScrollIndicator={false}>
			<Stack.Screen options={{ header: () => <Header /> }} />
			<View style={{ marginTop: 10 }}>
				<CarouselCard />
			</View>

			<Separador text="Nossos Serviços" more />

			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id.toString()}
				data={services}
				style={{
					marginBottom: 20,
				}}
				renderItem={({ index, item }) => (
					<View
						style={{
							marginLeft: index === 0 ? 16 : 16,
							marginRight: index === services.length - 1 ? 16 : 0,
							flex: 1,
							flexDirection: 'row',
							gap: 10,
						}}
					>
						<ServicesCard icon={item.icon} service={item.service} />
					</View>
				)}
			/>

			<Separador text="Nossa equipe" more />

			<FlatList
				/* style={{
				marginLeft: index === 0 ? 16 : 16,
				marginRight: index === hymns.length - 1 ? 16 : 0,
			  }} */
				horizontal
				showsHorizontalScrollIndicator={false}
				keyExtractor={item => item.id.toString()}
				data={users}
				renderItem={({ index, item }) => (
					<View
						style={{
							marginLeft: index === 0 ? 16 : 16,
							marginRight: index === users.length - 1 ? 16 : 0,
							flex: 1,
							flexDirection: 'row',
							gap: 10,
						}}
					>
						<UserProfile
							name={`${item.firstname} ${item.lastname}`}
							imageUrl={item.image}
							role={item.role}
						/>
					</View>
				)}
			/>
		</ScrollView>
	)
}
