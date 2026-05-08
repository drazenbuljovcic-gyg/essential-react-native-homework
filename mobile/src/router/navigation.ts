import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStaticNavigation } from "@react-navigation/native";
import { HomeScreen } from "../screens/Home";
import { AddLotteryScreen } from "../screens/AddLottery";

const RootStack = createNativeStackNavigator({
  initialRouteName: "Home",
  screens: {
    Home: {
      screen: HomeScreen,
      options: {
        title: "",
      },
    },
    AddLottery: AddLotteryScreen,
  },
});

export const Navigation = createStaticNavigation(RootStack);
