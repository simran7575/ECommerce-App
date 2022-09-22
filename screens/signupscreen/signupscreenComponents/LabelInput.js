import { View, Text, StyleSheet, TextInput } from "react-native";
import Icon, { Icons } from "../../../components/Icon";
import { Colors } from "../../../constants/CustomColor";
import { CustomStrings } from "../../../constants/CustomStrings";
import { CustomStyles } from "../../../constants/CustomStyles";

// create a component
const LabelInput = ({
  icon,
  value,
  placeholder,
  keyboardType = "default",
  onChangeText,
  isValid,
  secure,
}) => {
  return (
    <View style={CustomStyles.labelcontainer}>
      <View style={CustomStyles.textInputContainerIcon}>
        <Icon
          type={Icons.MaterialCommunityIcons}
          name={icon}
          size={24}
          color={Colors.gray2}
        />
        <TextInput
          style={CustomStyles.textInputIcon}
          value={value}
          placeholder={placeholder}
          placeholderTextColor={Colors.gray2}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secure}
        />
      </View>
      {!isValid && (
        <Text style={CustomStyles.error}>{`Invalid ${placeholder}`}</Text>
      )}
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default LabelInput;
