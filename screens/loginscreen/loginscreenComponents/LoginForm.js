import { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ScrollView,
  SafeAreaView,
} from "react-native";
import { CustomStyles } from "../../../constants/CustomStyles";
import LabelInput from "../../signupscreen/signupscreenComponents/LabelInput";

// create a component
const LoginForm = ({
  isCredentialsvalid,
  loginHandler,
  forgotPasswordHandler,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "email":
        setEmail(enteredValue);
        break;
      case "password":
        setPassword(enteredValue);
        break;
    }
  }
  return (
    <SafeAreaView style={CustomStyles.generalContainer}>
      <ScrollView
        style={CustomStyles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View style={CustomStyles.generalContainerCenter}>
          <LabelInput
            icon={"email"}
            value={email}
            placeholder={"Email"}
            keyboardType={"email-address"}
            onChangeText={updateInputValueHandler.bind(this, "email")}
            isValid={isCredentialsvalid.email}
          />
          <LabelInput
            icon={"lock"}
            value={password}
            placeholder={"Password"}
            onChangeText={updateInputValueHandler.bind(this, "password")}
            isValid={isCredentialsvalid.password}
            secure
          />
          <Pressable
            style={CustomStyles.forgotPasswordContainer}
            onPress={forgotPasswordHandler}
          >
            <Text style={CustomStyles.forgotPasswordText}>
              Forgot Password?
            </Text>
          </Pressable>

          <View
            style={[CustomStyles.submitButtonOuter, { marginVertical: 62 }]}
          >
            <Pressable
              style={({ pressed }) => [
                CustomStyles.submitButton,
                pressed && CustomStyles.pressed,
              ]}
              onPress={loginHandler.bind(this, email, password)}
            >
              <Text style={CustomStyles.submitButtonText}>LOGIN</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default LoginForm;
