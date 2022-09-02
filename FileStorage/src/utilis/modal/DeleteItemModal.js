import { View, Text,Modal, TouchableOpacity } from 'react-native'
import React from 'react'

export default function DeleteItemModal({cancelOnPress,deleteOnPress}) {
  return (
    <View>
      <Modal>
        <View>
            <Text>This item will be Deleted</Text>
            <View>
            <TouchableOpacity><Text>CANCEL</Text></TouchableOpacity>
            <TouchableOpacity><Text>DELETE</Text></TouchableOpacity>
            </View>
        </View>
      </Modal>
    </View>
  )
}