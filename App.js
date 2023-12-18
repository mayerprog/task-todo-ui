import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import "react-native-gesture-handler";
import AppStack from "./src/navigation/AppStack";
import { NavigationContainer } from "@react-navigation/native";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </Provider>
  );
}
