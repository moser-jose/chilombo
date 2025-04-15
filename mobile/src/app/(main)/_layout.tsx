/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Redirect, Tabs } from 'expo-router'

import Colors from '@/src/constants/Colors'
import { useColorScheme } from '@/src/components/useColorScheme'
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue'
import { HomeSVG } from '@/src/components/svg/HomeSvg'
import { SVGProps } from '@/src/types/SVGProps'
import { CategorySVG } from '@/src/components/svg/CategorySVG'
import { MyServicesSVG } from '@/src/components/svg/MyServices'
import { fontFamily } from '@/src/constants/FontFamily'
import { useUser } from '@clerk/clerk-expo'
import { SettingsSVG } from '@/src/components/svg/SettingsSvg'

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
				name="settings"
				options={{
					title: 'Configurações',
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={24}
							width={24}
							Component={SettingsSVG}
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
