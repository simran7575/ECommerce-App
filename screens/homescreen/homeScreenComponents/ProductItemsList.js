import { memo } from "react";
import { StyleSheet, FlatList } from "react-native";
import { CustomStyles } from "../../../constants/CustomStyles";
import CategoryGridTile from "./CategoryGridTile";

// create a component
const ProductItemsList = ({ products }) => {
  function renderCategoryItem(itemData) {
    return <CategoryGridTile item={itemData.item} />;
  }

  return (
    <FlatList
      data={products}
      keyExtractor={(item) => item._id}
      renderItem={renderCategoryItem}
      numColumns={2}
      initialNumToRender={7}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={CustomStyles.bottomPaddingInList}
      maxToRenderPerBatch={10}
      maintainVisibleContentPosition={0}
    />
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default memo(ProductItemsList);
