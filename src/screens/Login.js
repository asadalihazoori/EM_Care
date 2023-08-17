import { View, Text, StyleSheet, Image, Keyboard } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../components/Button';
import Input from '../components/Input';
import Loader from '../components/Loader';
import LoginRMS from '../ApiServices/RMS_Server/LoginRMS';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import CustomAlert from '../components/CustomAlert';

export default function Login({ navigation }) {
    const [inputs, setInputs] = React.useState({
        username: null,
        password: null,
    });
    const [errors, setErrors] = React.useState({});
    const [loading, setLoading] = React.useState(false);

    const [alertBox, setAlertBox] = useState({
        showBox: false,
        title: null,
        message: null,
        icon: null,
        confirmBtn: false
    });

    const handleAlert = (title, message, icon, confirmBtn) => {
        setAlertBox(prevState => ({ ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
    };

    const onCloseAlert = () => {
        setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
    };


    function login() {
        setLoading(true);

        LoginRMS.LoginUser(inputs)
            .then(response => {
                if (response.result) {
                    if (response.result.uid) {
                        AsyncStorage.setItem('loginStatus', 'yes')
                            .then(() => {
                                setLoading(false);
                                navigation.navigate("DrawerNavigation");
                            })
                            .catch(error => {
                                console.log('Error saving login status:', error);
                            });
                    }
                }
                else if (response.error.code == 200) {
                    setLoading(false);
                    handleError('Incorrect username', 'username');
                    handleError('or Incorrect password', 'password');
                }

            })
            .catch((error) => {
                setLoading(false);
                console.log(error);
                handleAlert("Internet Required", 'You are not conncted to any Network.', "wifi-off", false);
            })


    }

    const validate = () => {
        Keyboard.dismiss();
        let isValid = true;

        if (!inputs.username) {
            handleError('Please input username', 'username');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Please input password', 'password');
            isValid = false;
        }

        if (isValid) {
            login();
        }
    };

    const handleOnchange = (text, input) => {
        setInputs(prevState => ({ ...prevState, [input]: text }));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({ ...prevState, [input]: error }));
    };


    return (
        <LinearGradient
            colors={['#01dc88', '#0a2d31']}
            style={Style.container}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>

            <Loader visible={loading} />

            <Image style={Style.image} resizeMode="contain" source={require('../assets/logo/emcare.jpeg')} />

            <View style={Style.innerView}>

                <Text style={Style.text}>SIGN IN</Text>
                <Input
                    onChangeText={text => handleOnchange(text, 'username')}
                    onFocus={() => handleError(null, 'username')}
                    iconName="account-outline"
                    // label="Username"
                    placeholder="Username "
                    placeholderTextColor="#000000"
                    error={errors.username}
                    keyboardType='email-address'
                    autoCapitalize='none'
                />

                <Input
                    onChangeText={text => handleOnchange(text, 'password')}
                    onFocus={() => handleError(null, 'password')}
                    iconName="lock-outline"
                    // label="Password"
                    placeholder="Password"
                    placeholderTextColor="#000000"
                    error={errors.password}
                    autoCapitalize='none'
                    password
                />

                <CustomButton title="Login" onPress={validate} />

            </View>
            <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
        </LinearGradient>
    )
}

const Style = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    innerView: {
        backgroundColor: 'white',
        borderRadius: scale(20),
        alignItems: 'center',
        marginTop: verticalScale(30),
        width: moderateScale(312),
    },

    text: {
        margin: moderateScale(36),
        fontSize: scale(30),
        fontWeight: 'bold',
        color: '#0a2d31',
    },

    image: {
        width: verticalScale(150),
        height: verticalScale(150),
        marginTop: verticalScale(30),
        borderRadius: scale(100)
    }
});