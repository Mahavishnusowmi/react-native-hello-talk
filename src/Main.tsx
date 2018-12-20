import * as React from "react";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import * as firebase from "firebase";
import { Constants } from "expo";
import { MenuProvider } from "react-native-popup-menu";
import { Provider } from "react-redux";
import { ChatScreen, FeedScreen, AuthScreen } from "screens";
import configureStore from "store";
import { colors } from "theme";

firebase.initializeApp(Constants.manifest.extra!.firebaseConfig);

const MainFlow = createBottomTabNavigator(
  {
    Chat: ChatScreen,
    Feed: FeedScreen
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }: any) => {
        const { routeName } = navigation.state;
        let iconName = "";

        if (routeName === "Chat") {
          iconName = `message${focused ? "" : "-outline"}`;
        } else if (routeName === "Feed") {
          iconName = "earth";
        }

        return (
          <MaterialCommunityIcons
            name={iconName}
            size={horizontal ? 20 : 25}
            color={tintColor}
          />
        );
      }
    }),
    tabBarOptions: {
      activeTintColor: colors.primary,
      inactiveTintColor: colors.gray
    },
    initialRouteName: "Chat"
  }
);

const App = createStackNavigator(
  {
    Auth: AuthScreen,
    Main: MainFlow
  },
  {
    initialRouteName: "Auth",
    headerMode: "none"
  }
);

const store = configureStore();

export default () => {
  return (
    <Provider store={store}>
      <MenuProvider>
        <App />
      </MenuProvider>
    </Provider>
  );
};
