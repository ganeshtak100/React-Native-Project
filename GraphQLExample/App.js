// import {useQuery} from 'react-apollo';
import {useQuery} from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, {useState} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

export const App = () => {
  let [showData, setShowData] = useState([]);
  const getBooks = gql`
    query {
      launchesPast(limit: 10) {
        mission_name
        launch_date_local
        launch_site {
          site_name_long
        }

        rocket {
          rocket_name
          first_stage {
            cores {
              flight
              core {
                reuse_count
                status
              }
            }
          }
        }
      }
    }
  `;
  const {data, error, loading} = useQuery(getBooks);
  const displaydata = () => {
    setShowData(data?.launchesPast);
  };
  // const {data} = useQuery(getBooks);
  console.log(
    'datata-----------',
    data?.launchesPast[0]?.mission_name,
    error,
    loading,
  );
  return (
    <View style={{flex: 1, width: '100%'}}>
      <Text style={{textAlign: 'center', fontSize: 30, fontWeight: '600'}}>
        Setallite Names
      </Text>
      <TouchableOpacity
        style={{
          marginTop: 10,
          alignSelf: 'center',
          height: 34,
          width: 150,
          borderRadius: 10,
          borderColor: '#000',
          borderWidth: 1,
          backgroundColor: 'gray',
        }}
        onPress={() => {
          displaydata();
        }}>
        <Text
          style={{
            textAlign: 'center',
            padding: 2,
            fontSize: 20,
          }}>
          Show data
        </Text>
      </TouchableOpacity>
      {showData && (
        <FlatList
          data={showData}
          renderItem={({item, index}) => {
            return (
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginHorizontal: 10,
                  alignSelf: 'flex-start',
                  marginLeft: 20,
                  marginVertical: 9,
                  borderRadius: 5,
                  width: '100%',
                  height: 60,
                  borderColor: '#gray',
                  borderWidth: 1,
                }}>
                <Text
                  style={{textAlign: 'justify', paddingTop: 8, marginLeft: 10}}>
                  {'Misson Name- '} {item?.mission_name}
                </Text>
                <Text style={{textAlign: 'justify', marginLeft: 10}}>
                  {'Rocket Name- '} {item?.rocket?.rocket_name}
                </Text>
              </View>
            );
          }}
        />
      )}
    </View>
  );
};
