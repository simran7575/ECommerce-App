import { useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  ScrollView,
  SafeAreaView,
  StatusBar,
} from "react-native";
import {
  validatePrice,
  validateNames,
  createNewProduct,
  validateImage,
} from "../../api-services/ApiServices";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Colors } from "../../constants/CustomColor";
import { CustomStyles } from "../../constants/CustomStyles";
import CreateProductForm from "./createProductComponents/CreateProductForm";
import NoInternetScreen from "../../components/NoInternetScreen";
import NetInfo from "@react-native-community/netinfo";

// create a component
function CreateProduct({ route }) {
  const [isLoading, setIsLoading] = useState(false);
  const [productIsvalid, setProductIsvalid] = useState({
    title: true,
    price: true,
    description: true,
    image: true,
  });
  const [connectionStatus, setConnectionStatus] = useState(false);

  const navigation = useNavigation();

  let categories = route.params.categories;
  let newCat = categories.filter((item) => {
    return item._id != "10";
  });

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });
    return unsubscribe;
  }, []);

  async function createProductHandler(
    title,
    price,
    description,
    image,
    category
  ) {
    const isTitleValid = validateNames(title);
    const isPriceValid = validatePrice(price);
    const isDescriptionValid = validateNames(description);
    const isImageValid = validateImage(image);
    setProductIsvalid({
      title: isTitleValid,
      price: isPriceValid,
      description: isDescriptionValid,
      image: isImageValid,
    });

    if (
      !isTitleValid ||
      !isPriceValid ||
      !isDescriptionValid ||
      !isImageValid
    ) {
      return;
    }
    setIsLoading(true);
    if (connectionStatus) {
      try {
        parseInt(price, 10);

        const response = await createNewProduct(
          title,
          price,
          category,
          description,
          image
        );

        if (response.data.message == "Success") {
          navigation.navigate("Home");
        } else {
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
  }

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (!connectionStatus) {
    return <NoInternetScreen />;
  }
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
      >
        <View style={styles.Outercontainer}>
          <View style={styles.innercontainer}>
            <Text style={CustomStyles.titleFormLarge}>Create Product</Text>
            <CreateProductForm
              categories={newCat}
              productIsvalid={productIsvalid}
              createProductHandler={createProductHandler}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// define your styles
const styles = StyleSheet.create({
  innercontainer: {
    flex: 1,
    justifyContent: "center",
    padding: 18,
    backgroundColor: Colors.appBackground,
  },
  Outercontainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    //paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    backgroundColor: Colors.appBackground,
    flex: 1,
    //marginHorizontal: 20,
  },
});

//make this component available to the app
export default CreateProduct;
