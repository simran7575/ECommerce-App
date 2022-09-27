//import liraries
import { useNavigation } from "@react-navigation/native";
import React, { Component } from "react";
import { View, Text, StyleSheet, SafeAreaView, Pressable } from "react-native";
import Icon, { Icons } from "../../../components/Icon";
import { CustomStyles } from "../../../constants/CustomStyles";
import CategoryList from "./CategoryList";

// create a component
const Header = ({
  children,
  categories,
  selectCategory,
  selectedItem,
  scrollToIndex,
}) => {
  const navigation = useNavigation();

  const navigateToFavourites = () => {
    navigation.navigate("Favourite");
  };
  return (
    <SafeAreaView>
      <View style={CustomStyles.headerContainer}>
        <View style={CustomStyles.headerTitleContainer}>
          <Text style={CustomStyles.headerTitle}>{children}</Text>
          <View style={CustomStyles.headerIcons}>
            <Pressable onPress={navigateToFavourites}>
              <Icon
                type={Icons.Ionicons}
                name="heart-outline"
                color="black"
                size={24}
                style={CustomStyles.hearticon}
              />
            </Pressable>
            <Icon type={Icons.Ionicons} name="search" color="black" size={24} />
          </View>
        </View>
        <View style={CustomStyles.categoryListContainer}>
          <CategoryList
            data={categories}
            selectCategory={selectCategory}
            selectedItem={selectedItem}
            image
            scrollToIndex={scrollToIndex}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

// define your styles
const styles = StyleSheet.create({});

//make this component available to the app
export default Header;
