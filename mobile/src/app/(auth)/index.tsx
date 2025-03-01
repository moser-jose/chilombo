import { Image,TextInput, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, useWindowDimensions, Pressable, useColorScheme } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text,TouchableOpacity, View } from '@/src/components/Themed';
import { FontSize } from '@/src/constants/FontSize';
import { GoogleSVG } from '@/src/components/svg/GoogleSvg';
import { FacebookSVG } from '@/src/components/svg/FacebookSVG';
import empresa from '@/assets/images/empresa.jpg'
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Colors from '@/src/constants/Colors';
import { checkPasswordStrength, getPasswordRequirements, isStrongPassword } from '../../util/strenghPasswordForce';

import {LinearGradient}  from 'react-native-linear-gradient';
import { fontFamily } from '@/src/constants/FontFamily';

const logoApp = Image.resolveAssetSource(empresa).uri


export default function SignIn() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()
    const theme = useColorScheme();
    const isDark = theme === "dark";
    const { width, height } = useWindowDimensions();
    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [isSignIn, setIsSignIn] = useState(false)
    const strength = checkPasswordStrength(password);
    const requirements = getPasswordRequirements(password);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);
    const [isEmailFocused, setIsEmailFocused] = useState(false);
    const [isPasswordFocused, setIsPasswordFocused] = useState(false);

    const translateY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        const keyboardWillShow = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
            (e) => {
                Animated.timing(translateY, {
                    toValue: Platform.OS === 'ios' ? -e.endCoordinates.height / 3 : -height * 0.15,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            }
        );

        const keyboardWillHide = Keyboard.addListener(
            Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
            () => {
                Animated.timing(translateY, {
                    toValue: 0,
                    duration: 250,
                    useNativeDriver: true,
                }).start();
            }
        );

        return () => {
            keyboardWillShow.remove();
            keyboardWillHide.remove();
        };
    }, [height]);

    useEffect(() => {
        setIsPasswordStrong(isStrongPassword(password));
    }, [password]);

    const logoSize = {
        width: width * 0.6,
        height: (width * 0.6) * 0.478,
        maxWidth: 230,
        maxHeight: 110
    };

    const renderPasswordIcon = () => (
        <View style={{ backgroundColor:'transparent', flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4}}>
            {password.length > 0 ? (
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color={styles(isDark).colorIconInput.color}
              />
            ) : null}
        </View>
    );

  return (
    
    <TouchableWithoutFeedback  onPress={Keyboard.dismiss}>
      {/* <LinearGradient
        colors={isDark ? 
            ['#1a1b1e', '#252729'] : 
            ['#ffffff', '#f5f5f5']}
        style={{ flex: 1 }}
    > */}
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={[styles(isDark).container,{ height: height, flex: 1, backgroundColor: isDark ? Colors.dark.background : Colors.light.background}]}
      >
        <Animated.View 
            style={[
              styles(isDark).container,  {
                    transform: [{ translateY }],
                    paddingVertical: height * 0.05,
                },
            ]}
        >
            <Image
                source={{
                    uri: logoApp,
                }}
                resizeMode="contain"
                style={{
                    width: logoSize.width,
                    height: logoSize.height,
                    marginBottom: height * 0.02,
                    maxWidth: logoSize.maxWidth,
                    maxHeight: logoSize.maxHeight
                }}
            />

            <View style={[styles(isDark).contentContainer, { maxWidth: 500 }]}>
                <Text style={[styles(isDark).headerText, { fontSize: width * 0.04 }]}>
                    Faça o login com o seu e-mail e senha
                </Text>

                {/* <TouchableOpacity style={styles(isDark).button}>
                    <GoogleSVG/>
                    <Text style={styles(isDark).buttonText}>Login com o Google</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles(isDark).button}>
                    <FacebookSVG/>
                    <Text style={styles(isDark).buttonText}>Login com o Facebook</Text>
                </TouchableOpacity> */}

                
                <View style={[
                    styles(isDark).input,
                    isEmailFocused && { borderColor: isDark ? Colors.dark.secondary : Colors.light.primary, borderWidth: 1.8 }
                ]}>
                  <Ionicons 
                    name="mail-outline" 
                    size={22} 
                    color={styles(isDark).colorIconInput.color}
                  />
                    <TextInput
                        placeholder='Insira o e-mail ou o telefone'
                        placeholderTextColor={styles(isDark).colorIconInput.color}
                        keyboardType='email-address'
                        numberOfLines={1}
                        style={[styles(isDark).textInput,{flex:1, fontWeight:'300'}]}
                        onFocus={() => setIsEmailFocused(true)}
                        onBlur={() => setIsEmailFocused(false)}
                    />
                </View>

                <View style={[
                    styles(isDark).input,
                    isPasswordFocused && { borderColor: isDark ? Colors.dark.secondary : Colors.light.primary, borderWidth: 1.8 }
                ]}>
                  <Ionicons 
                    name="key" 
                    size={22} 
                    color={styles(isDark).colorIconInput.color}
                  />
                    <TextInput
                        placeholder='Insira a senha'
                        placeholderTextColor={styles(isDark).colorIconInput.color}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        numberOfLines={1}
                        style={[styles(isDark).textInput,{flex:1}]}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        {renderPasswordIcon()}
                    </Pressable>
                </View>

                <Pressable style={{width: '100%', alignItems: 'flex-end'}}>
                    
                    <Link href={'/sign-up'}>
                        <Text style={{
                            color: isDark ? Colors.dark.secondary : Colors.light.primary,
                            fontWeight: '500',
                            fontSize: width * 0.035
                        }}>
                            Esqueceu sua senha?
                            </Text>
                    </Link>
                </Pressable>

                <Pressable 
                    style={[
                        styles(isDark).button,
                        {
                            marginTop:30,
                            backgroundColor: (isPasswordStrong && !isDark) 
                            ? Colors.light.primary : (!isPasswordStrong && !isDark)
                            ? Colors.light.primaryMuted : (isPasswordStrong && isDark)
                            ? Colors.dark.secondary : Colors.dark.textMuted,
                            //borderWidth:0
                        }
                    ]}
                    //disabled={!isPasswordStrong}
                >
                    <Text style={[styles(isDark).buttonText, 
                      {color:(isPasswordStrong && !isDark) 
                        ? Colors.light.background : (!isPasswordStrong && !isDark)
                        ? Colors.light.primaryMuted : (isPasswordStrong && isDark)
                        ? Colors.dark.text : Colors.dark.textMuted}]}>
                      Entrar</Text>
                </Pressable>


                <View style={styles(isDark).divider}>
                    <View style={styles(isDark).dividerLine} />
                    <Text style={styles(isDark).dividerText}>
                        ou continue com as suas redes sociais
                    </Text>
                    <View style={styles(isDark).dividerLine} />
                </View>

                    <View style={{marginVertical:20, flexDirection:'row', alignItems:'center', justifyContent:'center', gap:30}}>
                      <TouchableOpacity style={{backgroundColor:isDark ? Colors.dark.textMuted : Colors.light.secondaryMuted, padding:10, borderRadius:50}}><FacebookSVG height={30} width={30}/></TouchableOpacity>
                      <TouchableOpacity style={{backgroundColor:isDark ? Colors.dark.textMuted : Colors.light.secondaryMuted, padding:10, borderRadius:50}}><GoogleSVG height={30} width={30}/></TouchableOpacity>
                    </View>


                <Text style={styles(isDark).textEnd}>
                    Ainda não possui uma conta?{' '}
                    <Link
                        href={'/sign-up'}
                        style={{
                            textDecorationLine: 'underline',
                            color: isDark ? Colors.dark.secondary : Colors.light.primary,
                            fontWeight: '400'
                        }}
                    >
                        crie agora mesmo
                    </Link>
                </Text>
            </View>
        </Animated.View>

      </KeyboardAvoidingView>
      {/* </LinearGradient> */}
    </TouchableWithoutFeedback>
  );
}
const styles = (isDark:boolean)=> StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headerText: {
    fontWeight: '300',
    marginBottom: '4%',
    maxWidth: 300,
    textAlign: 'center',
    fontFamily: fontFamily.poppins.regular
  },
  textInput:{
    padding: '.7%',
    fontSize:16,
    marginLeft:6,
    fontFamily: fontFamily.poppins.regular,
    color: isDark ? Colors.dark.text : Colors.light.text,
  },
  input:{
    padding: '3.9%',
    borderRadius: 16,
    width: '100%',
    flexDirection: 'row',
    borderColor:isDark ? Colors.dark.borderInput : Colors.light.borderInput,
    alignItems:'center',
    borderWidth:1,
    marginBottom:20,
    backgroundColor: isDark ? Colors.dark.ImputBackgroundColors : Colors.light.ImputBackgroundColors,
  },
  button:{
    padding: '3.8%',
    borderRadius: 16,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginBottom:14
  },
  buttonText:{
    fontSize: FontSize.base,
    fontFamily: fontFamily.poppins.regular,
    letterSpacing: 0.5
  },
  title: {
    fontSize: 20,
    fontFamily: fontFamily.poppins.regular
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center',
    marginVertical: '4%',
    width: '100%',
  },
  dividerLine: {
    width: '6%',
    height: 1,
    backgroundColor: isDark ? Colors.dark.borderInput : Colors.light.borderInput,
  },
  dividerText: {
    color: isDark ? Colors.dark.text : Colors.light.text,
    fontWeight: '300',
    paddingHorizontal: '1.5%',
    fontFamily: fontFamily.poppins.regular
  },
  textEnd: {
      color: isDark ? Colors.dark.text : Colors.light.text,
      fontWeight: '300',
      marginVertical: '4%',
      fontSize: 14
  },
  colorIconInput:{
    color: isDark ? Colors.dark.colorIconInput: Colors.light.colorIconInput.toString()
  }
});

