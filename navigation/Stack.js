import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProduct from "../screens/createproduct/CreateProduct";
import ProductDetails from "../screens/productdetails/ProductDetails";
import HomeScreen from "../screens/homescreen/HomeScreen";
import Favourite from "../screens/favouritescreen/Favourite";
import SignupScreen from "../screens/signupscreen/SignupScreen";
import LoginScreen from "../screens/loginscreen/LoginScreen";
import ForgotPassword from "../screens/forgotpassword/ForgotPassword";
import VerificationScreen from "../screens/verificationScreen/VerificationScreen";
import ConfirmPassword from "../screens/confirmpassword/ConfirmPassword";
import BottomTabBar from "./BottomTabs";

const Stack = createNativeStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="ConfirmPassword" component={ConfirmPassword} />
    </Stack.Navigator>
  );
}

export function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BottomTab"
        component={BottomTabBar}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      {/* <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{}}
      /> */}

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{}}
      />
      <Stack.Screen name="Favourite" component={Favourite} options={{}} />
    </Stack.Navigator>
  );
}
