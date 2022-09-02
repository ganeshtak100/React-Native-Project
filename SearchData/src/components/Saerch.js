// searchItems = txt => {
//   if (txt == '') {
//     this.onTabPress(
//       this.state.selectedTab,
//       undefined,
//       this.state.selectedFilterStatus,
//     );
//     return;
//   }
//   const res =list.filter(item => {
//     if (
//       name &&
//       String(name)
//         .toLocaleLowerCase()
//         .match(String(txt).trim().toLocaleLowerCase())
//     ) {
//       return true;
//     }
//     return false;
//   });
//   this.setState({
//     my_auction: res,
//   });
// };

{
  /* <SwipeableFlatList
          data={searchData}
          renderItem={({item}) => (
            <View style={{flex: 1}}>
              <Text
                style={{
                  height: 48,
                  backgroundColor: 'gray',
                  borderBottomColor: 'black',
                  borderBottomWidth: 0.5,
                }}>
                {item.label}
              </Text>
            </View>
          )}
          renderLeft={({item}) => (
            <TouchableOpacity onPress={() => DeleteName(item)}>
              <Text style={{width: 30, backgroundColor: 'red'}}>
                {item.leftLabel}
              </Text>
            </TouchableOpacity>
          )}
          renderRight={({item}) => (
            <Text style={{width: 100}}>{item.rightLabel}</Text>
          )}
          backgroundColor={'white'}
        /> */
}

// console.log('swiable items daya--', label),
// <View style={styles.itemContainer}>
//   <Swipeable rightButtons={renderRightButtons()} rightButtonWidth={75}>
//     <View style={styles.swipeable}>
//       <Text style={styles.text}>{label}</Text>
//     </View>
//   </Swipeable>
// </View>
