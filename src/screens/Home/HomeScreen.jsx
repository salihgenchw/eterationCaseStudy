import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import React from "react";
import SearchBar from "../../components/SearchBar";
import FilterBtn from "../../components/FilterBtn";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchBar />
        <FilterBtn />
      </View>
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
