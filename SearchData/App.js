import React, {useState} from 'react';
import {
  Animated,
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import 'react-native-gesture-handler';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import SearchBar from './src/components/SearchBar';

const App = () => {
  const dataName = [
    {key: 1, label: 'Amit', leftLabel: 'Delete', rightLabel: 'Right 1'},
    {key: 2, label: 'suresh', leftLabel: 'Delete', rightLabel: 'Right 2'},
    {key: 3, label: 'mukesh', leftLabel: 'Delete', rightLabel: 'Right 3'},
    {key: 4, label: 'sonu', leftLabel: 'Delete', rightLabel: 'Right 4'},
    {key: 5, label: 'bheem', leftLabel: 'Delete', rightLabel: 'Right 5'},
  ];

  const [searchData, setSearchData] = useState(dataName);
  const [data, setData] = useState('');

  // getData();
  // console.log(getData(), searchData);
  const Separator = () => <View style={styles.itemSeparator} />;
  const getData = () => {
    let contactArr = [];
    // dataName.map((item, index) => {
    let a = 'A'.charCodeAt(0);
    console.log('sss', a);
    for (i = 0; i < 26; i++) {
      let charCode = String.fromCharCode(a + i);
      let obj = {
        title: charCode,
      };
      console.log('sss===', charCode);

      let currContans = dataName.filter(item => {
        return item.label[0].toUpperCase() == charCode;
      });
      if (currContans.length > 0) {
        currContans.sort((a, b) => {
          a.label.localeCompare(b.label);
        });
        obj.data = currContans;
        contactArr.push(obj);
      }
    }
    // return contactArr;
    setSearchData(contactArr);
    // });
  };
  const searchItems = (txt, data = dataName) => {
    let text = txt;
    if ((txt = '')) {
      setSearchData(dataName);
      return;
    }
    let res = data.filter(item => {
      if (
        item &&
        String(item?.label)
          .toLocaleLowerCase()
          .match(String(text).trim().toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
    });
    setSearchData(res);
  };

  const DeleteName = item => {
    let delData = searchData;
    delData = delData.filter(data => data.key !== item.key);
    setSearchData(delData);
  };
  // const rightButtons = [
  //   <TouchableHighlight>
  //     <Text>Button 1</Text>
  //   </TouchableHighlight>,
  //   <TouchableHighlight>
  //     <Text>Button 2</Text>
  //   </TouchableHighlight>,
  // ];
  // const renderRightButtons = () => {
  //   return [
  //     <View style={styles.deleteContainer}>
  //       <TouchableOpacity style={styles.deleteButton}>
  //         <Text style={styles.deleteText}>Delete</Text>
  //       </TouchableOpacity>
  //     </View>,
  //   ];
  // };
  const ListItem = ({label}) => {
    return (
      <Swipeable
        renderRightActions={(progress, dragX) => RightActions(progress, dragX)}
        onSwipeableRightOpen={() => console.log('Swiped right')}>
        <View style={{paddingVertical: 20}}>
          <Text
            style={{
              fontSize: 24,
              paddingHorizontal: 10,
              borderBottomWidth: 1,
              borderBottomColor: 'gray',
              marginHorizontal: 5,
            }}>
            {label}
          </Text>
        </View>
      </Swipeable>
    );
  };
  const RightActions = (progress, dragX) => {
    console.log('dragX--', dragX);
    const scale = dragX.interpolate({
      inputRange: [-100, 0],
      outputRange: [0.7, 0],
    });
    return (
      <>
        <TouchableOpacity
          // style={styles.deleteButtonStyle}
          onPress={() => alert('Delete button pressed')}>
          <View style={{bstackgroundColor: 'red', justifyContent: 'center'}}>
            <Animated.Text
              style={{
                color: 'white',
                paddingHorizontal: 10,
                fontWeight: '600',
                transform: [{scale}],
              }}>
              Delete
            </Animated.Text>
          </View>
        </TouchableOpacity>
      </>
    );
  };

  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff', width: '100%'}}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          scrollEnabled={false}>
          <SearchBar name="search name" onSearch={searchItems} />
          {/* <View style={{marginTop: 10}}> */}
          {/* <SectionList
          sections={getData()}
          renderItem={({item}) => <ListItem {...item} />}
          keyExtractor={item => item.key}
          renderSectionHeader={({section}) => {
            <View style={styles.sectionHeader}>
            <Text>{section.title + 'ss'}</Text>
            </View>;
          }}
        /> */}

          <FlatList
            data={searchData}
            keyExtractor={item => item.key}
            renderItem={({item}) => <ListItem {...item} />}
            ItemSeparatorComponent={() => <Separator />}
          />
          {/* </View> */}
        </ScrollView>
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  sectionHeader: {
    backgroundColor: '#efefef',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  itemContainer: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.5,
    shadowRadius: 1,
    elevation: 1,
    marginVertical: 3,
  },
  deleteContainer: {
    backgroundColor: 'red',
    flex: 1,
  },
  deleteButton: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 15,
  },
  swipeable: {
    paddingVertical: 5,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  text: {
    marginLeft: 10,
    fontSize: 16,
  },
});
export default App;
