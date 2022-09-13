import { View, StyleSheet } from "react-native";
import { Colors } from "../constants/CustomColor";

// create a component
function Divider({ style }) {
  return <View style={[styles.divider, { ...style }]}>{}</View>;
}

// define your styles
const styles = StyleSheet.create({
  divider: {
    backgroundColor: Colors.gray1,
    width: "100%",
    height: 10,
  },
});

//make this component available to the app
export default Divider;
