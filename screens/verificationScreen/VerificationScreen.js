import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Alert,
  TextInput,
} from "react-native";
import { validateCode, verifyOtp } from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CustomStrings } from "../../constants/CustomStrings";
import { CustomStyles } from "../../constants/CustomStyles";

// create a component
const VerificationScreen = ({ navigation, route }) => {
  const [otp, setOtp] = useState("");
  const [isOtpValid, setIsOtpValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const email = route.params.email;

  async function navigateToConfirmPasswordScreen() {
    const isValid = validateCode(otp);

    setIsOtpValid(isValid);
    if (!isValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await verifyOtp(otp);

      if (response.data.success) {
        navigation.navigate("ConfirmPassword", { email });
      } else {
        setIsOtpValid(false);
        //Alert.alert(response.data.message, " please try again later!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", " please try again later!");
      setIsLoading(false);
    }
  }

  const updateOtpHandler = (item) => {
    setOtp(item);
  };

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View style={CustomStyles.generalContainer}>
      <View style={CustomStyles.forgotHeaderContainer}>
        <Text style={CustomStyles.headerTitle}>Verification</Text>
      </View>
      <View style={styles.container}>
        <Text style={CustomStyles.originalTitleLargeCenter}>
          {CustomStrings.str13}
        </Text>
        <TextInput
          style={CustomStyles.otpInput}
          keyboardType="number-pad"
          autoComplete="off"
          value={otp}
          onChangeText={updateOtpHandler}
        />
        {!isOtpValid && <Text style={CustomStyles.error}>{`Invalid Otp`}</Text>}
        <View style={CustomStyles.submitButtonOuter}>
          <Pressable
            style={({ pressed }) => [
              CustomStyles.submitButton,
              pressed && CustomStyles.pressed,
            ]}
            onPress={navigateToConfirmPasswordScreen}
          >
            <Text style={CustomStyles.submitButtonText}>VERIFY</Text>
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
export default VerificationScreen;
