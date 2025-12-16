import { PublicRoutes } from "./Public";
import { NavigationContainer } from "@react-navigation/native";

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <PublicRoutes />
    </NavigationContainer>
  );
}
