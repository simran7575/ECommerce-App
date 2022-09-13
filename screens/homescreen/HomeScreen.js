import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Alert, Pressable } from "react-native";
import {
  getAllCategories,
  getAllProducts,
} from "../../api-services/ApiServices";
import Icon, { Icons } from "../../components/Icon";
import LoadingOverlay from "../../components/LoadingOverlay";
import { Colors } from "../../constants/CustomColor";
import { CustomStrings } from "../../constants/CustomStrings";
import { CustomStyles } from "../../constants/CustomStyles";
import Header from "./homeScreenComponents/Header";
import NoProducts from "./homeScreenComponents/NoProductsScreen";
import ProductItemsList from "./homeScreenComponents/ProductItemsList";

import NoInternetScreen from "../../components/NoInternetScreen";
import NetInfo from "@react-native-community/netinfo";

// create a component
function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [productsList, setProductsList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showNoProductScreen, setShowNoProductScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [connectionStatus, setConnectionStatus] = useState(false);

  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const selectCategory = (name) => {
    setSelectedItem(name);
    if (name != "All") {
      setIsLoading(true);
      const newProductList = allProductsList.filter((item) => {
        return item.category == name;
      });

      setProductsList(newProductList);
      setIsLoading(false);
    } else {
      setIsLoading(true);
      setProductsList(allProductsList);
      setIsLoading(false);
    }
  };

  const moveToCreateProductScreen = () => {
    navigation.navigate("CreateProduct", { categories: categoryList });
  };

  useEffect(() => {
    let cancel = false;
    async function loadAllProducts() {
      try {
        const response = await getAllProducts();
        if (cancel) {
          return;
        }
        if (response.data.message == "Success") {
          const reverseArray = response.data.products.reverse();
          setAllProductsList(reverseArray);
          setProductsList(reverseArray);
          setIsLoading(false);
        } else {
          setShowNoProductScreen(true);
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Products!", " please try again later!");
        setIsLoading(false);
      }
    }
    async function loadAllCategories() {
      try {
        const response = await getAllCategories();
        if (cancel) {
          return;
        }
        if (response.data.message == "Success") {
          setCategoryList((prevCat) => [
            { _id: "10", name: "All" },
            ...response.data.categories,
          ]);
          setIsLoading(false);
        } else {
          setIsLoading(false);
          return;
        }
      } catch (error) {
        console.log(error);
        Alert.alert("Error in loading Categories!", " please try again later!");
        setIsLoading(false);
      }
    }
    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();

    loadAllProducts();
    loadAllCategories();

    return unsubscribe;
  }, [isFocused]);

  if (isLoading) {
    return <LoadingOverlay />;
  }
  if (showNoProductScreen) {
    return <NoProducts />;
  }
  if (!connectionStatus) {
    return <NoInternetScreen />;
  }
  return (
    <View style={styles.container}>
      <Header
        categories={categoryList}
        selectCategory={selectCategory}
        selectedItem={selectedItem}
      >
        {CustomStrings.str01}
      </Header>
      <View style={CustomStyles.productContainer}>
        <ProductItemsList products={productsList} />
      </View>
      <Pressable
        style={CustomStyles.bottomButtonContainer}
        onPress={moveToCreateProductScreen}
      >
        <Icon type={Icons.Ionicons} name="add" color={Colors.white} size={32} />
      </Pressable>
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

//make this component available to the app
export default HomeScreen;
