import { useRef, useEffect } from "react";
import { StyleSheet, Pressable, View } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as Animatable from "react-native-animatable";
import Icon, { Icons } from "../components/Icon";
import { Colors } from "../constants/CustomColor";
import { StackNav } from "./Stack";
import ProfileScreen from "../screens/profilescreen/ProfileScreen";
import HomeScreen from "../screens/homescreen/HomeScreen";
import CreateProduct from "../screens/createproduct/CreateProduct";
import { CustomStyles } from "../constants/CustomStyles";

const Tab = createBottomTabNavigator();
const CustomTabBarButton = ({ children, onPress }) => (
  <Pressable onPress={onPress} style={CustomStyles.customButtonContainer}>
    <View style={CustomStyles.customButton}>{children}</View>
  </Pressable>
);

function BottomTabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors.pink,
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          height: "7%",
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View styles={styles.bottomtabIcon}>
              <Icon
                type={Icons.Ionicons}
                name="home"
                color={focused ? Colors.pink : Colors.gray2}
                size={26}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="CreateScreen"
        component={CreateProduct}
        options={{
          tabBarIcon: ({ focused }) => (
            // <View styles={styles.bottomtabIcon}>
            <Icon
              type={Icons.Ionicons}
              name="add"
              color={Colors.white}
              size={38}
            />
            // </View>
          ),
          tabBarButton: (props) => <CustomTabBarButton {...props} />,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View styles={styles.bottomtabIcon}>
              <Icon
                type={Icons.MaterialCommunityIcons}
                name="account-circle"
                color={focused ? Colors.pink : Colors.gray2}
                size={26}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomtabIcon: {
    justifyContent: "center",
    alignItems: "center",
    top: 10,
  },
});

export default BottomTabBar;
