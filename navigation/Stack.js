import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateProduct from "../screens/createproduct/CreateProduct";
import ProductDetails from "../screens/productdetails/ProductDetails";
import HomeScreen from "../screens/homescreen/HomeScreen";
import Favourite from "../screens/favouritescreen/Favourite";

const Stack = createNativeStackNavigator();

export function StackNav() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="CreateProduct"
        component={CreateProduct}
        options={{}}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
        options={{}}
      />
      <Stack.Screen name="Favourite" component={Favourite} options={{}} />
    </Stack.Navigator>
  );
}
