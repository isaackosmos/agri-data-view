import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";

import { HomeScreen } from "@/screens/Home";

export type StackRoutesList = {
  home: undefined;
};

export type StackRoutesProps<T extends keyof StackRoutesList> =
  NativeStackScreenProps<StackRoutesList, T>;

const Stack = createNativeStackNavigator<StackRoutesList>();

export function PublicRoutes() {
  return (
    <Stack.Navigator
      initialRouteName="home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="home" component={HomeScreen} />
    </Stack.Navigator>
  );
}
