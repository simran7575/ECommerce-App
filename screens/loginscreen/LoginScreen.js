import { useNavigation } from "@react-navigation/native";
import { useContext, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  KeyboardAvoidingView,
  Alert,
} from "react-native";
import {
  login,
  validateEmail,
  validatePassword,
} from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CustomStyles } from "../../constants/CustomStyles";
import { FavouritesContext } from "../../context/favourites-context";
import LogoContainer from "../signupscreen/signupscreenComponents/LogoContainer";
import LoginForm from "./loginscreenComponents/LoginForm";

// create a component
const LoginScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCredentialsvalid, setIsCredentialsvalid] = useState({
    email: true,
    password: true,
  });

  const navigation = useNavigation();
  const favouriteCtx = useContext(FavouritesContext);

  const switchToLogin = () => {
    navigation.replace("Signup");
  };

  async function forgotPasswordHandler() {
    navigation.navigate("ForgotPassword");
  }

  async function loginHandler(email, password) {
    const isEmailValid = validateEmail(email);
    //const isPasswordValid = validatePassword(password);
    setIsCredentialsvalid({
      email: isEmailValid,
      password: true,
    });

    if (!isEmailValid) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await login(email, password);
      console.log(response.data);
      if (response.data.success) {
        favouriteCtx.authenticate(response.data.token);
        favouriteCtx.addUserDetails(response.data.user);
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
    return <LoadingOverlay />;
  }

  return (
    <KeyboardAvoidingView
      style={CustomStyles.generalContainer}
      behavior="height"
    >
      <LogoContainer />
      <View style={CustomStyles.inputContainers}>
        <View style={CustomStyles.loginSignupButton}>
          <Pressable style={CustomStyles.signupButton} onPress={switchToLogin}>
            <Text style={CustomStyles.signupText}>SIGNUP</Text>
          </Pressable>
          <Pressable style={CustomStyles.signupButtonFocused}>
            <Text style={CustomStyles.signupTextFocused}>LOGIN</Text>
          </Pressable>
        </View>
        <LoginForm
          isCredentialsvalid={isCredentialsvalid}
          loginHandler={loginHandler}
          forgotPasswordHandler={forgotPasswordHandler}
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
export default LoginScreen;
