import { View, Text, StyleSheet, Pressable } from "react-native";
import { Colors } from "../../../constants/CustomColor";
import { CustomStyles } from "../../../constants/CustomStyles";

// create a component
const CardItem = ({ data, selectedItem, selectCategory }) => {
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
    fontSize: 13,
    color: Colors.lightBlack,
    fontFamily: "poppins-regular",
    textAlignVertical: "center",
    includeFontPadding: false,
  },

  dateContainer: {
    marginTop: 24,
    borderRadius: 7,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  unfocuseddateContainer: {
    borderColor: Colors.gray2,
    borderWidth: 2,
  },
  focusedtext: {
    fontSize: 13,
    color: Colors.white,
    fontFamily: "poppins-regular",
    textAlignVertical: "center",
    includeFontPadding: false,
  },
  focuseddateContainer: {
    backgroundColor: Colors.pink,
  },
});

//make this component available to the app
export default CardItem;
