import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import Login from './src/screens/Login';
import { NavigationContainer } from '@react-navigation/native';
import DrawerNavigation from './src/screens/DrawerNavigation';
import AddCustomer from './src/screens/AddCustomer';
import SyncCustomer from './src/screens/SyncCustomer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingScreen from './src/screens/LoadingScreen';
const Stack = createStackNavigator();

export default function App() {
    const [loggedIn, setLoggedIn] = useState(null);
    const [loading, setLoading] = useState(true); // Add loading state


    useEffect(() => {
        setTimeout(() => {
            checkFirstLaunch();
        }, 1000);
    }, []);

    const checkFirstLaunch = async () => {
        try {

            const loginStatus = await AsyncStorage.getItem('loginStatus');
            console.log(loginStatus)
            if (loginStatus === 'yes') {
                setLoggedIn(true)
                setLoading(false);
            } else {
                setLoading(false);
                setLoggedIn(false);
            }
        } catch (error) {
            console.log('Error reading isFirstLaunch:', error);
        }
    };

    if (loading) {
        // Add a loading screen while determining login status
        return <LoadingScreen />;
    }

    console.log(loggedIn);
    return (
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

    )
}
