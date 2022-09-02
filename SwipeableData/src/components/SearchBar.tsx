import React, {useState} from 'react';
import {TextInput, View} from 'react-native';

const SearchBar = ({name = 'Search Name', onSearch}) => {
  const [names, setName] = useState('');

  return (
    <View
      style={{
        flex: 1,
        width: '100%',

        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: 'white',
        marginHorizontal: 19,
        paddingHorizontal: 6,
      }}>
      <TextInput placeholder={name} onChangeText={text => onSearch(text)} />
    </View>
  );
};

export default SearchBar;
