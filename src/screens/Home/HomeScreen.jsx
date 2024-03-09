import { Alert, FlatList, StyleSheet, View } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import FilterBtn from "../../components/FilterBtn";
import Endpoints from "../../api/Endpoints";
import APIManager from "../../api/APIManager";
import ProductCard from "../../components/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAllProducts();
  }, []);

  const getAllProducts = async () => {
    try {
      const response = await APIManager(Endpoints.GET_PRODUCTS, "GET");
      setProducts(response);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching products");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar />
        <FilterBtn />
      </View>
      <FlatList
        data={products}
        renderItem={({ item }) => <ProductCard product={item} />}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
