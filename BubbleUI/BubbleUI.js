import React from 'react';
import {TouchableOpacity} from 'react-native';
export const BubbleUI = ({color}) => {
  return (
    <TouchableOpacity
      style={{
        width: 150,
        height: 150,
        borderRadius: 150,
        backgroundColor: color ? color : 'red',
      }}></TouchableOpacity>
  );
};
