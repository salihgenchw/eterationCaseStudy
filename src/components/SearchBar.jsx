import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

function SearchBar({ textFilter, getLastValue }) {
  const [text, setText] = useState(""); // TextInput değeri için state tanımı
  const [alertShown, setAlertShown] = useState(false);

  const handleSearch = (value) => {
    setText(value); // TextInput içeriğini güncelle
    // textFilter fonksiyonunu çağır
    if (getLastValue !== undefined) {
      getLastValue(value);
    }
    if (textFilter !== undefined) {
      textFilter(value);
    }
  };

  const handleClear = () => {
    setText(""); // TextInput içeriğini sıfırla
    if (getLastValue !== undefined) {
      getLastValue("");
    }
    if (textFilter !== undefined) {
      textFilter("");
    }
  };

  useEffect(() => {
    if (!alertShown && text.length > 0) {
      Alert.alert(
        "Bi saniye⚠️",
        "mockapi tarafında search özelliğini göremedim. Search özelliğini de ön tarafta yapmak istemedim.",
        [
          {
            text: "Peki öyle olsun 🤷‍♂️",
            onPress: () => setAlertShown(true),
          },
        ]
      );
    }
  }, [text, alertShown]);

  return (
    <KeyboardAvoidingView style={styles.bar}>
      <Ionicons
        name="search"
        size={Dimensions.get("window").width / 20}
        color="#343434"
        style={{ position: "absolute", left: 10 }}
      />
      <TextInput
        placeholder="Search"
        onChangeText={handleSearch}
        value={text}
        style={{ flex: 1, color: "#343434", paddingLeft: 10, height: 200 }}
        placeholderTextColor="grey"
        returnKeyType="done"
      />

      {text.length > 0 && (
        <TouchableOpacity
          onPress={handleClear}
          style={{ position: "absolute", right: 10 }}
        >
          <Ionicons
            name="close"
            size={Dimensions.get("window").width / 20}
            color="#343434"
          />
        </TouchableOpacity>
      )}
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  bar: {
    justifyContent: "center",
    margin: 10,
    marginTop: 15,
    flex: 1,
    maxHeight: 50,
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FAF8F1",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
    color: "black",
    padding: 25,
  },
});

export default SearchBar;
