import { Dimensions, Platform } from "react-native";
import { Colors } from "./CustomColor";

export const CustomStyles = {
  headerContainer: {
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 12,
    backgroundColor: Colors.white,
  },
  headerContainerFav: {
    paddingTop: 30,
    paddingHorizontal: 16,
    paddingBottom: 18,
    backgroundColor: Colors.white,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "poppins-medium",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  headerTitleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryListContainer: {
    marginVertical: 12,
  },
  categoryListContainerShort: {
    marginVertical: 6,
  },
  cardItemContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  imageContainer: {
    width: "100%",
    height: 180,
    marginTop: 6,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  titleText: {
    fontSize: 13,
    fontWeight: "100",
    fontFamily: "poppins-medium",
    maxWidth: (Dimensions.get("window").width - 100) / 2 - 28,
    textAlignVertical: "center",
    includeFontPadding: false,
    color: Colors.black,
  },
  titleContainer: {
    flexDirection: "row",

    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 4,
  },
  heartIcon: {
    marginVertical: 6,
  },
  productContainer: {
    paddingHorizontal: 6,
    paddingTop: 6,
  },
  priceContainer: {
    marginVertical: 4,
  },
  priceText: {
    fontSize: 11,
    fontFamily: "poppins-medium",
    color: Colors.black,
  },
  bottomPaddingInList: {
    paddingBottom: 200,
  },
  bottomButtonContainer: {
    position: "absolute",
    bottom: 50,
    right: 50,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.pink,
    elevation: 5,
    shadowColor: "black",
    shadowOffset: { height: 2, width: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 30,
    borderRadius: 30,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
  },
  mainContainer: {
    paddingHorizontal: 18,
    paddingVertical: 12,
  },
  titleAndPrice: {},
  titleTextLarge: {
    fontSize: 20,
    fontFamily: "poppins-medium",
    marginRight: 8,
    marginVertical: 8,
    color: Colors.black,
  },
  titleFormLarge: {
    fontSize: 22,
    fontFamily: "poppins-medium",
    marginRight: 8,
    marginVertical: 12,
    color: Colors.black,
  },
  priceTextLarge: {
    color: Colors.gray5,
    fontSize: 15,
    fontFamily: "poppins-medium",
  },
  originalTitle: {
    fontSize: 12,
    color: Colors.gray3,
    fontFamily: "poppins-regular",
  },
  originalTitleLarge: {
    fontSize: 16,
    color: Colors.gray4,
    fontFamily: "poppins-regular",
  },
  divider: {
    height: 3,
    marginVertical: 16,
  },
  dividerShort: {
    height: 4,
    marginTop: 24,

    width: 150,
    alignSelf: "center",
    backgroundColor: Colors.gray2,
  },
  descriptionTextMedium: {
    color: Colors.gray3,
    fontSize: 14,
    fontFamily: "poppins-regular",
  },

  imageContainerLarge: {
    width: Dimensions.get("window").width,
    height: 300,
  },
  iconContainers: {
    position: "absolute",
    top: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 12,
    width: "100%",
  },
  textInput: {
    width: "100%",
    height: 50,
    borderRadius: 12,
    borderTopColor: Colors.white,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderBottomColor: Colors.gray1,
    borderLeftWidth: 2,
    borderLeftColor: Colors.gray1,
    borderRightWidth: 2,
    borderRightColor: Colors.gray1,
    paddingHorizontal: 18,
    fontSize: 16,
    color: Colors.gray5,
    overflow: Platform.OS === "android" ? "hidden" : "visible",
    fontFamily: "poppins-medium",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  labeltext: {
    color: Colors.lightBlack,
    fontSize: 14,
    fontFamily: "poppins-regular",
  },
  labelcontainer: {
    marginVertical: 10,
  },
  error: {
    paddingVertical: 4,
    fontSize: 12,
    fontFamily: "poppins-regular",
    color: "red",
  },
  submitButton: {
    paddingHorizontal: 24,
    paddingVertical: 9,
    borderRadius: 22,
    backgroundColor: Colors.pink,
    justifyContent: "center",
    alignItems: "center",
  },
  submitButtonText: {
    fontSize: 16,
    fontFamily: "poppins-medium",
    color: Colors.white,
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  submitButtonOuter: {
    marginVertical: 24,
  },
  pressed: {
    opacity: 0.7,
  },
  headerIcons: {
    flexDirection: "row",
  },
  hearticon: {
    marginHorizontal: 24,
  },
  arrowicon: {
    marginRight: 18,
  },
  backArrow: {
    // marginHorizontal: 6,
    flexDirection: "row",
    justifyContent: "center",
  },
};
