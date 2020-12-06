import React from 'react'
import {
  Button,
  Text,
  View,
  ScrollView
} from 'react-native'
import { createStackNavigator } from "react-navigation-stack";
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator, DrawerNavigatorItems } from 'react-navigation-drawer'
import { SafeAreaView } from "react-navigation";
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import HomePage from '../pages/HomePage'
// import SwitchNavigator from "./SwitchNavigator";
import Page1 from '../pages/Page1'
import Page2 from '../pages/Page2'
import Page3 from '../pages/Page3'
import Page4 from '../pages/Page4'
import Page5 from '../pages/Page5'

const DrawerNav = createDrawerNavigator(
  {
    Page4: {
      screen: Page4,
      navigationOptions: {
        drawerLabel: 'Page4',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <MaterialIcons
              name={'drafts'}
              size={24}
              style={{ color: tintColor }}
            />
          )
        }
      }
    },
    Page5: {
      screen: Page5,
      navigationOptions: {
        drawerLabel: 'Page5',
        drawerIcon: ({ tintColor, focused }) => {
          return (
            <MaterialIcons
              name={'move-to-inbox'}
              size={24}
              style={{ color: tintColor }}
            />
          )
        }
      }
    }
  },
  {
    contentComponent: (props) => { // 自定义侧拉抽屉
      return (
        <ScrollView style={{ backgroundColor: '#098', flex: 1 }}>
          <SafeAreaView
            forceInset={{ top: 'always' }} // 适配全面屏
          >
            <DrawerNavigatorItems
              {
                ...props
              }
            />
          </SafeAreaView>
        </ScrollView>
      )
    },
    contentOptions: {
      activeTintColor: 'white'
    }
  }
)

const MaterialTopTabNavigator = createMaterialTopTabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'Page1'
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: ({ tintColor, focused }) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: focused ? 'orange': 'grey', fontSize: 12 }}>Page2</Text>
            </View>

          )
        }
      }
    },
    Page3: {
      screen: Page3,
      navigationOptions: {
        tabBarLabel: 'Page3',
      }
    }
  },
  {
    tabBarOptions: {
      tabStyle: {
        minWidth: 50
      },
      upperCaseLabel: false,
      style: { // tab样式
        backgroundColor: '#879'
      },
      indicatorStyle: { // 下划线
        height: 2,
        backgroundColor: 'white'
      },
      labelStyle: { // 文字的样式
        fontSize: 13,
        marginTop: 6,
        marginBottom: 6
      },
    }
  }
)

const BottomTabNavigator = createBottomTabNavigator(
  {
    Page1: {
      screen: Page1,
      navigationOptions: {
        tabBarLabel: 'Page1',
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={'ios-home'}
              size={26}
              style={{ color: tintColor }}
            />
          )
        }
      }
    },
    Page2: {
      screen: Page2,
      navigationOptions: {
        tabBarLabel: ({ tintColor, focused }) => {
          return (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Text style={{ color: focused ? 'orange': 'grey', fontSize: 12 }}>Page2</Text>
            </View>

          )
        },
        tabBarIcon: ({ tintColor, focused }) => {
          return (
            <Ionicons
              name={'ios-people'}
              size={26}
              style={{ color: focused ? 'orange': 'grey' }}
            />
          )
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: 'red'
    }
  }
)

export const AppStackNavigator = createStackNavigator( // 堆栈导航器
  {
    Home: {
      screen: HomePage
    },
    MaterialTopTabNavigator: {
      screen: MaterialTopTabNavigator,
      navigationOptions: {
        title: '顶部导航器'
      }
    },
    BottomTabNavigator: {
      screen: BottomTabNavigator,
      navigationOptions: {
        title: '底部导航器',
        header: null
      }
    },
    DrawerNav,
    // SwitchNavigator,
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
