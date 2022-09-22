import { useNavigation } from "@react-navigation/native";
import { memo, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Platform,
  Dimensions,
  Image,
} from "react-native";
import Icon, { Icons } from "../../../components/Icon";
import { Colors } from "../../../constants/CustomColor";
import { CustomStyles } from "../../../constants/CustomStyles";
import { FavouritesContext } from "../../../context/favourites-context";

const CategoryGridTile = ({ item }) => {
  const favouriteCtx = useContext(FavouritesContext);
  // useEffect(() => { const isFavourite = favouriteCtx.favourites.includes(item);})
  const isFavourite =
    favouriteCtx.user.favourites.length != 0
      ? favouriteCtx.user.favourites.find((element) => {
          return element._id === item._id;
        })
      : false;

  const navigation = useNavigation();

  const moveToDetailScreen = (item) => {
    navigation.navigate("ProductDetails", {
      item,
    });
  };

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
    <View style={styles.outerContainer}>
      <Pressable
        android_ripple={{ color: Colors.gray1 }}
        style={({ pressed }) => [
          styles.button,
          pressed ? styles.buttonPressed : null,
        ]}
        onPress={moveToDetailScreen.bind(this, item)}
      >
        <View style={[styles.innerContainer, { backgroundColor: "white" }]}>
          <View style={CustomStyles.imageContainer}>
            <Image source={{ uri: item.avatar }} style={CustomStyles.image} />
          </View>
          <View style={CustomStyles.titleContainer}>
            <Text numberOfLines={1} style={CustomStyles.titleText}>
              {item.name}
            </Text>
            <Pressable
              style={CustomStyles.heartIcon}
              onPress={changeFavouriteStatusHandler}
            >
              <Icon
                type={Icons.Ionicons}
                name={isFavourite ? "heart" : "heart-outline"}
                color={isFavourite ? "red" : "black"}
                size={22}
              />
            </Pressable>
          </View>
          <View style={CustomStyles.priceContainer}>
            <Text style={CustomStyles.priceText}>{`$${item.price}`}</Text>
          </View>
        </View>
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  outerContainer: {
    flex: 0.5,
    marginHorizontal: 6,
    marginVertical: 6,
    width: (Dimensions.get("window").width - 48) / 2,
    height: 300,
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    borderRadius: 8,
    backgroundColor: "white",
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  button: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,

    padding: 16,
    borderRadius: 8,
  },

  buttonPressed: {
    opacity: 0.5,
  },
});

//make this component available to the app
export default memo(CategoryGridTile);
