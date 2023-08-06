import React from 'react';
import { View, ActivityIndicator, StyleSheet, Image } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      {/* <ActivityIndicator size="large" color="blue" /> */}
      <Image resizeMode='center' source={require('../assets/logo/emcare.jpeg')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0a2d31',
  },
});

export default LoadingScreen;
