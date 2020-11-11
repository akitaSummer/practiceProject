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

const HomePage = (props): React$Node => {

  const { navigation } = props

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 40 }}>
      <Text style={styles.text}>Welcome HomePage</Text>
      <Button
        title={'go to page1'}
        onPress={() => {
          navigation.navigate('Page1', { name: 'name' })
        }}
      />
      <Button
        title={'go to page2'}
        onPress={() => {
          navigation.navigate('Page2')
        }}
      />
      <Button
        title={'go to page3'}
        onPress={() => {
          navigation.navigate('Page3')
        }}
      />
      <Button
        title={'顶部导航器'}
        onPress={() => {
          navigation.navigate('MaterialTopTabNavigator')
        }}
      />
      <Button
        title={'底部导航器'}
        onPress={() => {
          navigation.navigate('BottomTabNavigator')
        }}
      />
      <Button
        title={'DrawerNav'}
        onPress={() => {
          navigation.navigate('DrawerNav')
        }}
      />
    </View>
  )
}

HomePage.navigationOptions = {
  title: 'Home',
  headerBackTitle: 'back'
}

export default HomePage
