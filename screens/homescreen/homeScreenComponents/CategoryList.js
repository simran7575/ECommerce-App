import { StyleSheet, FlatList } from "react-native";
import CardItem from "./CardItem";

// create a component
const CategoryList = ({ data, selectedItem, selectCategory }) => {
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => {
        return item._id;
      }}
      renderItem={(item) => (
        <CardItem
          data={item.item}
          selectedItem={selectedItem}
          selectCategory={selectCategory}
        />
      )}
    />
  );
};

// define your styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#2c3e50",
  },
});

//make this component available to the app
export default CategoryList;
