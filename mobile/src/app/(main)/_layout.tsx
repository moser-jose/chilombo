/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Redirect, Tabs } from 'expo-router'
import { Image, Pressable } from 'react-native'

import Colors from '@/src/constants/Colors'
import { useColorScheme } from '@/src/components/useColorScheme'
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue'
import { HomeSVG } from '@/src/components/svg/HomeSvg'
import { SVGProps } from '@/src/types/SVGProps'
import { CategorySVG } from '@/src/components/svg/CategorySVG'
import { UserSVG } from '@/src/components/svg/UserSvg'
import { MyServicesSVG } from '@/src/components/svg/MyServices'
import { fontFamily } from '@/src/constants/FontFamily'
import { useUser } from '@clerk/clerk-expo'

function TabBarIcon(props: {
	color: string
	height?: number
	width?: number
	Component: React.FC<SVGProps>
}) {
	const { Component, ...rest } = props
	return <Component {...rest} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()
	const { user } = useUser()

	if (!user) {
		return <Redirect href="/(auth)" />
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: useClientOnlyValue(false, true),
				tabBarLabelStyle: {
					fontFamily: fontFamily.poppins.medium,
				},
			}}
		>
			<Tabs.Screen
				name="index"
				options={{
					title: 'Início',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={24}
							width={24}
							Component={HomeSVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="categories"
				options={{
					title: 'Categorias',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={24}
							width={24}
							Component={CategorySVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="services"
				options={{
					title: 'Meus Serviços',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={24}
							width={24}
							Component={MyServicesSVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="user"
				options={{
					title: 'Usuário',
					headerShown: false,
					tabBarIcon: ({ color }) =>
						user.imageUrl ? (
							<Image
								source={{ uri: user.imageUrl }}
								style={{
									height: 26,
									width: 26,
									borderRadius: 50,
									borderWidth: 1.5,
									borderColor: color,
								}}
								resizeMode="contain"
							/>
						) : (
							<TabBarIcon
								height={24}
								width={24}
								Component={UserSVG}
								color={color}
							/>
						),
				}}
			/>
		</Tabs>
	)
}

{
	/* <TabBarIcon
	height={24}
	width={24}
	Component={UserSVG}
	color={color}
/> */
}
