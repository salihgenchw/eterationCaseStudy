import { StyleSheet, Text, TouchableOpacity, Dimensions } from "react-native";
import React from "react";
import { FontAwesome6 } from "@expo/vector-icons";
import COLORS from "../constants/colors/Colors";

const FilterBtn = () => {
  const colors = COLORS.light; // Sonrasında dark mode eklenecek.

  return (
    <TouchableOpacity
      style={[styles.filterButton, { backgroundColor: colors.primary }]}
    >
      <Text style={{ color: "white", textAlign: "center" }}>
        <FontAwesome6 name="filter" size={24} color={colors.textTitle} />
      </Text>
    </TouchableOpacity>
  );
};

export default FilterBtn;

const styles = StyleSheet.create({
  filterButton: {
    height: Dimensions.get("window").width / 7.7,
    width: Dimensions.get("window").width / 7,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    marginRight: 10,
    marginTop: Dimensions.get("window").height / 200,
  },
});
