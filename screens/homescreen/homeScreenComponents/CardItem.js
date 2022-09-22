import { View, Text, StyleSheet, Pressable, Image } from "react-native";
import { Colors } from "../../../constants/CustomColor";
import { CustomStyles } from "../../../constants/CustomStyles";

// create a component
const CardItem = ({ data, selectedItem, selectCategory, image }) => {
  const isSelected = selectedItem == data.name;
  return (
    <View style={CustomStyles.cardItemContainer}>
      <Pressable onPress={selectCategory.bind(this, data.name)}>
        <View
          style={[
            styles.dateContainer,
            isSelected && styles.focuseddateContainer,
            !isSelected && styles.unfocuseddateContainer,
          ]}
        >
          {image && (
            <View style={CustomStyles.categoryImageContainer}>
              <Image
                source={{ uri: data.image }}
                style={CustomStyles.categoryImage}
              />
            </View>
          )}
          <Text
            style={[
              isSelected && styles.focusedtext,
              !isSelected && styles.text,
            ]}
          >
            {data.name}
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

// define your styles
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    color: Colors.lightBlack,
    fontFamily: "poppins-regular",
    textAlignVertical: "center",
    includeFontPadding: false,
  },

  dateContainer: {
    marginTop: 18,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  unfocuseddateContainer: {
    // borderColor: Colors.gray2,
    // borderWidth: 2,
  },
  focusedtext: {
    fontSize: 12,
    color: Colors.white,
    fontFamily: "poppins-regular",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  focuseddateContainer: {
    backgroundColor: Colors.pink,
    borderRadius: 7,
  },
});

//make this component available to the app
export default CardItem;
