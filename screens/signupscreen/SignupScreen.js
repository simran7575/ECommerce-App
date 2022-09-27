import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Alert,
  Platform,
  StatusBar,
  Dimensions,
} from "react-native";
import {
  signUp,
  validateEmail,
  validateNamesChars,
  validatePassword,
} from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CustomStyles } from "../../constants/CustomStyles";
import { FavouritesContext } from "../../context/favourites-context";
import LogoContainer from "./signupscreenComponents/LogoContainer";
import SignupForm from "./signupscreenComponents/SignupForm";

// create a component
const SignupScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const [isCredentialsvalid, setIsCredentialsvalid] = useState({
    firstName: true,
    lastName: true,
    email: true,
    password: true,
  });

  const navigation = useNavigation();
  const favouriteCtx = useContext(FavouritesContext);

  const switchToLogin = () => {
    navigation.replace("Login");
  };

  async function signUpHandler(firstName, lastName, email, password) {
    const isFirstNameValid = validateNamesChars(firstName);
    const isLastNameValid = validateNamesChars(lastName);
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    setIsCredentialsvalid({
      firstName: isFirstNameValid,
      lastName: isLastNameValid,
      email: isEmailValid,
      password: isPasswordValid,
    });

    if (
      !isFirstNameValid ||
      !isEmailValid ||
      !isLastNameValid ||
      !isPasswordValid
    ) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await signUp(firstName, lastName, email, password);
      if (response.data.success) {
        favouriteCtx.authenticate(response.data.token);
        favouriteCtx.addUserDetails(response.data.userCreate);
      } else {
        Alert.alert(response.data.message, " please try again later!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Authentication Failed!", " please try again later!");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay message="Signing Up..." />;
  }

  return (
    <KeyboardAvoidingView
      style={{
        height:
          Platform.OS === "android"
            ? Dimensions.get("window").height - StatusBar.currentHeight
            : "100%",
      }}
      behavior="height"
      keyboardVerticalOffset={100}
    >
      <LogoContainer />
      <View style={CustomStyles.inputContainers}>
        <View style={CustomStyles.loginSignupButton}>
          <Pressable style={CustomStyles.signupButtonFocused}>
            <Text style={CustomStyles.signupTextFocused}>SIGNUP</Text>
          </Pressable>
          <Pressable style={CustomStyles.signupButton} onPress={switchToLogin}>
            <Text style={CustomStyles.signupText}>LOGIN</Text>
          </Pressable>
        </View>
        <SignupForm
          isCredentialsvalid={isCredentialsvalid}
          signUpHandler={signUpHandler}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {},
});

//make this component available to the app
export default SignupScreen;
