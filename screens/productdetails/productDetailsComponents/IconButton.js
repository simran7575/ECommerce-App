import { StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

// create a component
function IconButton({ name, size, color, backgroundColor, onPress }) {
  return (
    <Pressable
      style={[styles.iconContainer, { backgroundColor: backgroundColor }]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}

// define your styles
const styles = StyleSheet.create({
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#e6e5e3",
    alignItems: "center",
    justifyContent: "center",
  },
});

//make this component available to the app
export default IconButton;
