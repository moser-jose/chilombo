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
  
  if(!isLoaded) return null

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>

          <Image
            source={{
              uri: logoApp,
            }}
            resizeMode="cover"
            style={{width:230,height:110, marginBottom:20}}/>
  <Text style={{color:'rgba(50, 52, 55, 0.79)',  fontWeight:'300', fontSize:16, marginBottom:14}}>Entre com a sua rede social</Text>

      <TouchableOpacity style={styles.button}>
        <GoogleSVG/>
        <Text style={styles.buttonText}>Login com a Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button}>
        <FacebookSVG/>
        <Text style={styles.buttonText}>Login com o Facebook</Text>
      </TouchableOpacity>

      <View style={{flexDirection:'row', alignItems:'center', marginBottom:14}}>
        <View style={{width:'6%', height:1, backgroundColor:'#ccc'}}></View>
          <Text style={{color:'rgba(50, 52, 55, 0.79)',fontWeight:'300', paddingHorizontal:10 }}>Ou continue com o seu e-mail e senha</Text>
        <View style={{width:'6%', height:1, backgroundColor:'#ccc'}}></View>
      </View>
      <View style={styles.input}>
          <TextInput
            placeholder='Insira o e-mail ou o telefone'
            numberOfLines={1}
            style={{flex:1,fontWeight:'300'}}
          />
      </View>

      <View style={styles.input}>
          <TextInput
            placeholder='Insira a senha'
            numberOfLines={1}
            style={{flex:1,fontWeight:'300'}}
          />
      </View>

      <TouchableOpacity style={[styles.button,{marginTop:30,backgroundColor:'rgba(6,23,74,.8)',borderWidth:0}]}>
        <Text style={[styles.buttonText, {color:'white'}]}>Entrar</Text>
      </TouchableOpacity>
      <Text style={{color:'#ccc', fontWeight:'300', marginBottom:14}}>Ainda não possui uma conta? <Text style={{textDecorationLine:'underline'}}>crie agora mesmo</Text></Text>

    </View>
    </TouchableWithoutFeedback>
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
