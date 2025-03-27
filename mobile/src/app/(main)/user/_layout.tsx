import Colors from '@/src/constants/Colors'
import { fontFamily } from '@/src/constants/FontFamily'
import { FontSize } from '@/src/constants/FontSize'
import { Stack } from 'expo-router'
import { Text, TouchableOpacity, View } from 'react-native'

function UserScreenLayout() {
	return (
		<View style={{ flex: 1 }}>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerTitle: '',
						headerShown: true,
						headerLeft: () => (
							<TouchableOpacity>
								<Text
									style={{
										color: 'white',
										fontSize: FontSize.lg,
										fontFamily: fontFamily.poppins.bold,
										paddingLeft: 10,
									}}
								>
									Perfil
								</Text>
							</TouchableOpacity>
						),
						headerStyle: {
							backgroundColor: Colors.primary,
						},
					}}
				/>
			</Stack>
		</View>
	)
}

export default UserScreenLayout
