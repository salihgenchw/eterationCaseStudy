import React from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, shallowEqual } from "react-redux";
import COLORS from "../../src/constants/colors/Colors";
import HomeScreen from "../screens/Home/HomeScreen";
import CartScreen from "../screens/Cart/CartScreen";
import FavoritesScreen from "../screens/Favorite/FavoritesScreen";
import ProfileScreen from "../screens/User/ProfileScreen";
import Details from "../screens/Products/Details";

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();
const colors = COLORS.light; // Sonrasında dark mode eklenecek.

const HomeStackNavigator = () => (
  <HomeStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: colors.primary,
      },
      headerTitleAlign: "center",
      headerTitleStyle: {
        color: colors.textTitle,
        fontWeight: "bold",
      },
      headerTintColor: colors.textTitle,
    }}
  >
    <HomeStack.Screen name="E-Market" component={HomeScreen} />
    <HomeStack.Screen name="ProductDetail" component={Details} />
  </HomeStack.Navigator>
);

const Navigation = () => {
  const totalItems = useSelector(
    (state) => state.cart.totalItems,
    shallowEqual
  );
  const totalFavorites = useSelector(
    (state) => state.favorites.favorites.length,
    shallowEqual
  );

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: "gray",
        tabBarLabelStyle: {
          display: "none",
        },
        tabBarStyle: {
          backgroundColor: colors.background,
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator} // Değişiklik burada
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "cart" : "cart-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarBadge: totalItems == 0 ? null : totalItems,
          headerShown: true,
          title: "Cart",
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.textTitle,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "heart" : "heart-outline"}
              size={size}
              color={color}
            />
          ),
          tabBarBadge: totalFavorites == 0 ? null : totalFavorites,
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTitleAlign: "center",
          headerTitleStyle: {
            color: colors.textTitle,
            fontWeight: "bold",
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <Ionicons
              name={focused ? "person" : "person-outline"}
              size={size}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default Navigation;

const styles = StyleSheet.create({});
