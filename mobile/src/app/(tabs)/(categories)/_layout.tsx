import { Stack } from 'expo-router'
import { View,Text, SafeAreaView } from 'react-native'


const HeaderComponent = () => {
    return (
      <SafeAreaView>
        <Text>OlÁ</Text>
      </SafeAreaView>
    )
  
}

const CategoriesScreenLayout = () => {
  return (
    <View>
      <Stack>
        <Stack.Screen
          name="index"
          /* options={{
            header: () => <HeaderComponent />,
          }} */
        />
      </Stack>
    </View>
  )
}

export default CategoriesScreenLayout
