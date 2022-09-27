import { useContext, useLayoutEffect } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import Icon, { Icons } from "../../components/Icon";
import { CustomStyles } from "../../constants/CustomStyles";
import { FavouritesContext } from "../../context/favourites-context";
import NoProducts from "../homescreen/homeScreenComponents/NoProductsScreen";
import ProductItemsList from "../homescreen/homeScreenComponents/ProductItemsList";

// create a component
const Favourite = ({ navigation }) => {
  const favouriteCtx = useContext(FavouritesContext);

  const navigateToHome = () => {
    navigation.goBack();
  };

  //   if (favouriteCtx.favourites.length == 0) {
  //     return <NoProducts />;
  //   }
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={CustomStyles.headerContainerFav}>
        <View style={CustomStyles.headerTitleContainer}>
          <View style={CustomStyles.backArrow}>
            <Pressable onPress={navigateToHome}>
              <Icon
                type={Icons.Ionicons}
                name="arrow-back"
                color="black"
                size={24}
                style={CustomStyles.arrowicon}
              />
            </Pressable>

            <Text style={CustomStyles.headerTitle}>Favourites</Text>
          </View>
          <View>
            <Icon type={Icons.Ionicons} name="search" color="black" size={24} />
          </View>
        </View>
      </View>

      {favouriteCtx.user.favourites.length != 0 ? (
        <View style={CustomStyles.productContainer}>
          <ProductItemsList products={favouriteCtx.user.favourites} />
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <NoProducts />
        </View>
      )}
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Favourite;
