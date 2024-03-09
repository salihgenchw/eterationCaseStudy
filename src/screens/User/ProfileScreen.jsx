import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";

const ProfileScreen = () => {
  const handleContact = () => {
    Linking.openURL("https://www.linkedin.com/in/salihgenc/");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>ProfileScreen</Text>
      <TouchableOpacity onPress={handleContact}>
        <Text style={styles.link}>
          Sorularınız için lütfen benimle iletişime geçin
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  link: {
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default ProfileScreen;
