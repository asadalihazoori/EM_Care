
import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import COLORS from '../conts/colors';
import Loader from '../components/Loader';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CustomerAPI from '../ApiServices/RMS_Server/CustomerAPI';
import CustomAlert from '../components/CustomAlert';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { update_customer } from '../redux/action';

const SyncCustomer = ({ navigation }) => {
  const [loading, setLoading] = React.useState(false);
  const customerList = useSelector((state) => state.addCustomer.data);
  const dispatch = useDispatch();

  const [alertBox, setAlertBox] = useState({
    showBox: false,
    title: null,
    message: null,
    icon: null,
    confirmBtn: false
  });

  const handleAlert = (title, message, icon, confirmBtn) => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: true, ["title"]: title, ["message"]: message, ["icon"]: icon, ["confirmBtn"]: confirmBtn }));
  };

  const onCloseAlert = () => {
    setAlertBox(prevState => ({ ...prevState, ["showBox"]: false }));
  };
  const handleSyncIconPress = (item) => {
    setLoading(true);
    CustomerAPI.AddCustomer(item)
      .then((result) => {
        if (result.result.status == 200) {

          dispatch(update_customer(item))
          handleAlert("Confirmation", "Customer Registered Successfully.", "clipboard-check-outline", false);
          setLoading(false);
        }
      })
      .catch(error => {
        handleAlert("Internet Required", "You are not conncted to any Network.", "wifi-off", false)
        setLoading(false);
      });
  }

  const renderCustomerItem = ({ item }) => (
    <View style={styles.container}>

      <View style={styles.view1}>
        <View style={styles.view2}>
          <Text style={styles.name}>{item.name}</Text>
          <View style={styles.infoRow}>

            <Icon name="map-marker-outline" color={COLORS.red} size={scale(16)} style={styles.infoIcon} />

            <Text style={styles.infoText}>{item.address}</Text>
          </View>
        </View>
        <View style={styles.view3}>
          {item.sync ?
            (<Icon name="check-circle-outline" size={scale(40)} style={{ color: COLORS.blue }} />) :
            (<TouchableOpacity onPress={() => handleSyncIconPress(item)} activeOpacity={0.7}>
              <Icon name="sync" size={scale(40)} style={{ color: COLORS.blue }} />
            </TouchableOpacity>)}
        </View>
      </View>
    </View>
  );



  return (
    <View>
      <Loader visible={loading} />

      <View style={styles.mainContainer}>
        {customerList.length > 0 ? (
          <FlatList
            data={customerList}
            renderItem={renderCustomerItem}
            keyExtractor={(item, index) => index.toString()}
          />
        ) :
          (
            <Text style={styles.text}>No Customer Detected !</Text>)}

        <CustomAlert visible={alertBox.showBox} onClose={onCloseAlert} title={alertBox.title} message={alertBox.message} icon={alertBox.icon} />
      </View>
    </View>

  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: scale(10),
    marginTop: verticalScale(13),
    padding: scale(16),
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),
    marginHorizontal: moderateScale(16),
  },
  container: {
    flexDirection: 'row',
    backgroundColor: COLORS.light,
    borderRadius: scale(10),
    padding: scale(12),
    marginBottom: verticalScale(10),
  },

  view1: {
    width: moderateScale(270),
    flexDirection: 'row',
  },

  view2: {
    flexDirection: 'column',
    width: moderateScale(215),
  },

  text: {
    fontSize: scale(20),
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center'
  },

  view3: {
    width: moderateScale(55),
    alignItems: 'center',
    justifyContent: 'center',
  },

  name: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#000000',
  },

  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(8),
  },

  infoIcon: {
    marginRight: moderateScale(4.5),
    color: COLORS.blue,
  },

  infoText: {
    color: '#000000',
    fontSize: scale(14),
  },
});

export default SyncCustomer;
