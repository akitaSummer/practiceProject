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

const Login = (props): React$Node => {

  const { navigation } = props

  return (
    <View style={{ flex: 1, backgroundColor: 'gray', padding: 40 }}>
      <Text style={styles.text}>Login</Text>
      <Button
        title={'sign in'}
        onPress={() => {
          navigation.navigate('App')
        }}
      />
    </View>
  )
}

export default Login
