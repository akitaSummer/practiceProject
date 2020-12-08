import React from 'react'
import { View, Text, Button } from 'react-native'
import { RootStackNavigation } from '../navigator'

interface Iprops {
  navigation: RootStackNavigation
}

const Found: React.FC<Iprops> = (props) => {
  const { navigation } = props

  const onPress = () => {
    navigation.navigate('Detail', {
      id: 100,
    })
  }

  return (
    <View>
      <Text>Found</Text>
      <Button title={'to Detail'} onPress={onPress} />
    </View>
  )
}

export default Found
