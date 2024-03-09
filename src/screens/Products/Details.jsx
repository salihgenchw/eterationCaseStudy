import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect } from "react";
import { useRoute } from "@react-navigation/native";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import COLORS from "../../constants/colors/Colors";
import { FontAwesome, AntDesign } from "@expo/vector-icons";
import { useDispatch, useSelector } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
} from "../../redux/reducers/cartReducer";
import {
  addToFavorites,
  removeFromFavorites,
} from "../../redux/reducers/favoritesReducer";

const Details = ({ navigation }) => {
  const route = useRoute();
  const dispatch = useDispatch();
  const { product } = route.params;
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.
  const CartItems = useSelector((state) => state.cart.items);
  const FavoriteItem = useSelector((state) => state.favorites.favorites);

  useEffect(() => {
    product &&
      navigation.setOptions({
        title: product.name,
      });
  }, []);

  let [fontsLoaded] = useFonts({
    Montserrat_700Bold,
    Montserrat_500Medium,
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleIncreaseQuantity = (item) => {
    dispatch(addItemToCart(item));
  };

  const handleDecreaseQuantity = (item) => {
    dispatch(removeItemFromCart(item));
  };

  const addFavoriteFunc = (product) => {
    if (!FavoriteItem.find((item) => item.id === product.id)) {
      dispatch(addToFavorites({ product }));
    } else {
      dispatch(removeFromFavorites({ productId: product.id }));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />

      <TouchableOpacity
        style={[styles.favoriteBtn, { backgroundColor: colors.textTitle }]}
        onPress={() => {
          addFavoriteFunc(product);
        }}
      >
        {FavoriteItem.find((item) => item.id === product.id) ? (
          <AntDesign
            name="heart"
            size={Dimensions.get("window").width / 20}
            color={colors.danger}
          />
        ) : (
          <AntDesign
            name="hearto"
            size={Dimensions.get("window").width / 20}
            color={colors.white}
          />
        )}
      </TouchableOpacity>

      <Text numberOfLines={2} style={styles.productName}>
        {product.name}
      </Text>
      <ScrollView>
        <Text style={styles.productDesc}>{product.description}</Text>
      </ScrollView>
      <View style={styles.addToCartContainer}>
        <Text style={styles.productPrice}>Price: {product.price} ₺</Text>
        {CartItems.find((item) => item.id === product.id) ? (
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <TouchableOpacity
              onPress={() => handleDecreaseQuantity(product)}
              style={styles.buttonContainer}
            >
              {CartItems.find((item) => item.id === product.id).quantity ===
              1 ? (
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
      </View>
    </View>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: Dimensions.get("window").width / 20,
  },
  image: {
    width: "100%",
    height: Dimensions.get("window").height / 3.2,
    resizeMode: "cover",
    borderRadius: 5,
  },
  productName: {
    fontFamily: "Montserrat_700Bold",
    fontSize: Dimensions.get("window").width / 20,
    marginTop: 10,
  },
  productDesc: {
    fontFamily: "Montserrat_500Medium",
    fontSize: Dimensions.get("window").width / 28,
    marginTop: 10,
  },
  productPrice: {
    fontFamily: "Montserrat_700Bold",
    fontSize: Dimensions.get("window").width / 23,
    marginTop: 10,
  },
  addToCartText: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  addToCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
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
  AddToCartBtn: {
    width: Dimensions.get("window").width / 2 - 36,
    alignItems: "center",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 10,
  },
  favoriteBtn: {
    position: "absolute",
    top: Dimensions.get("window").height / 30,
    right: Dimensions.get("window").width / 15,
    padding: 7,
    borderRadius: 20,
  },
});
