import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import GeneralStatusBarColor from "./src/components/GeneralStatusBar";
import COLORS from "./src/constants/colors/Colors";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = () => {
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  return (
    <Provider store={store}>
      <NavigationContainer>
        <GeneralStatusBarColor
          backgroundColor={colors.primary}
          barStyle="auto"
        />
        <Navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
