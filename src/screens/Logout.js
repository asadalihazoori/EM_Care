import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { login_customer } from '../redux/action';

function Logout() {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(login_customer(false));
    navigation.navigate('Login');


    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
      params: { username: '', password: '' },
    });

  }, [navigation]);

  return (
    <View>
      <Text>You have been logged out.</Text>
    </View>
  );
}

export default Logout;
