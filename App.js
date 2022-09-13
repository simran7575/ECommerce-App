import { useState, useEffect, useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { fontFamilies } from "./constants/CustomFonts";
import { StackNav } from "./navigation/Stack";
import { Colors } from "./constants/CustomColor";
import CreateContextProvider from "./context/favourites-context";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync(fontFamilies);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        //await SplashScreen.hideAsync();
      }
    }

    prepare();
  }, []);

  async function onNavigationReady() {
    await SplashScreen.hideAsync(); // just hide the splash screen after navigation ready
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <CreateContextProvider>
        <NavigationContainer onReady={onNavigationReady}>
          <StackNav />
        </NavigationContainer>
      </CreateContextProvider>
    </>
  );
}
