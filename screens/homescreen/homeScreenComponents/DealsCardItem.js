import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
  Image,
  ImageBackground,
} from "react-native";
import { Colors } from "../../../constants/CustomColor";
import { CustomStrings } from "../../../constants/CustomStrings";
import { CustomStyles } from "../../../constants/CustomStyles";

// create a component
const DealsCardItem = ({ data, image }) => {
  return (
    <ImageBackground
      style={[CustomStyles.generalContainer, { marginHorizontal: 4 }]}
      source={image}
    >
      <Pressable
        style={({ pressed }) => pressed && CustomStyles.pressed}
        //   onPress={() => navigation.navigate("DetailScreen")}
      >
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            <Image source={{ uri: data.url }} style={styles.image} />
          </View>
          <View style={CustomStyles.dealsContainer}>
            <Text style={styles.titleText}>{data.title}</Text>
            <Text style={styles.descriptionText}>{data.description}</Text>
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    paddingVertical: 12,
    backgroundColor: "transparent",
    // marginBottom: 28,
    //marginHorizontal: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  imageContainer: {
    width: 200,
    height: 250,
    //marginVertical: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  titleText: {
    fontSize: 11,
    fontWeight: "500",
    color: Colors.gray5,
    fontFamily: "poppins-regular",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  sponsorContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 6,
  },
  icon: {
    marginHorizontal: 6,
  },
  detailContainer: {
    marginVertical: 6,
    flexDirection: "row",
    alignItems: "center",
  },
  detailText: {
    marginRight: 8,
    backgroundColor: "#e6e5e3",
    paddingVertical: 4,
    paddingHorizontal: 8,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "500",
    color: Colors.black,
    fontFamily: "poppins-medium",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
});

//make this component available to the app
export default DealsCardItem;
