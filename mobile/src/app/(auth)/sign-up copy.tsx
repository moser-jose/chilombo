import { Image, StyleSheet, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, Platform, Animated, useWindowDimensions, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { Text, TouchableOpacity, View } from '@/src/components/Themed';
import { FontSize } from '@/src/constants/FontSize';
import { GoogleSVG } from '@/src/components/svg/GoogleSvg';
import { FacebookSVG } from '@/src/components/svg/FacebookSVG';
import empresa from '@/assets/images/empresa.jpg'
import FastImage from 'react-native-fast-image'
import { useSignIn } from '@clerk/clerk-expo';
import { Link, useRouter } from 'expo-router';
import { useState, useEffect, useRef } from 'react';
import Colors from '@/src/constants/Colors';
import { TextInput} from '@/src/components/ui/TextInput';
import { checkPasswordStrength, getPasswordRequirements, isStrongPassword } from '../../util/strenghPasswordForce';
const logoApp = Image.resolveAssetSource(empresa).uri
export default function SignUp() {
    const {signIn, setActive, isLoaded} = useSignIn()
    const router = useRouter()
    const { width, height } = useWindowDimensions();

    const [emailAddress, setEmailAddress] = useState('')
    const [password, setPassword] = useState('')
    const [isSignIn, setIsSignIn] = useState(false)
    const strength = checkPasswordStrength(password);
    const requirements = getPasswordRequirements(password);
    const [showPassword, setShowPassword] = useState(false);
    const [isPasswordStrong, setIsPasswordStrong] = useState(false);

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
        height: (width * 0.6) * 0.478, // Mantendo a proporção original (110/230)
        maxWidth: 230,
        maxHeight: 110
    };

    const renderStrengthBar = () => {
        const barWidth = strength.score;
        let barColor = Colors.error;

        if (strength.score > 75) barColor = Colors.success;
        else if (strength.score > 50) barColor = Colors.warning;
        else if (strength.score > 25) barColor = Colors.orange;

        return (
            <View style={styles.strengthBarContainer}>
                <View 
                    style={[
                        styles.strengthBar, 
                        { width: `${barWidth}%`, backgroundColor: barColor }
                    ]} 
                />
            </View>
        );
    };

    const renderRequirements = () => (
        <View style={styles.requirementsContainer}>
            <Text style={[
                styles.requirement,
                { color: requirements.hasNumber ? Colors.success : Colors.error }
            ]}>
                • Pelo menos um número
            </Text>
            <Text style={[
                styles.requirement,
                { color: requirements.hasSymbol ? Colors.success : Colors.error }
            ]}>
                • Pelo menos um símbolo (!@#$%^&*...)
            </Text>
            <Text style={[
                styles.requirement,
                { color: requirements.hasUpperCase ? Colors.success : Colors.error }
            ]}>
                • Pelo menos uma letra maiúscula
            </Text>
            <Text style={[
                styles.requirement,
                { color: requirements.hasLowerCase ? Colors.success : Colors.error }
            ]}>
                • Pelo menos uma letra minúscula
            </Text>
            <Text style={[
                styles.requirement,
                { color: requirements.hasMinLength ? Colors.success : Colors.error }
            ]}>
                • Mínimo de 8 caracteres
            </Text>
        </View>
    );

    const renderPasswordIcon = () => (
        <View style={{ flexDirection:'row', alignItems:'center', justifyContent:'center', gap:4}}>
            
            {isPasswordStrong ? (
              <Ionicons 
                name='checkmark-circle'
                size={16} 
                color={isPasswordStrong ? Colors.success : "rgba(50, 52, 55, 0.64)"}
            />
            ) : null}
            {password.length > 0 ? (
              <Ionicons 
                name={showPassword ? "eye-off-outline" : "eye-outline"} 
                size={22} 
                color="rgba(50, 52, 55, 0.64)"
              />
            ) : null}
        </View>
    );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{flex: 1, backgroundColor:'white'}}
      >
        <Animated.View 
            style={[
                styles.container,
                {
                    transform: [{ translateY }],
                    paddingVertical: height * 0.05
                }
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
            <View style={[styles.contentContainer, { maxWidth: 500 }]}>
                <Text style={[styles.headerText, { fontSize: width * 0.04, textAlign:'center' }]}>
                    Crie sua conta desfrute dos serviços que a chilombo oferece
                </Text>

                
                <View style={styles.input}>
                    <TextInput
                        placeholder='Insira o e-mail ou o telefone'
                        placeholderTextColor={'rgba(50, 52, 55, 0.64)'}
                        
                        numberOfLines={1}
                        style={{flex:1,fontWeight:'300'}}
                    />
                </View>

                <View style={styles.input}>
                    <TextInput
                        placeholder='Insira a senha'
                        placeholderTextColor={'rgba(50, 52, 55, 0.64)'}
                        secureTextEntry={!showPassword}
                        onChangeText={(text) => setPassword(text)}
                        value={password}
                        numberOfLines={1}
                    />
                    <Pressable onPress={() => setShowPassword(!showPassword)}>
                        {renderPasswordIcon()}
                    </Pressable>
                </View>

                {
                  !isPasswordStrong && password.length > 0 ? (
                    <View style={{width: '100%', gap: 10, marginBottom: 10}}>
                        {renderStrengthBar()}
                        {renderRequirements()}
                    </View>
                  ) : null
                }
                

                <TouchableOpacity 
                    style={[
                        styles.button,
                        {
                            marginTop:30,
                            backgroundColor: isPasswordStrong ? 'rgba(6,23,74,.8)' : 'rgba(6,23,74,.4)',
                            borderWidth:0
                        }
                    ]}
                    //disabled={!isPasswordStrong}
                >
                    <Text style={[styles.buttonText, {color:'white'}]}>Entrar</Text>
                </TouchableOpacity>
                <Text style={{
                    color: 'rgba(50, 52, 55, 0.79)',
                    fontWeight: '300',
                    marginBottom: '3%',
                    fontSize: width * 0.035
                }}>
                    Já possui uma conta?{' '}
                    <Link
                        href={'/(auth)'}
                        style={{
                            textDecorationLine: 'underline',
                            color: Colors.primary
                        }}
                    >
                        Faça login
                    </Link>
                </Text>
            </View>
        </Animated.View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  contentContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  headerText: {
    color: 'rgba(50, 52, 55, 0.79)',
    fontWeight: '300',
    marginBottom: '4%',
  },
  input:{
    padding: '4.5%',
    borderRadius: 14,
    width: '100%',
    flexDirection: 'row',
    borderColor:'#ccc',
    borderWidth:1,
    marginBottom:14
  },
  button:{
    //backgroundColor: 'red',
    padding: '4.5%',
    borderRadius: 16,
    width: '100%',
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
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '3%',
    width: '100%',
  },
  dividerLine: {
    width: '6%',
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    color: 'rgba(50, 52, 55, 0.79)',
    fontWeight: '300',
    paddingHorizontal: '2.5%',
  },
  strengthBarContainer: {
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 1,
    overflow: 'hidden',
  },
  strengthBar: {
    height: '100%',
    borderRadius: 2,
  },
  strengthText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },
  requirementsContainer: {
    gap: 8,
  },
  requirement: {
    fontSize: 14,
  },
});
