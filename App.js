import { useState, useEffect, useContext } from "react";
import { StatusBar } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";
import * as Font from "expo-font";
import { fontFamilies } from "./constants/CustomFonts";
import { AuthStack, StackNav } from "./navigation/Stack";
import { Colors } from "./constants/CustomColor";
import CreateContextProvider, {
  FavouritesContext,
} from "./context/favourites-context";
import { getUserDetails } from "./api-services/ApiServices";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

  function Navigation() {
    const favouriteCtx = useContext(FavouritesContext);

    return (
      <NavigationContainer onReady={onNavigationReady}>
        {!favouriteCtx.user.isAuthenticated && <AuthStack />}
        {favouriteCtx.user.isAuthenticated && <StackNav />}
      </NavigationContainer>
    );
  }

  function Root() {
    const [isLogging, setIsLogging] = useState(true);
    const favouriteCtx = useContext(FavouritesContext);
    useEffect(() => {
      let token;
      async function fetchToken() {
        token = await AsyncStorage.getItem("token");

        if (token) {
          const response = await getUserDetails(token);
          if (response.data.success) {
            favouriteCtx.authenticate(token);
            favouriteCtx.addUserDetails(response.data.user);
          } else {
            AsyncStorage.removeItem("token");
          }
        }
        setIsLogging(false);
      }

      fetchToken();
    }, []);

    if (isLogging) {
      return null;
    }

    return <Navigation />;
  }

  if (!appIsReady) {
    return null;
  }

  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor={Colors.black} />
      <CreateContextProvider>
        <Root />
      </CreateContextProvider>
    </>
  );
}
