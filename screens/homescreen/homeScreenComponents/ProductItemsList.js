import { useState } from "react";
import { StyleSheet, FlatList } from "react-native";
import { CustomStyles } from "../../../constants/CustomStyles";
import CategoryGridTile from "./CategoryGridTile";

// create a component
const ProductItemsList = ({ products, render }) => {
  const [isFetching, setIsFetching] = useState(false);
  function renderCategoryItem(itemData) {
    return <CategoryGridTile item={itemData.item} />;
  }

  const onRefresh = () => {
    setIsFetching(true);
    render();
    setIsFetching(false);
  };

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderCategoryItem}
      numColumns={2}
      initialNumToRender={7}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={CustomStyles.bottomPaddingInList}
      onRefresh={onRefresh}
      refreshing={isFetching}
    />
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default ProductItemsList;
