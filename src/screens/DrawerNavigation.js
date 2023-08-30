import React, { useEffect } from 'react'
import { BackHandler, View, StyleSheet, Image } from 'react-native'
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Avatar, Title, Caption, Drawer, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Logout from './Logout'
import COLORS from '../conts/colors';
import AddCustomer from './AddCustomer';
import Products from './Products';
import SyncCustomer from './SyncCustomer';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const ODrawer = createDrawerNavigator();

export default function DrawerNavigation() {
  // useEffect(() => {
  //   const backAction = () => {
  //     BackHandler.exitApp();
  //     return true;
  //   };

  //   const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

  //   return () => backHandler.remove();
  // }, []);

  const CustomDrawerContent = (props) => {
    return (
      <View style={{ flex: 1 }}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerContent}>
            {/* <View style={styles.userInfoSection}>
              <View style={{ flexDirection: 'row', marginTop: 15 }}>
                <Avatar.Image
                  source={{ uri: sessionDetail.profile_image }}
                  size={100}
                />
                <View style={{ marginLeft: 15, flexDirection: 'column', marginTop: 25 }}>
                  <Title style={styles.title}>{sessionDetail.employee_name}</Title>
                  <Caption style={styles.caption}>{sessionDetail.job_title}</Caption>
                </View>
              </View>
            </View> */}

            <Drawer.Section style={styles.drawerSection}>

              <DrawerItem
                icon={({ color, size }) => (
                  <Icon name="account-multiple-plus-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Add Customer</Text>}
                onPress={() => {
                  props.navigation.navigate('Add Customer');
                }}
              />
              <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="account-sync-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Sync Customers</Text>}
                onPress={() => {
                  props.navigation.navigate('Sync Customers');
                }}
              />
              {/* <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="account-box-multiple-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Customers List / Update</Text>}
                onPress={() => {
                  props.navigation.navigate('Customers List');
                }}
              /> */}
              {/* <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="atom" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Products</Text>}
                onPress={() => {
                  props.navigation.navigate('Products');
                }}
              /> */}
              {/* <DrawerItem
                icon={({ color, size }) => (
                  // <Image source={require('../assets/icons/customer.png')} style={{height: size, width: size, tintColor: COLORS.blue}} />
                  <Icon name="cart-outline" color={color} size={size} style={{ color: COLORS.blue }} />
                )}
                label={() => <Text style={{ color: COLORS.black }}>Orders</Text>}
                onPress={() => {
                  props.navigation.navigate('Customers List', { screenName: 'order' });
                }}
              /> */}
            </Drawer.Section>

          </View>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color={color} size={size} style={{ color: COLORS.blue }} />
            )}
            label={() => <Text style={{ color: COLORS.black }}> Logout</Text>}
            onPress={() => {
              props.navigation.navigate('Logout');
            }}
          />
        </Drawer.Section>
      </View>
    );
  };

  return (
    <ODrawer.Navigator
      initialRouteName="Add Customer"
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerStyle: { backgroundColor: COLORS.blue },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    >

      <ODrawer.Screen name="Add Customer" component={AddCustomer} />
      <ODrawer.Screen name="Products" component={Products} />
      <ODrawer.Screen name="Sync Customers" component={SyncCustomer} />
      <ODrawer.Screen name="Logout" component={Logout} />
    </ODrawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },

  userInfoSection: {
    paddingLeft: moderateScale(20),
  },
  title: {
    fontSize: scale(16),
    marginTop: verticalScale(3),
    fontWeight: 'bold',
  },
  caption: {
    fontSize: scale(9),
    lineHeight: scale(14),
  },
  drawerSection: {
    marginTop: verticalScale(15),
  },
  bottomDrawerSection: {
    marginBottom: verticalScale(15),
    borderTopColor: '#f4f4f4',
    borderTopWidth: scale(1),
  },
  infoIcon: {
    // width: 20,
    // height: 20,

    // backgroundColor: 'red'
  },
});