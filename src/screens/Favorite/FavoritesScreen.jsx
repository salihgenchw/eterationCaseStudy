import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import COLORS from "../../constants/colors/Colors";
import { removeFromFavorites } from "../../redux/reducers/favoritesReducer";
import { useDispatch } from "react-redux";

const FavoritesScreen = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.favorites.favorites);
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  const handleDeleteFromFavorites = (item) => {
    dispatch(removeFromFavorites({ productId: item.id }));
  };

  return (
    <ScrollView style={styles.container}>
      {items.length === 0 ? (
        <Text
          style={{
            fontFamily: "Montserrat_700Bold",
            fontSize: Dimensions.get("window").width / 20,
            textAlign: "center",
          }}
        >
          No favorites yet
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
                </View>
              </View>
              <TouchableOpacity
                style={{
                  backgroundColor: colors.danger,
                  padding: 10,
                  alignItems: "center",
                  borderRadius: 5,
                }}
                onPress={() => handleDeleteFromFavorites(item)}
              >
                <Text
                  style={{
                    fontFamily: "Montserrat_700Bold",
                    color: colors.textTitle,
                  }}
                >
                  Delete from favorites
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </>
      )}
    </ScrollView>
  );
};

export default FavoritesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  image: {
    width: Dimensions.get("window").width / 4,
    height: Dimensions.get("window").width / 4,
    resizeMode: "cover",
    borderRadius: 5,
  },
  listContainer: {
    borderWidth: 0.3,
    padding: Dimensions.get("window").width / 30,
    marginBottom: Dimensions.get("window").height / 120,
    borderRadius: 5,
    elevation: 2,
    backgroundColor: "white",
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
});
