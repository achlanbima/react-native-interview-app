import Register from './screens/register'
import Home from './screens/home'
import Interview from './screens/interview'
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation'

const AppStack = createStackNavigator(
  {
      register: {
          screen: Register,
          navigationOptions: { gesturesEnabled: true, header: null }
      },
      home: {
          screen: Home,
          navigationOptions: { gesturesEnabled: true, header: null }
      },
      interview: {
          screen: Interview,
          navigationOptions: { gesturesEnabled: true, header: null }
      },
  },
  {
      defaultNavigationOptions: {
          initialRouteName: Home,
          resetOnBlur: true,
      }
  }
);

const AppContainer = createAppContainer(createSwitchNavigator(
  {
      App: AppStack
  },
  {
      initialRouteName: 'App',
      resetOnBlur: true,
  }
));

export default createAppContainer(AppContainer);