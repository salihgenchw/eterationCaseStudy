import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} from "../../redux/reducers/cartReducer";
import React from "react";
import {
  useFonts,
  Montserrat_700Bold,
  Montserrat_500Medium,
} from "@expo-google-fonts/montserrat";
import COLORS from "../../constants/colors/Colors";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.
  const items = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const dispatch = useDispatch();
  const navigation = useNavigation();

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

  const handleComplateOrder = () => {
    Alert.alert("Order Completed", "Thank you for your order", [
      {
        text: "OK",
        onPress: () => {
          dispatch(clearCart());
          navigation.navigate("Home");
        },
      },
    ]);
  };

  return (
    <View style={styles.container}>
      {items.length === 0 ? (
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: Dimensions.get("window").width / 20,
            textAlign: "center",
          }}
        >
          Your cart is empty
        </Text>
      ) : (
        <>
          {items.map((item) => (
            <View
              key={item.id}
              style={[styles.listContainer, { borderColor: colors.primary }]}
            >
              <View style={{ flexDirection: "row", marginBottom: 5 }}>
                <Image source={{ uri: item.image }} style={styles.image} />
                <View
                  style={{ marginLeft: Dimensions.get("window").width / 50 }}
                >
                  <Text style={styles.nameText}>{item.name}</Text>

                  <Text style={[styles.priceText, { color: colors.primary }]}>
                    {item.price} ₺
                  </Text>
                  <View style={{ flexDirection: "row", marginTop: 10 }}>
                    <TouchableOpacity
                      onPress={() => handleDecreaseQuantity(item)}
                      style={styles.buttonContainer}
                    >
                      {item.quantity === 1 ? (
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
                      style={[
                        styles.quantityView,
                        { backgroundColor: colors.primary },
                      ]}
                    >
                      <Text
                        style={[
                          styles.minusPlusText,
                          { color: colors.textTitle },
                        ]}
                      >
                        {item.quantity}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => handleIncreaseQuantity(item)}
                      style={styles.buttonContainer}
                    >
                      <Text style={styles.minusPlusText}>+</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          ))}
          <View style={styles.addToCartContainer}>
            <Text style={styles.productPrice}>{totalPrice} ₺</Text>
            <TouchableOpacity
              style={styles.addToCartBtn}
              onPress={() => {
                handleComplateOrder();
              }}
            >
              <Text
                style={[
                  styles.addToCartText,
                  {
                    backgroundColor: colors.primary,
                    color: colors.textTitle,
                    fontFamily: "Montserrat_500Medium",
                  },
                ]}
              >
                Complete
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  listContainer: {
    borderWidth: 0.3,
    padding: Dimensions.get("window").width / 30,
    marginBottom: Dimensions.get("window").height / 120,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",
  },
  image: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    resizeMode: "cover",
    borderRadius: 5,
  },
  nameText: {
    fontFamily: "Montserrat_700Bold",
    fontSize: Dimensions.get("window").width / 25,
  },
  priceText: {
    fontFamily: "Montserrat_500Medium",
    fontSize: Dimensions.get("window").width / 29,
    marginTop: 5,
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
  addToCartContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
  },
  addToCartText: {
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  productPrice: {
    fontFamily: "Montserrat_700Bold",
    fontSize: Dimensions.get("window").width / 23,
    marginTop: 10,
  },
});
