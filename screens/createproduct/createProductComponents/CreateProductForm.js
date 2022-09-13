import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Button,
  Alert,
} from "react-native";
import { Colors } from "../../../constants/CustomColor";
import { CustomStrings } from "../../../constants/CustomStrings";
import { CustomStyles } from "../../../constants/CustomStyles";
import CategoryList from "../../homescreen/homeScreenComponents/CategoryList";

const CreateProductForm = ({
  categories,
  productIsvalid,
  createProductHandler,
}) => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState();
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("Electronics");

  const updateCategory = (name) => {
    updateInputValueHandler("category", name);
  };

  useEffect(() => {
    return () => {
      setTitle("");
      setPrice();
      setCategory("Electronics");
      setDescription("");
      setImage("");
    };
  }, []);
  function updateInputValueHandler(inputType, enteredValue) {
    switch (inputType) {
      case "title":
        setTitle(enteredValue);
        break;
      case "price":
        setPrice(enteredValue);
        break;
      case "description":
        setDescription(enteredValue);
        break;
      case "image":
        setImage(enteredValue);
        break;
      case "category":
        setCategory(enteredValue);
        break;
    }
  }

  return (
    <>
      <View style={CustomStyles.labelcontainer}>
        <Text style={CustomStyles.labeltext}>{CustomStrings.str04}</Text>
        <TextInput
          style={CustomStyles.textInput}
          value={title}
          placeholder={CustomStrings.str04}
          placeholderTextColor={Colors.gray2}
          onChangeText={updateInputValueHandler.bind(this, "title")}
        />
        {!productIsvalid.title && (
          <Text
            style={CustomStyles.error}
          >{`Invalid ${CustomStrings.str04}`}</Text>
        )}
      </View>
      <View style={CustomStyles.labelcontainer}>
        <Text style={CustomStyles.labeltext}>{CustomStrings.str05}</Text>
        <TextInput
          style={CustomStyles.textInput}
          keyboardType="decimal-pad"
          value={price}
          placeholder={CustomStrings.str05}
          placeholderTextColor={Colors.gray2}
          onChangeText={updateInputValueHandler.bind(this, "price")}
        />
        {!productIsvalid.price && (
          <Text
            style={CustomStyles.error}
          >{`Invalid ${CustomStrings.str05}`}</Text>
        )}
      </View>
      <View style={CustomStyles.labelcontainer}>
        <Text style={CustomStyles.labeltext}>{CustomStrings.str06}</Text>
        <TextInput
          style={CustomStyles.textInput}
          value={description}
          placeholder={CustomStrings.str06}
          placeholderTextColor={Colors.gray2}
          onChangeText={updateInputValueHandler.bind(this, "description")}
        />
        {!productIsvalid.description && (
          <Text
            style={CustomStyles.error}
          >{`Invalid ${CustomStrings.str06}`}</Text>
        )}
      </View>
      <View style={CustomStyles.labelcontainer}>
        <Text style={CustomStyles.labeltext}>{CustomStrings.str07}</Text>
        <TextInput
          style={CustomStyles.textInput}
          value={image}
          placeholder={CustomStrings.str07}
          placeholderTextColor={Colors.gray2}
          onChangeText={updateInputValueHandler.bind(this, "image")}
        />
        {!productIsvalid.image && (
          <Text
            style={CustomStyles.error}
          >{`Invalid ${CustomStrings.str07}`}</Text>
        )}
      </View>
      <View style={CustomStyles.labelcontainer}>
        <Text style={CustomStyles.labeltext}>{CustomStrings.str08}</Text>
        <View style={CustomStyles.categoryListContainerShort}>
          <CategoryList
            data={categories}
            selectCategory={updateCategory}
            selectedItem={category}
          />
        </View>
      </View>
      <View style={CustomStyles.submitButtonOuter}>
        <Pressable
          style={({ pressed }) => [
            CustomStyles.submitButton,
            pressed && CustomStyles.pressed,
          ]}
          onPress={createProductHandler.bind(
            this,
            title,
            price,
            description,
            image,
            category
          )}
        >
          <Text style={CustomStyles.submitButtonText}>SUBMIT</Text>
        </Pressable>
      </View>
    </>
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
export default CreateProductForm;
