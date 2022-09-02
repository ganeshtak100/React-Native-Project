import React from 'react';
import {View,FlatList} from 'react-native';
import SearchBar from './SearchBar';
export const SearchScreen = ({onSearch,searchList}) => {
  return (
    <View>
      <SearchBar name="Search name" onSearch={onSearch} />
      <FlatList
      data={searchList}
      />
    </View>
  );
};
