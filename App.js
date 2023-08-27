import React, { useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/screens/DrawerNavigation';
import LoadingScreen from './src/screens/LoadingScreen';
import SyncCustomer from './src/screens/SyncCustomer';
import AddCustomer from './src/screens/AddCustomer';
import Login from './src/screens/Login';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistedStore } from './src/redux/store';
// import SplashScreen from 'react-native-splash-screen';
import { useSelector } from 'react-redux';
const Stack = createStackNavigator();

export default function App() {
    const loggedIn = useSelector((state) => state.addCustomer.login);

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistedStore}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName={loggedIn ? 'DrawerNavigation' : 'Login'}>

                        <Stack.Screen name='Login' component={Login} options={{ headerShown: false }} />

                        <Stack.Screen name='DrawerNavigation' component={DrawerNavigation}
                            options={{ headerShown: false }} />


                        <Stack.Screen name='AddCustomer' component={AddCustomer} />
                        <Stack.Screen name='CustomerList' component={SyncCustomer} />
                        <Stack.Screen name='Loading' component={LoadingScreen} options={{ headerShown: false }} />


                    </Stack.Navigator>
                </NavigationContainer>
            </PersistGate>
        </Provider>
    )
}
