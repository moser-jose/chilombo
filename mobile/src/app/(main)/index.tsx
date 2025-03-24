import CarouselCard from '@/src/components/front/Carroucel'
import Header from '@/src/components/front/Header'
import UserProfile from '@/src/components/UserProfile'
import { useUser } from '@clerk/clerk-expo'
import { Stack } from 'expo-router'
import React from 'react'
import { View, Text, FlatList, ScrollView } from 'react-native'

const users = [
	{
		firstname: 'Antônio',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/5.jpg',
		role: 'Vendedor',
	},
	{
		firstname: 'Marcos',
		lastname: 'Silva',
		image: 'https://randomuser.me/api/portraits/men/10.jpg',
		role: 'Vendedor',
	},
	{
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/15.jpg',
		role: 'RH',
	},
	{
		firstname: 'Marta',
		lastname: 'Santos',
		image: 'https://randomuser.me/api/portraits/women/7.jpg',
		role: 'Operações',
	},
	{
		firstname: 'João',
		lastname: 'Oliveira',
		image: 'https://randomuser.me/api/portraits/men/20.jpg',
		role: 'Fiscal',
	},
]

export default function HomeScreen() {
	const { user } = useUser()
	return (
		<ScrollView>
			<Stack.Screen options={{ header: () => <Header /> }} />
			<View style={{ marginTop: 10 }}>
				<CarouselCard />
			</View>
			<FlatList
				horizontal
				showsHorizontalScrollIndicator={false}
				data={users}
				renderItem={({ item }) => (
					<View style={{ margin: 10, flex: 1, flexDirection: 'row', gap: 10 }}>
						<UserProfile name={`${item.firstname} ${item.lastname}`} imageUrl={item.image} role={item.role} />
					</View>
				)}
			/>
		</ScrollView>
	)
}
