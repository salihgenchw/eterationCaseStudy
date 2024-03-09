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
import { Feather, FontAwesome } from "@expo/vector-icons";
import { useFonts, Montserrat_500Medium } from "@expo-google-fonts/montserrat";
import { useNavigation } from "@react-navigation/native";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../redux/reducers/cartReducer";

const ProductCard = ({ product }) => {
  const CartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  let navigation = useNavigation();
  const { image, name, price } = product;
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  let [fontsLoaded] = useFonts({
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const addToFavorites = (product) => {
    console.log("Product added to favorites", product);
  };

  const handleIncreaseQuantity = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(removeItemFromCart(item));
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("ProductDetail", { product });
      }}
    >
      <Image source={{ uri: image }} style={styles.image} />
      <View style={styles.details}>
        <Text
          style={[
            styles.price,
            { color: colors.primary, fontFamily: "Montserrat_500Medium" },
          ]}
        >
          {price} ₺
        </Text>
        <Text numberOfLines={2} style={styles.name}>
          {name}
        </Text>
        {/* // Burada numberOfLines prop'unu kullanarak ürün isminin 2 satıra
        sığmasını sağladık. */}
      </View>
      <TouchableOpacity
        style={[styles.favoriteBtn, { backgroundColor: colors.textTitle }]}
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

      {CartItems.find((item) => item.id === product.id) ? (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            onPress={() => handleDecreaseQuantity(product)}
            style={styles.buttonContainer}
          >
            {CartItems.find((item) => item.id === product.id).quantity === 1 ? (
              <FontAwesome
                name="trash-o"
                size={Dimensions.get("window").width / 22}
                color={colors.text}
              />
            ) : (
              <Text style={styles.minusPlusText}>-</Text>
            )}
          </TouchableOpacity>
          <View
            style={[styles.quantityView, { backgroundColor: colors.primary }]}
          >
            <Text style={[styles.minusPlusText, { color: colors.textTitle }]}>
              {CartItems.find((item) => item.id === product.id).quantity}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => handleIncreaseQuantity(product)}
            style={styles.buttonContainer}
          >
            <Text style={styles.minusPlusText}>+</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity
          style={[styles.AddToCartBtn, { backgroundColor: colors.primary }]}
          onPress={() => {
            dispatch(addItemToCart(product));
          }}
        >
          <Text
            style={{
              color: colors.textTitle,
              fontFamily: "Montserrat_500Medium",
            }}
          >
            Add to Cart
          </Text>
        </TouchableOpacity>
      )}
    </TouchableOpacity>
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
    fontFamily: "Montserrat_500Medium",
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
  buttonContainer: {
    backgroundColor: "#dedede",
    paddingHorizontal: Dimensions.get("window").width / 25,
    paddingVertical: Dimensions.get("window").width / 40,
    justifyContent: "center",
    alignItems: "center",
  },
  minusPlusText: {
    fontSize: Dimensions.get("window").width / 22,
  },
  quantityView: {
    paddingHorizontal: Dimensions.get("window").width / 25,
    paddingVertical: Dimensions.get("window").width / 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductCard;
