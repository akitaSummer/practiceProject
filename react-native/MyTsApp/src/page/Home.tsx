import React from 'react'
import { View, Text, Button } from 'react-native'
import { BottomTabNavigation } from '../navigator/BottomTabs'

interface Iprops {
  navigation: BottomTabNavigation
}

const Home: React.FC<Iprops> = (props) => {
  const { navigation } = props

  const onPress = () => {
    navigation.navigate('Found')
  }

  return (
    <View>
      <Text>Home</Text>
      <Button title={'to Found'} onPress={onPress} />
    </View>
  )
}

export default Home
