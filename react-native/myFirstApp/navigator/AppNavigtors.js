import React from 'react'
import {
  Button
} from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import HomePage from '../pages/HomePage'
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'

export const AppStackNavigator = createStackNavigator(
  {
    HomePage: {
      screen: HomePage
    },
    Page1: {
      screen: Page1,
      navigationOptions: ({ navigation }) => {
        return {
          title: `${navigation.state.params?.name}`
        }
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        title: 'Page2',
        header: null
      }
    },
    Page3: {
      screen: Page3,
      navigationOptions: (props) => {
        const { navigation } = props
        const { state, setParams } = navigation
        const { params = {} } = state
        return {
          title: params.name? params.name : "This is Page3",
          headerRight: (
            <Button
              title={ params.mode === 'edit' ? '保存' : '编辑'}
              onPress={() => {
                setParams({
                  mode: params.mode === 'edit' ? "" : "edit"
                })
              }}
            />
          )
        }
      }
    },
  },
  { // 设置导航属性
    defaultNavigationOptions: { // 设置默认全局导航属性
      // header: null, // 可隐藏全局navigationBar
    }
  }
)
