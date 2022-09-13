import { Image, StyleSheet } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Colors } from "../constants/Color";
import HomeScreen from "../screens/homescreen/HomeScreen";
import CustomDrawer from "./CustomDrawer";
import BookingHistory from "../screens/bookinghistoryscreen/BookingHistoryScreen";

const Drawer = createDrawerNavigator();

function DrawerNavigation() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawer {...props} />}
      screenOptions={{
        headerShown: true,
        headerTransparent: true,
        headerTintColor: Colors.white,

        headerTitleStyle: {
          fontSize: 22,
          fontFamily: "poppins-regular",
          textAlign: "left",
          textAlignVertical: "center",
          includeFontPadding: false,
        },
        headerLeftContainerStyle: { paddingHorizontal: 18 },
        drawerActiveBackgroundColor: Colors.appBackground,
        drawerActiveTintColor: Colors.black,
        drawerInactiveTintColor: Colors.black,
        drawerLabelStyle: {
          fontSize: 18,
          fontFamily: "poppins-regular",
        },
        drawerStyle: {
          width: 330,
          backgroundColor: Colors.appBackground,
        },
      }}
    >
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Image
              source={require("../assets/icons/home.png")}
              style={styles.icon}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
    marginLeft: 18,
  },
});

export default DrawerNavigation;
