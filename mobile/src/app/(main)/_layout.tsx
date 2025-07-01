/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Redirect, router, Stack, Tabs } from 'expo-router'

import { useClientOnlyValue } from '@/src/components/useClientOnlyValue'
import { HomeSVG } from '@/src/components/svg/HomeSvg'
import { SVGProps } from '@/src/types/SVGProps'
import { CategorySVG } from '@/src/components/svg/CategorySVG'
import { MyServicesSVG } from '@/src/components/svg/MyServices'
import { useUser } from '@clerk/clerk-expo'
import { SettingsSVG } from '@/src/components/svg/SettingsSvg'
import { useTheme } from '@/src/hooks/useTheme'
import { TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

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
	const { theme } = useTheme()
	const { user } = useUser()

	if (!user) {
		return <Redirect href="/(auth)" />
	}

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: theme.colors.tabBarActiveTintColor,
				tabBarStyle: {
					backgroundColor: theme.colors.tabBarBackgroundColor,
				},
				//headerShown: useClientOnlyValue(false, true),
				tabBarLabelStyle: {
					fontFamily: theme.fonts.medium.fontFamily,
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
							height={22}
							width={22}
							Component={HomeSVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(categories)"
				options={{
					title: 'Categorias',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={22}
							width={22}
							Component={CategorySVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(services)"
				options={{
					title: 'Meus Serviços',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={22}
							width={22}
							Component={MyServicesSVG}
							color={color}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(settings)"
				options={{
					title: 'Configurações',
					headerShown: false,
					tabBarIcon: ({ color }) => (
						<TabBarIcon
							height={22}
							width={22}
							Component={SettingsSVG}
							color={color}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
