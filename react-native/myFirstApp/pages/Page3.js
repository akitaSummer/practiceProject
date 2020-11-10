/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput
} from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  },
  input: {
    height: 50,
    borderWidth: 1,
    marginTop: 10,
    borderColor: 'black'
  },
  showText: {
    marginTop: 20,
    fontSize: 20,
    color: 'red'
  }
})

const Page3 = (props): React$Node => {

  const { navigation } = props

  const { state, setParams } = navigation

  const { params } = state

  const showText = params?.mode === 'edit' ? 'editing' : 'edited'

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 40 }}>
      <Text style={styles.text}>welcome page3</Text>
      <Text style={styles.showText}>{ showText }</Text>
      <Button
        title={'go back'}
        onPress={() => {
          navigation.goBack()
        }}
      />
      <TextInput
        style={styles.input}
        onChangeText={(text) => {
          setParams({ name: text })
        }}
      />
      <Button
        title={'go to page2'}
        onPress={() => {
          navigation.navigate('Page2')
        }}
      />
    </View>
  )
}

export default Page3
