import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import COLORS from '../conts/colors';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const CustomButton = ({ title, onPress = () => { } }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.7}
      style={{

        height: verticalScale(57),
        paddingHorizontal: 15,
        borderWidth: scale(0.5),
        borderRadius: scale(20),
        width: moderateScale(260),
        backgroundColor: '#0a2d31',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: verticalScale(36), 
      }}>
      <Text style={{ color: COLORS.white, fontWeight: 'bold', fontSize: scale(18) }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
