import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Keyboard, Image, TouchableOpacity, ScrollView } from 'react-native';
import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import Input from '../components/Input';
import CustomButton from '../components/Button';
import ImagePicker from 'react-native-image-crop-picker';
import AccessLocation from '../ApiServices/AccessLocation';
import CustomAlert from '../components/CustomAlert';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

export default function AddCustomer({ navigation }) {
  const [inputs, setInputs] = React.useState({
    name: null,
    phone: null,
    address: null,
    base64Img1: null,
    base64Img2: null,
    base64Img3: null,
    latitude: null,
    longitude: null
  });

  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null
  });

  const [selectedImages, setselectedImages] = React.useState({
    image1: 'transparent',
    image2: 'transparent',
    image3: 'transparent'
  });

  const [alertBox, setAlertBox] = useState({
    showBox: false,
    title: null,
    message: null,
    icon: null,
    confirmBtn: false
  });

  const [errors, setErrors] = React.useState({});
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      setFieldstoNull();
    });

    return unsubscribe;
  }, [navigation]);


  const setFieldstoNull = () => {
    getAttributes();
    setInputs({
      name: null,
      phone: null,
      address: null,
      base64Img1: null,
      base64Img2: null,
      base64Img3: null,
      latitude: null,
      longitude: null,
      sync: false
    });

    setImages({ image1: null, image2: null, image3: null });
    setselectedImages({ image1: "transparent", image2: 'transparent', image3: 'transparent' })
  }

  const handleAlert = (title, message, icon, confirmBtn) => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
    setFieldstoNull();
  };

  const onCloseAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
  };

  const validate = () => {
    Keyboard.dismiss();
    let isValid = true;

    if (!inputs.name) {
      handleError('Please input name', 'name');
      isValid = false;
    }

    if (!inputs.phone) {
      handleError('Please input phone', 'phone');
      isValid = false;
    }
    if (!inputs.address) {
      handleError('Please input address', 'address');
      isValid = false;
    }

    if (!inputs.base64Img1) {
      setselectedImages(prevState => ({ ...prevState, ["image1"]: COLORS.red }))
      isValid = false;
    }
    if (!inputs.base64Img2) {
      setselectedImages(prevState => ({ ...prevState, ["image2"]: COLORS.red }))
      isValid = false;
    }
    if (!inputs.base64Img3) {
      setselectedImages(prevState => ({ ...prevState, ["image3"]: COLORS.red }))
      isValid = false;
    }

    if (isValid) {
      addCustomer();
    }
  };


  function addCustomer() {
    if (inputs.base64Img1 != null && inputs.base64Img2 != null && inputs.base64Img3 != null) {
      // Create a new customer object with the required data
      const newCustomer = {
        name: inputs.name,
        phone: inputs.phone,
        address: inputs.address,
        base64Img1: inputs.base64Img1,
        base64Img2: inputs.base64Img2,
        base64Img3: inputs.base64Img3,
        latitude: inputs.latitude,
        longitude: inputs.longitude,
        sync: inputs.sync,
      };

      AsyncStorage.getItem('customers', (err, customers) => {
        if (err) {
          console.error('Error fetching customers from local storage:', err);
          return;
        }

        let parsedCustomers = [];

        if (customers) {
          parsedCustomers = JSON.parse(customers);
        }

        parsedCustomers.push(newCustomer);

        AsyncStorage.setItem('customers', JSON.stringify(parsedCustomers))
          .then(() => {
            console.log('Customer added successfully:');
            handleAlert("Confirmation", "Customer Added Successfully !.", "account-check-outline", false);
          })
          .catch(error => {
            console.log('Error saving login status:', error);
          });
      });
    }
  }

  const handleOnchange = (text, input) => {
    setInputs(prevState => ({ ...prevState, [input]: text }));
  };
  const handleError = (error, input) => {
    setErrors(prevState => ({ ...prevState, [input]: error }));
  };


  const takePhoto = (no) => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      if (no == 1) {

        setImages(prevState => ({ ...prevState, ['image1']: image.path }));
        setInputs(prevState => ({ ...prevState, ['base64Img1']: image.data }));
      }
      else if (no == 2) {
        setImages(prevState => ({ ...prevState, ['image2']: image.path }));
        setInputs(prevState => ({ ...prevState, ['base64Img2']: image.data }));
      }
      else if (no == 3) {
        setImages(prevState => ({ ...prevState, ['image3']: image.path }));
        setInputs(prevState => ({ ...prevState, ['base64Img3']: image.data }));
      }
    }).catch(error => {
      handleAlert("Warning", "You Cancelled Image Selection", "image-off", false)

    });
  };


  function getAttributes() {
    AccessLocation.getPermission()
      .then(({ latitude, longitude }) => {
        setInputs(prevState => ({ ...prevState, ['latitude']: latitude }));
        setInputs(prevState => ({ ...prevState, ['longitude']: longitude }));
      })
      .catch((error) => {
        handleAlert("Internet Required", error, "bomb", false);
      });

  }

  return (
    <ScrollView>
      <View style={styles.container}>
        <Loader visible={loading} />

        <View style={styles.innerView}>
          <Text style={styles.text}>Customer Details</Text>
          <Input
            onChangeText={text => handleOnchange(text, 'name')}
            onFocus={() => handleError(null, 'name')}
            iconName="account-outline"
            label="Name"
            placeholder="Enter Customer Name "
            placeholderTextColor="#000000"
            error={errors.name}
            value={inputs.name}
          />

          <Input
            onChangeText={text => handleOnchange(text, 'phone')}
            onFocus={() => handleError(null, 'phone')}
            iconName="phone-outline"
            label="Phone No.  "
            placeholder="Enter Customer Phone no."
            placeholderTextColor="#000000"
            error={errors.phone}
            value={inputs.phone}
            keyboardType='phone-pad'
          />

          <Input
            onChangeText={text => handleOnchange(text, 'address')}
            onFocus={() => handleError(null, 'address')}
            iconName="map-marker-outline"
            label="Address"
            placeholder="Enter Customer address"
            placeholderTextColor="#000000"
            error={errors.address}
            value={inputs.address}
          />
          <View style={styles.locationContainer}>

            <Text style={styles.headerText}>Latitude: {inputs.latitude}</Text>
            <Text style={[styles.headerText]}>Longitude: {inputs.longitude}</Text>

          </View>

          <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              onPress={() => takePhoto(1)}
              style={[
                styles.imagebox,
                { borderColor: selectedImages.image1 }
              ]}>
              {images.image1 ? (
                <Image source={{ uri: images.image1 }} style={styles.imageSelected} />
              ) : (
                <Image source={require('../assets/store-icon1.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => takePhoto(2)}
              style={[styles.imagebox, { marginLeft: moderateScale(14), borderColor: selectedImages.image2, }]}>
              {images.image2 ? (
                <Image source={{ uri: images.image2 }} style={styles.imageSelected} />
              ) : (
                <Image source={require('../assets/store-icon1.png')} style={styles.image} />
              )}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => takePhoto(3)}
              style={[styles.imagebox, { marginLeft: moderateScale(14), borderColor: selectedImages.image3 }]}>
              {images.image3 ? (
                <Image source={{ uri: images.image3 }} style={styles.imageSelected} />
              ) : (
                <Image source={require('../assets/store-icon1.png')} style={styles.image} />
              )}
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: verticalScale(20), justifyContent: 'center', alignItems: 'center' }}>
            <CustomButton title="Register"
              onPress={validate}
            />
          </View>
          <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
        </View>
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },

  innerView: {
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    marginTop: verticalScale(13),
    padding: scale(18),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),
    marginVertical: verticalScale(11),
  },

  locationContainer: {
    marginBottom: verticalScale(10),
    width: moderateScale(270),
  },

  header: {
    backgroundColor: COLORS.blue,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(12),
    paddingVertical: verticalScale(10),
    borderTopLeftRadius: scale(10),
    borderTopRightRadius: scale(10),
    color: "#FFFFFF",
  },

  headerText: {
    fontWeight: 'bold',
    fontSize: scale(16),
    color: COLORS.black,
    textAlign: 'left',
    marginBottom: verticalScale(10)
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: scale(1),
    borderBottomColor: '#DDDDDD',
  },

  text: {
    marginBottom: moderateScale(12),
    fontSize: scale(30),
    fontWeight: 'bold',
    color: '#0a2d31',
  },

  imagebox: {
    width: moderateScale(85),
    height: moderateScale(85),
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: scale(0.6),
  },

  image: {
    width: moderateScale(55),
    height: moderateScale(55)
  },

  imageSelected: {
    width: moderateScale(85),
    height: moderateScale(85)
  }
});
