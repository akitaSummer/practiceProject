/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  }
})

const Page2 = (props): React$Node => {

  const { navigation } = props

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 40 }}>
      <Text style={styles.text}>welcome page2</Text>
      <Button
        title={'go back'}
        onPress={() => {
          navigation.goBack()
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

export default Page2
