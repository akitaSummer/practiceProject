import React, {useEffect} from 'react'
import { TabNavigationState, RouteProp } from '@react-navigation/native'
import { createBottomTabNavigator, BottomTabNavigationProp } from "@react-navigation/bottom-tabs"
import Home from "../page/Home";
import Found from "../page/Found";
import Account from "../page/Account";
import Listen from "../page/Listen";
import {RootStackNavigation, RootStackParamList} from "./index";

export type BottomTabParamList = {
  Home: undefined,
  Listen: undefined,
  Found: undefined,
  Account: undefined
}

export type BottomTabNavigation = BottomTabNavigationProp<BottomTabParamList>

type Route = RouteProp<RootStackParamList, 'BottomTabs'> & {
  state?: TabNavigationState<BottomTabParamList>
};

interface Iprops {
  navigation: RootStackNavigation,
  route: Route
}

const Tab = createBottomTabNavigator<BottomTabParamList>()

const BottomTabs: React.FC<Iprops> = (props) => {

  const { navigation, route } = props

  const getHeaderTitle = (route: Route) => {
    return route.state ? route.state.routes[route.state.index].name : route.params?.screen || 'Home'
  }

  useEffect(
    () => {
      navigation.setOptions({
        headerTitle: getHeaderTitle(route)
      })
    }
  , [props])

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#f86442'
      }}
    >
      <Tab.Screen
        name={'Home'}
        component={Home}
        options={{
          tabBarLabel: '首页'
        }}
      />
      <Tab.Screen
        name={'Listen'}
        component={Listen}
        options={{
          tabBarLabel: '我听'
        }}
      />
      <Tab.Screen
        name={'Found'}
        component={Found}
        options={{
          tabBarLabel: '发现'
        }}
      />
      <Tab.Screen
        name={'Account'}
        component={Account}
        options={{
          tabBarLabel: '我的'
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomTabs
