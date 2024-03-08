import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import COLORS from "../../src/constants/colors/Colors";
import { Feather } from "@expo/vector-icons";

const ProductCard = ({ product }) => {
  const { image, name, price } = product;
  const addToFavorites = (product) => {
    console.log("Product added to favorites", product);
  };
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  return (
    <View style={styles.container}>
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text style={[styles.price, { color: colors.primary }]}>{price} ₺</Text>
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>
        {/* // Burada numberOfLines prop'unu kullanarak ürün isminin 2 satıra
        sığmasını sağladık. */}
      </View>
      <TouchableOpacity
        style={[styles.favoriteBtn, { backgroundColor: colors.primary }]}
        onPress={() => {
          addToFavorites(product);
        }}
      >
        <Feather
          name="heart"
          size={Dimensions.get("window").width / 25}
          color={colors.white}
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.AddToCartBtn, { backgroundColor: colors.primary }]}
      >
        <Text style={{ color: colors.textTitle }}>Add to Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get("window").width / 2 - 20,
    padding: 10,
    margin: 10,
    elevation: 5,
    backgroundColor: "#fff",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  image: {
    width: Dimensions.get("window").width / 2 - 40,
    height: Dimensions.get("window").height / 5,
    resizeMode: "cover",
    alignSelf: "center",
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: Dimensions.get("window").width / 28,
    height: Dimensions.get("window").height / 20,
  },
  price: {
    fontSize: Dimensions.get("window").width / 28,
    marginVertical: 10,
  },
  favoriteBtn: {
    position: "absolute",
    top: Dimensions.get("window").height / 60,
    right: Dimensions.get("window").width / 30,
    padding: 5,
    borderRadius: 20,
  },
  AddToCartBtn: {
    width: Dimensions.get("window").width / 2 - 36,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
});

export default ProductCard;
