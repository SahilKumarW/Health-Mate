import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import { v4 as uuidv4 } from 'uuid';
import RemoteConfig from "@react-native-firebase/remote-config";
import 'react-native-get-random-values';
import { FONTS } from "./constants/fonts";
import { useCallback } from "react";
import { Login, Signup, Welcome } from "./screens";
import { Provider } from "react-redux";
import { store } from "./store/store";
import Home from "./screens/Home";
import ConsultDoctor from "./screens/ConsultDoctor";
import DiseasePrediction from "./screens/DiseasePrediction";
// import HealthNews from "./screens/HealthNews";
import OrderMedicine from "./screens/OrderMedicine";
import { RecoilRoot } from "recoil";
import HealthNewsScreen from "./screens/HealthNews";
import DiseasePredictionScreen from "./screens/DiseasePrediction";
import Drawer from "./components/Drawer";
const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts(FONTS);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <RecoilRoot>
      <Provider store={store}>
        <SafeAreaProvider onLayout={onLayoutRootView}>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Welcome"
            >
              <Stack.Screen name="Welcome" component={Welcome} />
              <Stack.Screen name="Login" component={Login} />
              <Stack.Screen name="Signup" component={Signup} />
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen
                name="HealthNewsScreen"
                component={HealthNewsScreen}
              />

              <Stack.Screen
                name="DiseasePredictionScreen"
                component={DiseasePredictionScreen}
              />
              <Stack.Screen name="ConsultDoctor" component={ConsultDoctor} />
              <Stack.Screen name="Drawer" component={Drawer} />
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </Provider>
    </RecoilRoot>
  );
}
