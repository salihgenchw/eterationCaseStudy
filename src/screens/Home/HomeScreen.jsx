import { Alert, FlatList, StyleSheet, View, Button } from "react-native";
import React, { useEffect, useState } from "react";
import SearchBar from "../../components/SearchBar";
import FilterBtn from "../../components/FilterBtn";
import Endpoints from "../../api/Endpoints";
import APIManager from "../../api/APIManager";
import ProductCard from "../../components/ProductCard";

const HomeScreen = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getAllProducts();
  }, [page]);

  const getAllProducts = async () => {
    setIsLoading(true);
    try {
      const response = await APIManager(
        `${Endpoints.GET_PRODUCTS}?page=${page}&limit=${Endpoints.DEFAULT_PAGINATION_LIMIT}`,
        "GET"
      );
      setProducts((prevProducts) => [...prevProducts, ...response]);
    } catch (error) {
      Alert.alert("Error", "An error occurred while fetching products");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
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
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
        onEndReached={handleLoadMore}
        onEndReachedThreshold={0.1}
        ListFooterComponent={
          isLoading && <Button title="Loading..." disabled />
        }
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
