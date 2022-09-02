import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {TouchableHighlight} from 'react-native-gesture-handler';
import {SwipeListView} from 'react-native-swipe-list-view';
import SearchBar from './src/components/SearchBar';
let SCREEN_WIDTH = Dimensions.get('window').width;
const data = [
  {id: '1', name: 'rohit'},
  {id: '2', name: 'Sohan'},
  {id: '3', name: 'SOL'},
  {id: '4', name: 'MOHAN'},
  {id: '5', name: 'Suresh'},
  {id: '6', name: 'Gou'},
  {id: '7', name: 'sohan'},
  {id: '8', name: 'Ravi'},
  {id: '9', name: 'IVA'},
  {id: '10', name: 'kartik'},
  {id: '11', name: 'kamal'},
  {id: '12', name: 'Jatin'},
  {id: '13', name: 'Manish'},
  {id: '14', name: 'Niya'},
  {id: '15', name: 'pal'},
  {id: '16', name: 'Pinki'},
  {id: '17', name: 'Qureshi'},
  {id: '18', name: 'Rohit'},
  {id: '19', name: 'don'},
  {id: '20', name: 'Tarance'},
  {id: '21', name: 'govind'},
  {id: '22', name: 'V'},
  {id: '23', name: 'Wahan'},
  {id: '24', name: 'pinku'},
  {id: '25', name: 'Yamini'},
  {id: '26', name: 'Piyush'},
];

const App = () => {
  // let [showSearchdata, setShowSearchData] = useState(false);

  const [lists, setLists] = useState([]);
  const [searchData, setSearchData] = useState();

  useEffect(() => {
    getData();
  }, []);
  const Separator = () => <View style={styles.itemSeparator} />;

  const getData = () => {
    let contactArr = [];
    let a = 'A'.charCodeAt(0);
    console.log('sss', a);
    for (let i = 0; i < 26; i++) {
      let charCode: any = String.fromCharCode(a + i);
      let obj = {
        title: charCode,
        data,
      };
      console.log('sss===', charCode);

      let currContans: any[] = data.filter(item => {
        return item.name[0].toUpperCase() == charCode;
      });
      console.log('currents contacts--', currContans);
      if (currContans.length > 0) {
        currContans.sort((a, b) => {
          a?.name.localeCompare(b.name);
        });
        obj.data = currContans;
        console.log('object new formated data---', obj);
        contactArr.push(obj);
      }
    }
    console.log('object data--', contactArr);
    // return contactArr;
    setLists(contactArr);
    // });
  };
  // console.log('data for sectionlist', getData());
  const searchItems = (txt: String, data1 = lists) => {
    let text = txt;
    console.log('search lists--', lists, text);
    if (txt == '') {
      // alert();
      setLists(lists);
      // setLists(data1);
      return;
    }
    // console.log('search keywords--', data1, '---', text);
    let res = data1.filter(item => {
      console.log('items------', item?.data?.[0]?.name, item?.data.length);
      if (
        item &&
        String(item?.data?.[0]?.name)
          .toLocaleLowerCase()
          .match(String(text).trim().toLocaleLowerCase())
      ) {
        return true;
      }
      return false;
      // }
    });
    console.log('searched items00', ...res);

    // setShowSearchData(true);
    setLists(res);

    setSearchData(res);
  };

  const onRowDidOpen = (rowKey: Number) => {
    console.log('This row opened', rowKey);
  };

  const renderSectionHeader = ({section}) => {
    return <Text style={{paddingLeft: 10}}>{section?.title}</Text>;
  };
  const VisibleItem = props => {
    const {data} = props;
    return (
      <View style={styles.rowFront}>
        <TouchableHighlight style={styles.rowFrontVisible}>
          <View>
            <Text
              style={{
                fontSize: 24,
                paddingHorizontal: 10,
                borderBottomWidth: 1,
                borderBottomColor: 'gray',
                marginHorizontal: 5,
              }}>
              {data?.item?.name}
            </Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  };
  const renderItem = (data, rowMap) => {
    return <VisibleItem data={data} />;
  };
  const HiddenItemWithActionas = props => {
    const {onClose, onDelete} = props;

    return (
      <View style={styles.rowBack}>
        <Text>left</Text>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.backRightBtn, styles.backRightBtnLeft]}>
          <Text>Close</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={onDelete}
          style={[styles.backRightBtn, styles.backRightBtnRight]}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const deleteRow = (rowMap, rowKey) => {
    closeRow(rowMap, rowKey);
    const newData = data;
    const prevIndex = newData.findIndex(item => item.id == rowKey);
    newData.splice(prevIndex, 1);
    console.log('newData----', newData, rowKey);
    setLists(newData);
    getData();
  };
  const closeRow = (rowMap, rowKey) => {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  };
  const renderHiddenItems = (data, rowMap) => {
    return (
      <HiddenItemWithActionas
        data={data}
        rowMap={rowMap}
        onClose={() => closeRow(rowMap, data?.item?.id)}
        onDelete={() => deleteRow(rowMap, data?.item?.id)}
      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%', height: 50}}>
        <SearchBar name="search name" onSearch={searchItems} />
      </View>
      <SwipeListView
        useSectionList
        sections={lists}
        renderSectionHeader={renderSectionHeader}
        disableRightSwipe={true}
        keyExtractor={(item: any) => item?.id}
        renderItem={renderItem}
        renderHiddenItem={renderHiddenItems}
        leftOpenValue={75}
        rightOpenValue={-120}
        previewRowKey={'0'}
        previewOpenValue={-40}
        previewOpenDelay={3000}
        onRowDidOpen={onRowDidOpen}
      />
    </SafeAreaView>
  );
};
export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowFront: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    margin: 5,
    marginBottom: 15,
    shadowColor: '#999',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  rowFrontVisible: {
    backgroundColor: '#FFF',
    borderRadius: 5,
    height: 60,
    padding: 10,
    marginBottom: 15,
  },
  rowBack: {
    alignItems: 'center',
    backgroundColor: '#DDD',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    margin: 5,
    marginBottom: 15,
    borderRadius: 5,
  },
  backRightBtn: {
    alignItems: 'flex-end',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
    paddingRight: 17,
  },
  backRightBtnLeft: {
    backgroundColor: '#1f65ff',
    right: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#666',
  },
  details: {
    fontSize: 12,
    color: '#999',
  },
});
