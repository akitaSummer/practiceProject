import { createSwitchNavigator } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import { AppStackNavigator } from './AppNavigtors'
import Login from "../pages/Login";

const AuthStack = createStackNavigator(
  {
    Login: {
      screen: Login
    }
  }
)

export default createSwitchNavigator(
  {
    // Auth: AuthStack,
    Auth: {
      screen: AuthStack
    },
    App: {
      screen: AppStackNavigator
    }
  }
)
