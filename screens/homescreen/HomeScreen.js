import { useIsFocused } from "@react-navigation/native";

import { useEffect, useState, useContext } from "react";
import {
  View,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
} from "react-native";
import {
  getAllCategories,
  getAllProducts,
} from "../../api-services/ApiServices";

import LoadingOverlay from "../../components/LoadingOverlay";
import { Colors } from "../../constants/CustomColor";
import { CustomStrings } from "../../constants/CustomStrings";
import { CustomStyles } from "../../constants/CustomStyles";
import Header from "./homeScreenComponents/Header";
import NoProducts from "./homeScreenComponents/NoProductsScreen";
import ProductItemsList from "./homeScreenComponents/ProductItemsList";
import RenderCarousel from "./homeScreenComponents/RenderCarousel";
import NoInternetScreen from "../../components/NoInternetScreen";
import NetInfo from "@react-native-community/netinfo";
import { FavouritesContext } from "../../context/favourites-context";
import RenderDealsList from "./homeScreenComponents/RenderDealsList";
import { BestOfElectronics, LatestDealData } from "../../data/latestdeals";

// create a component
function HomeScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [allProductsList, setAllProductsList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [showNoProductScreen, setShowNoProductScreen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("All");
  const [connectionStatus, setConnectionStatus] = useState(false);
  const favouriteCtx = useContext(FavouritesContext);

  const isFocused = useIsFocused();

  const changeFetchingMode = () => {
    setIsFetching(!isFetching);
  };

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

  useEffect(() => {
    let cancel = false;
    async function loadAllProducts() {
      try {
        const response = await getAllProducts(favouriteCtx.user.token);
        if (cancel) {
          return;
        }
        if (response.data.success) {
          const reverseArray = response.data.products.reverse();
          setAllProductsList(reverseArray);
          setProductsList(reverseArray);
          selectCategory(selectedItem);
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

    const unsubscribe = NetInfo.addEventListener((state) => {
      setConnectionStatus(state.isConnected);
    });

    // Unsubscribe
    unsubscribe();

    loadAllProducts();

    return () => {
      cancel = true;
      unsubscribe;
    };
  }, [isFocused, isFetching]);

  useEffect(() => {
    let cancel = false;
    async function loadAllCategories() {
      try {
        const response = await getAllCategories(favouriteCtx.user.token);
        if (cancel) {
          return;
        }
        if (response.data.success) {
          setCategoryList((prevCat) => [
            {
              _id: "10",
              name: "All",
              image: CustomStrings.str10,
            },
            ...response.data.categories,
          ]);
          favouriteCtx.addCategories([
            {
              _id: "10",
              name: "All",
              image: CustomStrings.str10,
            },
            ...response.data.categories,
          ]);
          //setSelectedItem("All");
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

    loadAllCategories();
    return () => {
      cancel = true;
    };
  }, []);

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

      {selectedItem == "All" ? (
        <SafeAreaView style={CustomStyles.generalContainer}>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              flexGrow: 1,
              paddingBottom: "28%",
            }}
          >
            <View style={CustomStyles.carousel}>
              <RenderCarousel />
            </View>
            <View style={CustomStyles.carousel}>
              <View style={CustomStyles.marginHor}>
                <Text style={CustomStyles.bestDealsText}>BEST DEALS</Text>
              </View>
              <RenderDealsList
                data={LatestDealData}
                image={require("../../assets/images/download.png")}
              />
            </View>
            <View style={CustomStyles.carousel}>
              <View style={CustomStyles.marginHor}>
                <Text style={CustomStyles.bestDealsTextYellow}>
                  BEST ON ELECTRONICS
                </Text>
              </View>
              <RenderDealsList
                data={BestOfElectronics}
                image={require("../../assets/images/images.png")}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <View style={CustomStyles.productContainer}>
          <ProductItemsList
            products={productsList}
            render={changeFetchingMode}
          />
        </View>
      )}
    </View>
  );
}

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    backgroundColor: Colors.appBackground,
    flex: 1,
    //marginHorizontal: 20,
  },
});

//make this component available to the app
export default HomeScreen;
