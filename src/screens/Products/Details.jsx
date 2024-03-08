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

const Details = ({ navigation }) => {
  const route = useRoute();
  const { product } = route.params;
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

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

  return (
    <View style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text numberOfLines={2} style={styles.productName}>
        {product.name}
      </Text>
      <ScrollView>
        <Text style={styles.productDesc}>{product.description}</Text>
      </ScrollView>
      <View style={styles.addToCartContainer}>
        <Text style={styles.productPrice}>Price: {product.price} ₺</Text>
        <TouchableOpacity
          style={styles.addToCartBtn}
          onPress={() => {
            console.log("Product added to cart", product);
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
            Add to Cart
          </Text>
        </TouchableOpacity>
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
});
