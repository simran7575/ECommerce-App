import { memo, useEffect, useRef } from "react";
import { StyleSheet, FlatList } from "react-native";
import CardItem from "./CardItem";

// create a component
const CategoryList = ({
  data,
  selectedItem,
  selectCategory,
  image,
  scrollToIndex,
}) => {
  let flatListRef = useRef();

  useEffect(() => {
    if (scrollToIndex && data.length > 0) {
      const scrollToCurrentIndex = () => {
        let randomIndex = scrollToIndex != -1 ? scrollToIndex : 0;
        flatListRef.scrollToIndex({ animated: true, index: randomIndex });
      };
      scrollToCurrentIndex();
    }
  }, [scrollToIndex]);

  const getItemLayout = (data, index) => ({
    length: 50,
    offset: 90 * index,
    index,
  });

  return (
    <FlatList
      horizontal={true}
      ref={(ref) => {
        flatListRef = ref;
      }}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => {
        return item._id;
      }}
      getItemLayout={getItemLayout}
      renderItem={(item) => (
        <CardItem
          data={item.item}
          selectedItem={selectedItem}
          selectCategory={selectCategory}
          image={image}
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
export default memo(CategoryList);
