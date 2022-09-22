//import liraries
import React, { Component } from "react";
import { FlatList, StyleSheet } from "react-native";

import DealsCardItem from "./DealsCardItem";

// create a component
const RenderDealsList = ({ data, image }) => {
  return (
    <FlatList
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={(item) => <DealsCardItem data={item.item} image={image} />}
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
export default RenderDealsList;
