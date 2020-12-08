import React from 'react'
import { View, Text, Button } from 'react-native'
import { RootStackNavigation } from '../navigator'

interface Iprops {
  navigation: RootStackNavigation
}

const Account: React.FC<Iprops> = (props) => {
  const { navigation } = props

  const onPress = () => {
    navigation.navigate('Detail', {
      id: 100,
    })
  }

  return (
    <View>
      <Text>Account</Text>
      <Button title={'to Detail'} onPress={onPress} />
    </View>
  )
}

export default Account
