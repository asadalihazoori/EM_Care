import React from 'react';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import {
  useWindowDimensions,
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import COLORS from '../conts/colors';
const Loader = ({ visible = false }) => {
  const { width, height } = useWindowDimensions();
  return (
    visible && (
      <View style={[style.container, { height, width }]}>
        <View style={style.loader}>
          <ActivityIndicator size="large" color={COLORS.blue} />
          <Text style={{ marginLeft: moderateScale(12), fontSize: scale(15), color: COLORS.black }}>Loading...</Text>
        </View>
      </View>
    )
  );
};

const style = StyleSheet.create({
  loader: {
    height: verticalScale(61),
    backgroundColor: COLORS.white,
    marginHorizontal: moderateScale(60),
    borderRadius: scale(5),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  container: {
    position: 'absolute',
    zIndex: scale(10),
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
});

export default Loader;
