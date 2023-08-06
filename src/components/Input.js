import React from 'react';
import { View, Text, TextInput, StyleSheet, Keyboard } from 'react-native';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';

const Input = ({
  label,
  iconName,
  error,
  password,
  value,
  keyboardType,
  autoCapitalize,
  onFocus = () => { },
  ...props
}) => {
  const [hidePassword, setHidePassword] = React.useState(password);
  const [isFocused, setIsFocused] = React.useState(false);
  return (
    <View style={{ marginBottom: verticalScale(25) }}>
      {/* <Text style={style.label}>{label}</Text> */}
      <View
        style={[
          style.inputContainer,
          {
            borderColor: error
              ? COLORS.red
              : isFocused
                ? '#02db89'
                : COLORS.light,
            alignItems: 'center',
          },
        ]}>
        <Icon
          name={iconName}
          style={{
            color: COLORS.blue, fontSize: scale(22),
            marginRight: moderateScale(10),
          }}
        />
        <TextInput
          value={value}
          keyboardType=  {keyboardType}
          autoCorrect={false}
          onFocus={() => {
            onFocus();
            setIsFocused(true);
          }}
          onBlur={() => setIsFocused(false)}
          secureTextEntry={hidePassword}
          style={{ color: COLORS.black, flex: 1 }}
          autoCapitalize= {autoCapitalize} //'none'
          {...props}

        />
        {password && (
          <Icon
            onPress={() => setHidePassword(!hidePassword)}
            name={hidePassword ? 'eye-outline' : 'eye-off-outline'}
            style={{ color: COLORS.blue, fontSize: scale(22) }}
          />
        )}
      </View>
      {error && (
        <Text style={{
          marginTop: verticalScale(4),
          color: COLORS.red, fontSize: scale(12), marginStart: moderateScale(8)
        }}>
          {error}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  label: {
    marginVertical: 5,
    fontSize: 16,
    color: COLORS.black,
  },
  inputContainer: {

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: verticalScale(2),
    },
    shadowOpacity: scale(0.25),
    shadowRadius: scale(3.84),
    elevation: scale(5),

    height: verticalScale(56),
    backgroundColor: 'white',
    flexDirection: 'row',
    paddingHorizontal: moderateScale(15),
    borderWidth: scale(0.5),
    width: moderateScale(265),
    borderRadius: scale(20),
  },
});

export default Input;
