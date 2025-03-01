import { Image, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';

import EditScreenInfo from '@/src/components/EditScreenInfo';
import { Text, TouchableOpacity, View } from '@/src/components/Themed';
import { FontSize } from '@/src/constants/FontSize';
import { GoogleSVG } from '@/src/components/svg/GoogleSvg';
import { FacebookSVG } from '@/src/components/svg/FacebookSVG';
import { Button } from '@/src/components/ui/Button';
import empresa from '@/assets/images/empresa.jpg'
import FastImage from 'react-native-fast-image'
import { useSignIn } from '@clerk/clerk-expo';

const logoApp = Image.resolveAssetSource(empresa).uri
export default function HomeScreen() {
  
  //if(!isLoaded) return null

  return (
    <View>
      <Text>Home</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    padding: 18,
    borderRadius: 14,
    width: '90%',
    flexDirection: 'row',
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:14
  },
  button:{
    //backgroundColor: 'red',
    padding: 16,
    borderRadius: 16,
    width: '90%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    borderColor:'#ccc',
    borderWidth:1,
    gap: 10,
    marginBottom:14
  },
  buttonText:{
    fontSize: FontSize.sm,
  },
  title: {
    fontSize: 20,

    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
