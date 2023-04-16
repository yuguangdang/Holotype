import { useFonts } from "expo-font";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";

import ItemListScreen from "./screens/ItemListScreen.js";
import LoginScreen from "./screens/LoginScreen.js";
import Colors from "./constants/Colors.js";
import CategoriesScreen from "./screens/CategoriesScreen.js";
import DetailScreen from "./screens/DetailScreen.js";
import UserScreen from "./screens/UserScreen.js";
import PostItemScreen from "./screens/PostItemScreen.js";
import FavoriteContextProvider from "./store/context/favoriteContext.js";
import MyPostsContextProvider from "./store/context/myPostsContext.js";
import AuthcontextProvider, {
  AuthContext,
} from "./store/context/auth-context.js";
import { useContext } from "react";
import WaitingListScreen from "./screens/WaitingListScreen.js";
import Map from "./screens/Map.js";

const Stack = createNativeStackNavigator();
const BottomTab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: {
          backgroundColor: "#cae0ac",
        },
        headerTintColor: "white",
        headerTitleStyle: { fontFamily: "Baskerville-Bold", fontSize: 18 },
      }}
    >
      <Stack.Screen
        name={"CategoriesScreen"}
        component={CategoriesScreen}
        options={{
          title: "All Categories",
          headerStyle: {
            backgroundColor: Colors.primary900,
          },
        }}
      />
      <Stack.Screen
        name={"ItemListScreen"}
        component={ItemListScreen}
        options={{
          title: "Journals",
          headerStyle: {
            backgroundColor: Colors.primary900,
          },
        }}
      />
      <Stack.Screen
        name={"DetailScreen"}
        component={DetailScreen}
        options={{
          title: "Species Detail",
          headerStyle: {
            backgroundColor: Colors.primary900,
          },
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: "Map",
          headerStyle: {
            backgroundColor: Colors.primary900,
          },
        }}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [fontsLoaded] = useFonts({
    caveat: require("./assets/fonts/Caveat_400Regular.ttf"),
    indieFlower: require("./assets/fonts/IndieFlower_400Regular.ttf"),
  });

  const authCtx = useContext(AuthContext);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <FavoriteContextProvider>
      <MyPostsContextProvider>
        <NavigationContainer>
          <BottomTab.Navigator
            initialRouteName="LoginScreen"
            screenOptions={{
              tabBarActiveTintColor: Colors.primary800,
              headerShown: false,
              tabBarStyle: {
                backgroundColor: Colors.accent100,
              },
            }}
          >
            <BottomTab.Screen
              name="StackNavigator"
              component={StackNavigator}
              options={{
                tabBarButton: () => null,
              }}
            />
            <BottomTab.Screen
              name={"LoginScreen"}
              component={LoginScreen}
              options={{
                tabBarButton: () => null,
                tabBarStyle: { display: "none" },
              }}
            />
            {}

            <BottomTab.Screen
              name="CategoriesScreen"
              component={CategoriesScreen}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <Entypo name="dial-pad" size={size} color={color} />;
                },
                title: "Categories",
              }}
            />
            {authCtx.isExpert ? (
              <BottomTab.Screen
                name="WaitingListScreen"
                component={WaitingListScreen}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return <Ionicons name="list" size={size} color={color} />;
                  },
                  title: "Waiting list",
                }}
              />
            ) : (
              <BottomTab.Screen
                name="PostItemScreen"
                component={PostItemScreen}
                options={{
                  tabBarIcon: ({ color, size }) => {
                    return (
                      <Entypo name="squared-plus" size={size} color={color} />
                    );
                  },
                  title: "Add New",
                }}
              />
            )}

            <BottomTab.Screen
              name={"UserScreen"}
              component={UserScreen}
              options={{
                tabBarIcon: ({ color, size }) => {
                  return <Ionicons name="person" color={color} size={size} />;
                },
                title: "Me",
              }}
            />
          </BottomTab.Navigator>
        </NavigationContainer>
      </MyPostsContextProvider>
    </FavoriteContextProvider>
  );
};

export default function AppWrapper() {
  return (
    <AuthcontextProvider>
      <App />
    </AuthcontextProvider>
  );
}
