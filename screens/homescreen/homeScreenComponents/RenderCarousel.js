import { useState, useRef } from "react";
import { View, Dimensions, Image, StyleSheet } from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import PropTypes from "prop-types";

export const SLIDER_WIDTH = Dimensions.get("window").width;
export const ITEM_WIDTH = Math.round(SLIDER_WIDTH * 1);

const data = [
  {
    id: 1,
    url: require("../../../assets/images/sale1.png"),
  },
  {
    id: 2,
    url: require("../../../assets/images/sale2.png"),
  },
  {
    id: 3,
    url: require("../../../assets/images/sale3.png"),
  },
  {
    id: 4,
    url: require("../../../assets/images/sale4.png"),
  },
  {
    id: 5,
    url: require("../../../assets/images/sale5.png"),
  },
  {
    id: 6,
    url: require("../../../assets/images/sale6.png"),
  },
];

function RenderCarousel() {
  const [index, setIndex] = useState(0);
  const isCarousel = useRef(null);
  const renderItem = ({ item }) => {
    return (
      <View style={styles.imageContainer}>
        <Image source={item.url} style={styles.image} />
      </View>
    );
  };

  return (
    <View style={styles.carouselContainer}>
      <Carousel
        layout="default"
        layoutCardOffset={9}
        ref={isCarousel}
        data={data}
        renderItem={renderItem}
        sliderWidth={SLIDER_WIDTH}
        itemWidth={ITEM_WIDTH}
        onSnapToItem={(index) => setIndex(index)}
        autoplay={true}
        //autoplayDelay={1000}
        autoplayInterval={1500}
      />
      <View style={styles.paginationContainer}>
        <Pagination
          dotsLength={data.length}
          activeDotIndex={index}
          carouselRef={isCarousel}
          dotStyle={{
            width: 9,
            height: 9,
            borderRadius: 4,
            backgroundColor: "#fff",
          }}
          inactiveDotStyle={{
            backgroundColor: "#545252",
            // Define styles for inactive dots here
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.8}
          tappableDots={true}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  imageContainer: {
    alignItems: "center",
    backgroundColor: "transparent",
    overflow: "hidden",
    height: 220,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "stretch",
  },
  carouselContainer: {
    alignItems: "center",
  },
  paginationContainer: {
    position: "absolute",
    bottom: -10,
  },
});
export default RenderCarousel;
