import { useContext, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert } from "react-native";
import {
  resetPassword,
  validatePassword,
} from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { CustomStyles } from "../../constants/CustomStyles";
import { FavouritesContext } from "../../context/favourites-context";
import LabelInput from "../signupscreen/signupscreenComponents/LabelInput";

// create a component
const ConfirmPassword = ({ navigation, route }) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isEqual, setIsEqual] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const email = route.params.email;
  const favouriteCtx = useContext(FavouritesContext);

  const updatePasswordHandler = (item) => {
    setPassword(item);
  };
  const updateConfirmPasswordHandler = (item) => {
    setConfirmPassword(item);
  };

  async function changePasswordHandler() {
    const isPswdValid = validatePassword(password);
    const isCnfrmPswdValid = validatePassword(confirmPassword);

    setIsPasswordValid(isPswdValid);
    setIsConfirmPasswordValid(isCnfrmPswdValid);
    const isEql = password == confirmPassword;
    setIsEqual(isEql);
    if (!isPswdValid || !isCnfrmPswdValid || !isEql) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await resetPassword(password, email);
      //   console.log(response.data);
      if (response.data.success) {
        favouriteCtx.authenticate(response.data.token);
        favouriteCtx.addUserDetails(response.data.user);
      } else {
        //setIsOtpValid(false)
        Alert.alert("Error!", " please try again later!");
        setIsLoading(false);
        return;
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Error!", " please try again later!");
      setIsLoading(false);
    }
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  return (
    <View
      style={[
        CustomStyles.generalContainer,
        { paddingHorizontal: 24, justifyContent: "center" },
      ]}
    >
      <LabelInput
        icon={"lock"}
        value={password}
        placeholder={"Password"}
        onChangeText={updatePasswordHandler}
        isValid={isPasswordValid}
        secure
      />
      <LabelInput
        icon={"lock"}
        value={confirmPassword}
        placeholder={" Confirm Password"}
        onChangeText={updateConfirmPasswordHandler}
        isValid={isConfirmPasswordValid}
        secure
      />
      <View style={CustomStyles.submitButtonOuter}>
        <Pressable
          style={({ pressed }) => [
            CustomStyles.submitButton,
            pressed && CustomStyles.pressed,
          ]}
          onPress={changePasswordHandler}
        >
          <Text style={CustomStyles.submitButtonText}>SUBMIT</Text>
        </Pressable>
      </View>
      {!isEqual && (
        <Text
          style={CustomStyles.error}
        >{`Password and Confirm Password are not equal`}</Text>
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
export default ConfirmPassword;
