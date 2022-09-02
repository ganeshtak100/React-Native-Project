import React from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
export const AppTextInput = ({
  placeholder = 'Enter Email',
  onChangeText,
  value,
  onPress,
  keyboardType = 'email-address' || 'numeric',
  secureTextEntry = false,
  editable = true,
  autoCapitalize = false,
  Height = 120,
  centerIcon,
  textAlignVertical,
  additionalInfoInput = false,
  bottom = 10,
  onBlur,
  onFocus,
  ref,
}) => {
  return (
    // <Button
    //   onPress={onPress}
    //   style={{
    //     ...styles.containerStyle,
    //     height: Height,
    //     alignItems: 'flex-start',
    //     marginBottom: bottom,
    //   }}>
    <View
      style={{
        ...styles.containerStyle,
        flex: 1,

        alignItems: 'flex-start',
      }}>
      <TextInput
        style={{
          width: '100%',
          ...styles.inputStyle,
          paddingVertical: 15,
          paddingTop: additionalInfoInput ? 10 * 0.5 : 0,
          //backgroundColor: colors.red
          textTransform: autoCapitalize
            ? keyboardType == 'email-address'
              ? 'none'
              : 'capitalize'
            : 'none',
        }}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        ref={ref}
        // selection={undefined}
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize ? 'words' : 'none'}
        returnKeyType="done"
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor={'gray'}
      />
    </View>
    // </Button>
  );
};

const styles = StyleSheet.create({
  containerStyle: {
    borderColor: '#000',
    borderRadius: 10,
    borderWidth: 1,
    flexDirection: 'row',
    width: '100%',
    marginVertical: 10,
  },
  inputStyle: {
    paddingLeft: 17,
    color: '#000',
    fontSize: 18,
  },
});
