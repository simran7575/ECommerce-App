import { View, Text, StyleSheet, Image } from "react-native";
import { CustomStrings } from "../../../constants/CustomStrings";
import { CustomStyles } from "../../../constants/CustomStyles";

// create a component
const LogoContainer = () => {
  return (
    <View style={CustomStyles.logoContainer}>
      <Image
        source={{ uri: CustomStrings.str10 }}
        style={CustomStyles.logoImage}
      />
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default LogoContainer;
