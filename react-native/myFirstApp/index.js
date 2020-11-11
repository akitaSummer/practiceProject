/**
 * @format
 */

import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import 'react-native-gesture-handler'
import { createAppContainer } from 'react-navigation'
import { AppStackNavigator } from "./navigator/AppNavigtors";
import SwitchNavigator from './navigator/SwitchNavigator'
// import { createStackNavigator } from 'react-navigation-stack'
// import App from './App';
// import FlatListDemo from './pages/FlatListDemo'
// import SectionListDemo from "./pages/SectionListDemo";
//
// const AppRoot = createAppContainer(createStackNavigator({
//   App: {
//     screen: App
//   },
//   FlatListDemo: {
//     screen: FlatListDemo,
//     navigationOptions: {
//       title: 'FlatListDemo'
//     }
//   },
//   SectionListDemo: {
//     screen: SectionListDemo,
//     navigationOptions: {
//       title: 'SectionListDemo'
//     }
//   }
// }))
//
// AppRegistry.registerComponent(appName, () => AppRoot);

// const AppRoot = createAppContainer(AppStackNavigator)

const AppRoot = createAppContainer(SwitchNavigator)

AppRegistry.registerComponent(appName, () => AppRoot);
