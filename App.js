import { NavigationContainer } from "@react-navigation/native";
import Navigation from "./src/navigation/Navigation";
import GeneralStatusBarColor from "./src/components/GeneralStatusBar";
import COLORS from "./src/constants/colors/Colors";

const App = () => {
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  return (
    <NavigationContainer>
      <GeneralStatusBarColor backgroundColor={colors.primary} barStyle="auto" />
      <Navigation />
    </NavigationContainer>
  );
};

export default App;
