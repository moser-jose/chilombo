import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'

import Colors from '@/src/constants/Colors'
import { useColorScheme } from '@/src/components/useColorScheme'
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue'
import { HomeSVG } from '@/src/components/svg/HomeSvg'
import { SVGProps } from '@/src/types/SVGProps'
import { CategorySVG } from '@/src/components/svg/CategorySVG'
import { UserSVG } from '@/src/components/svg/UserSvg'
import { MyServicesSVG } from '@/src/components/svg/MyServices'

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
	color: string
	height?: number
	width?: number
	Component:React.FC<SVGProps>

}){
	const {Component, ...rest} = props
	return <Component {...rest} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: useClientOnlyValue(false, true),
				/* headerStyle: {
					backgroundColor: Colors[colorScheme ?? 'light'].background,
				},
				headerTitleStyle: {
					color: Colors[colorScheme ?? 'light'].text,
				}, */
				
			}}
		>
			<Tabs.Screen
				name="home"
				options={{
					title: 'Início',
					tabBarIcon: ({ color }) => <TabBarIcon height={24} width={24} Component={HomeSVG} color={color} />,
					headerRight: () => (
						<Link href="/modal" asChild>
							<Pressable>
								{({ pressed }) => (
									<FontAwesome
										name="info-circle"
										size={25}
										color={Colors[colorScheme ?? 'light'].text}
										style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
									/>
								)}
							</Pressable>
						</Link>
					),
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: 'Categorias',
					tabBarIcon: ({ color }) => <TabBarIcon height={24} width={24} Component={CategorySVG} color={color} />,
					
				}}
			/>
			<Tabs.Screen
				name="services"
				options={{
					title: 'Meus Serviços',
					tabBarIcon: ({ color }) => <TabBarIcon height={24} width={24} Component={MyServicesSVG} color={color} />,
					
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: 'Usuário',
					tabBarIcon: ({ color }) => <TabBarIcon height={24} width={24} Component={UserSVG} color={color} />,
					
				}}
			/>
		</Tabs>
	)
}
