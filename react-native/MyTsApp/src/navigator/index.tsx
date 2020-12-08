import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  StackNavigationProp
} from "@react-navigation/stack";
import BottomTabs from "./BottomTabs";
import Detail from "../page/Detail";
import {Platform, StyleSheet} from "react-native";

export type RootStackParamList = {
  BottomTabs: {
    screen?: string
  },
  Detail: {
    id: number
  }
}

export type RootStackNavigation = StackNavigationProp<RootStackParamList>

const Stack = createStackNavigator<RootStackParamList>()

const Navigator: React.FC<RootStackParamList> = (props) => {
  console.log(props)
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyleInterpolator: HeaderStyleInterpolators.forUIKit,
          cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
          gestureEnabled: true,
          gestureDirection: 'horizontal',
          headerStyle: {
            ...Platform.select({
              android: {
                elevation: 0,
                borderBottomWidth: StyleSheet.hairlineWidth
              }
            })
          }
        }}
        headerMode={'float'}
      >
        <Stack.Screen
          name='BottomTabs'
          component={BottomTabs}
          options={{
            headerTitleAlign: 'center',
            headerTitle: '首页',
          }}
        />
        <Stack.Screen
          name='Detail'
          component={Detail}
          options={{ headerTitle: 'Detail' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
