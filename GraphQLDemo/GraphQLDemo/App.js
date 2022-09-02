import gql from 'graphql-tag';
import React from 'react';
import {useQuery} from 'react-apollo';
import {Text, View} from 'react-native';

export const App = () => {
  const getBooks = gql`
    query {
      books {
        name
      }
    }
  `;
  const {data, error, loading} = useQuery(getBooks);

  // const {data} = useQuery(getBooks);
  // console.log('datata-----------', data, error, loading);
  return (
    <View style={{flex: 1, backgroundColor: 'red', width: '100%'}}>
      <Text>Heloo reatc native</Text>
    </View>
  );
};
