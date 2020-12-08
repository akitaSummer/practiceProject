/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react'
import { Button, View, Text, StyleSheet } from 'react-native'
import { DrawerActions } from "react-navigation-drawer";

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'white'
  }
})

const page4 = (props) => {

  const { navigation } = props

  /*
  * navigation.openDrawer()
  * navigation.closeDrawer()
  * navigation.toggleDrawer()
  * or
  * navigation.dispatch(DrawerActions.openDrawer())
  * navigation.dispatch(DrawerActions.closeDrawer())
  * navigation.dispatch(DrawerActions.toggleDrawer())
  * */

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 40 }}>
      <Text style={styles.text}>welcome page4</Text>
      <Button
        title={'Open Drawer'}
        onPress={() => {
          navigation.dispatch(DrawerActions.openDrawer())
        }}
      />
      <Button
        title={'Toggle'}
        onPress={() => {
          navigation.toggleDrawer()
        }}
      />
      <Button
        title={'go to page5'}
        onPress={() => {
          navigation.navigate('Page5')
        }}
      />
    </View>
  )
}

export default page4
