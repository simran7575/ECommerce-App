import { useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import { forgotpassword, validateEmail } from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CustomStrings } from "../../constants/CustomStrings";
import { CustomStyles } from "../../constants/CustomStyles";
import LabelInput from "../signupscreen/signupscreenComponents/LabelInput";

// create a component
const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  async function navigateToVerificationScreen() {
    const isValid = validateEmail(email);

    setIsEmailValid(isValid);
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await forgotpassword(email);
      console.log(response.data);
      if (response.data.success) {
        navigation.navigate("Verification", { email });
      } else {
        Alert.alert(response.data.message, " please try again later!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", " please try again later!");
      setIsLoading(false);
    }
  }

  const updateEmailHandler = (item) => {
    setEmail(item);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={CustomStyles.generalContainer}>
      <View style={CustomStyles.forgotHeaderContainer}>
        <Text style={CustomStyles.headerTitle}>Forgot Password?</Text>
      </View>
      <View style={styles.container}>
        <Text style={CustomStyles.originalTitleLargeCenter}>
          {CustomStrings.str11}
        </Text>
        <Text style={CustomStyles.descriptionTextMediumCenter}>
          {CustomStrings.str12}
        </Text>
        <LabelInput
          icon={"email"}
          value={email}
          placeholder={"Email"}
          keyboardType={"email-address"}
          onChangeText={updateEmailHandler}
          isValid={isEmailValid}
        />

        <View style={CustomStyles.submitButtonOuter}>
          <Pressable
            style={({ pressed }) => [
              CustomStyles.submitButton,
              pressed && CustomStyles.pressed,
            ]}
            onPress={navigateToVerificationScreen}
          >
            <Text style={CustomStyles.submitButtonText}>SEND MAIL</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
  },
});

//make this component available to the app
export default ForgotPassword;
