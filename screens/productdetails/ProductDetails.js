import { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { CustomStyles } from "../../constants/CustomStyles";
import IconButton from "./productDetailsComponents/IconButton";
import Divider from "../../components/Divider";
import { FavouritesContext } from "../../context/favourites-context";

// create a component
function ProductDetails({ navigation, route }) {
  const item = route.params.item;
  const favouriteCtx = useContext(FavouritesContext);
  const isFavourite = favouriteCtx.user.favourites.find((element) => {
    if (element._id === item._id) {
      return true;
    }
    return false;
  });

  const changeFavouriteStatusHandler = () => {
    if (isFavourite) {
      favouriteCtx.removeFavourites(item._id);
      //dispatch(removeFavourite({id: mealId}))
    } else {
      favouriteCtx.addFavourites(item);
      // dispatch(addFavourite({id: mealId}))
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <View style={styles.container}>
          <View style={CustomStyles.imageContainerLarge}>
            <Image source={{ uri: item.avatar }} style={CustomStyles.image} />
          </View>
          <View style={CustomStyles.iconContainers}>
            <IconButton
              name={"arrow-back"}
              size={18}
              color="black"
              backgroundColor={"white"}
              onPress={() => navigation.navigate("Home")}
            />
            <IconButton
              name={isFavourite ? "heart" : "heart-outline"}
              size={18}
              color={isFavourite ? "red" : "black"}
              backgroundColor={"white"}
              onPress={changeFavouriteStatusHandler}
            />
          </View>
          <View style={CustomStyles.mainContainer}>
            <View style={CustomStyles.titleAndPrice}>
              <Text style={CustomStyles.titleTextLarge}>{item.name}</Text>
              <Text
                style={CustomStyles.priceTextLarge}
              >{`$${item.price}`}</Text>
            </View>

            <Divider style={CustomStyles.divider} />
            <Text style={CustomStyles.descriptionTextMedium}>
              {item.description}
            </Text>

            <Divider style={CustomStyles.dividerShort} />
          </View>
        </View>
      </ScrollView>
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
export default ProductDetails;
