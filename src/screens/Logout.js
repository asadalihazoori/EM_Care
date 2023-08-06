import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

function Logout() {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.navigate('Login');

    AsyncStorage.setItem('loginStatus', 'false');

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
