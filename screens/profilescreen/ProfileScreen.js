import { useContext } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import Divider from "../../components/Divider";
import Icon, { Icons } from "../../components/Icon";
import { Colors } from "../../constants/CustomColor";
import { CustomStyles } from "../../constants/CustomStyles";
import { FavouritesContext } from "../../context/favourites-context";

// create a component
const ProfileScreen = () => {
  const favouriteCtx = useContext(FavouritesContext);
  const user = favouriteCtx.user.userDetails;
  const logoutHandler = () => {
    favouriteCtx.logout();
  };
  return (
    <View style={CustomStyles.generalContainer}>
      <View style={CustomStyles.logoContainerUpper}>
        <View style={CustomStyles.forgotHeaderContainer}>
          <Text style={CustomStyles.headerTitleWhite}>Profile</Text>
        </View>
        <View style={styles.imageContainer}>
          <View style={styles.image}>
            <Icon
              name="person-outline"
              type={Icons.Ionicons}
              color={Colors.pink}
              size={120}
            />
          </View>
          <View style={styles.camera}>
            <Icon
              name="camera-outline"
              type={Icons.Ionicons}
              color={Colors.pink}
              size={20}
            />
          </View>
        </View>
      </View>
      <View style={CustomStyles.profileContainer}>
        <View style={CustomStyles.profileBottomContainer}>
          <View style={CustomStyles.infoContainer}>
            <Text style={CustomStyles.descriptionTextMedium}>Name</Text>
            <Text style={CustomStyles.priceTextLarge}>{user.firstname}</Text>
          </View>
          <Divider style={CustomStyles.divider} />
          <View style={CustomStyles.infoContainer}>
            <Text style={CustomStyles.descriptionTextMedium}>Email</Text>
            <Text style={CustomStyles.priceTextLarge}>{user.email}</Text>
          </View>
          <Divider style={CustomStyles.divider} />
        </View>
        <View style={CustomStyles.submitButtonOuterCenter}>
          <Pressable
            style={({ pressed }) => [
              CustomStyles.submitButton,
              pressed && CustomStyles.pressed,
            ]}
            onPress={logoutHandler}
          >
            <Text style={CustomStyles.submitButtonText}>LOGOUT</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    backgroundColor: Colors.white,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    position: "absolute",
    left: 0,
    right: 0,
    top: "65%",
  },
  camera: {
    position: "absolute",
    top: 50,
    bottom: 0,
    left: "68%",
    right: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.pink,
    backgroundColor: Colors.white,
    justifyContent: "center",
    alignItems: "center",
  },
  cameraImage: {
    width: 20,
    height: 20,
  },
});

//make this component available to the app
export default ProfileScreen;
