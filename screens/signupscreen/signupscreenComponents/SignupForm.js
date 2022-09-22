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
import LabelInput from "./LabelInput";

// create a component
const SignupForm = ({ isCredentialsvalid, signUpHandler }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "firstName":
        setFirstName(enteredValue);
        break;
      case "lastName":
        setLastName(enteredValue);
        break;
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
            icon={"account"}
            value={firstName}
            placeholder={"First Name"}
            onChangeText={updateInputValueHandler.bind(this, "firstName")}
            isValid={isCredentialsvalid.firstName}
          />
          <LabelInput
            icon={"account"}
            value={lastName}
            placeholder={"Last Name"}
            onChangeText={updateInputValueHandler.bind(this, "lastName")}
            isValid={isCredentialsvalid.lastName}
          />
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
          <View style={CustomStyles.submitButtonOuter}>
            <Pressable
              style={({ pressed }) => [
                CustomStyles.submitButton,
                pressed && CustomStyles.pressed,
              ]}
              onPress={signUpHandler.bind(
                this,
                firstName,
                lastName,
                email,
                password
              )}
            >
              <Text style={CustomStyles.submitButtonText}>SIGNUP</Text>
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
export default SignupForm;
