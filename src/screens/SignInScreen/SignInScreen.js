/**
 * SignInScreen represents the screen where users can sign in.
 * It includes a logo, input fields for username and password, and buttons for signing in, creating an account, and recovering a forgotten password.
 */

import React, {useState} from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions, ScrollView, TextInput, Alert, TouchableOpacity } from 'react-native';
import Logo from '../../../assets/images/FeelGood..png';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import {useNavigation} from '@react-navigation/native';
import {useForm, Controller} from 'react-hook-form';
import {Auth} from 'aws-amplify';
import { Ionicons } from '@expo/vector-icons';
import {LinearGradient} from 'expo-linear-gradient';

const SignInScreen = () => {
  const {height} = useWindowDimensions();
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm();

  // Handle the sign-in process
  const onSignInPressed = async data => {
    if (loading) {
      return;
    }

    setLoading(true);
    try {
      const response = await Auth.signIn(data.username, data.password);
      console.log(response);
    } catch (e) {
      Alert.alert('Oops', e.message);
    }
    setLoading(false);
  };

  // Navigate to the forgot password screen
  const onForgotPasswordPressed = () => {
    navigation.navigate('ForgotPassword');
  };

  // Navigate to the sign-up screen
  const onSignUpPress = () => {
    navigation.navigate('SignUp');
  };

  return (
    <LinearGradient
      colors={['#9999FF', '#9966FF', '#6600CC']}
      style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View style={styles.root}>
        <Image
          source={Logo}
          style={[styles.logo, {height: height * 0.4}]}
          resizeMode="contain"
        />

        <CustomInput
          name="username"
          placeholder="Nom d'utilisateur"
          control={control}
          rules={{required: 'Nom Utilisateur Obligatoire'}}
        />

        <CustomInput
          name="password"
          placeholder="Mot De Passe"
          secureTextEntry
          control={control}
          rules={{
            required: 'Mot De Passe Obligatoire',
            minLength: {
              value: 3,
              message: 'Le Mot De Passe Doit Avoir Minimum 3 Caractères',
            },
          }}
        />

        <CustomButton
          text={loading ? 'Chargement...' : 'Se Connecter'}
          onPress={handleSubmit(onSignInPressed)}
        />

        <CustomButton
          text="Créer Un Compte"
          onPress={onSignUpPress}
        />

        <CustomButton
          text="Mot De Passe Oublié ?"
          onPress={onForgotPasswordPressed}
          type="TERTIARY"
        />
        
      </View>
      </ScrollView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  root: {
    paddingTop: '20%',
    paddingBottom: '30%',
    alignItems: 'center',
    padding: 20,
    /*backgroundColor: '#9999FF',*/
  },
  logo: {
    width: '70%',
    maxWidth: 300,
    maxHeight: 200,
    marginTop: 50,
  },
});

export default SignInScreen;
