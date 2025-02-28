import React from 'react'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { Link, Tabs } from 'expo-router'
import { Pressable } from 'react-native'
import Colors from '@/src/constants/Colors'
import { useColorScheme } from '@/src/components/useColorScheme'
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue'
import { HomeSVG } from '@/src/components/svg/HomeSvg'
import { SVGProps } from '@/src/types/SVGProps'
import { CategoriaSVG } from '@/src/components/svg/CategoriaSvg'
import { UserSVG } from '@/src/components/svg/UserSvg'
import { MyServicesSVG } from '@/src/components/svg/MyServices'


function IconRenderer(props:{
	color: string,
	width: number,
	height: number,
	focused: boolean,
	ActiveIcon: React.FC<SVGProps>
}){
	const { ActiveIcon} = props
	return <ActiveIcon {...props} />
}

export default function TabLayout() {
	const colorScheme = useColorScheme()

	return (
		<Tabs
			screenOptions={{
				tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
				headerShown: useClientOnlyValue(false, true),
			}}
		>
			<Tabs.Screen
				name="(home)"
				options={{
					title: 'Início',

					tabBarIcon: ({ color, focused }) => (
						<IconRenderer
							color={color}
							focused={focused}
							ActiveIcon={HomeSVG}
							height={24}
							width={24}
						/>
					),

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
				name="(categories)"
				options={{
					title: 'Categorias',
					tabBarIcon: ({ color, focused }) => (
						<IconRenderer
							color={color}
							focused={focused}
							ActiveIcon={CategoriaSVG}
							height={24}
							width={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(services)"
				options={{
					title: 'Meus Serviços',
					tabBarIcon: ({ color, focused }) => (
						<IconRenderer
							color={color}
							focused={focused}
							ActiveIcon={MyServicesSVG}
							height={24}
							width={24}
						/>
					),
				}}
			/>
			<Tabs.Screen
				name="(user)"
				options={{
					title: 'Usuário',
					tabBarIcon: ({ color, focused }) => (
						<IconRenderer
							color={color}
							focused={focused}
							ActiveIcon={UserSVG}
							height={24}
							width={24}
						/>
					),
				}}
			/>
		</Tabs>
	)
}
