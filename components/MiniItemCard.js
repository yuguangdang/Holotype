import React, { useState, useContext } from "react";
import {
  Text,
  View,
  StyleSheet,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import Colors from "../constants/Colors";
import HeartButton from "./UI/HeartButton";
import { FavoriteContext } from "../store/context/favoriteContext";
import { MyPostsContext } from "../store/context/myPostsContext";

const MiniItemCard = ({ item, onShowDetail, isMyPost }) => {
  const navigation = useNavigation();

  const [isLoading, setIsLoading] = useState(true);

  const favoriteItemsCtx = useContext(FavoriteContext);
  const isFaved = favoriteItemsCtx.ids.includes(item.id);

  const postsCtx = useContext(MyPostsContext);
  const posts = postsCtx.myPosts;

  const imageUrl = item.imageUrl;

  const removeFavStatusHandler = (itemId) => {
    favoriteItemsCtx.removeFavorite(itemId);
  };

  const showDetailHandler = (id) => {
    item = posts.filter((post) => {
      return post.id == id;
    });
    navigation.navigate("DetailScreen", {
      item: item[0],
    });
  };

  return (
    <View style={styles.container}>
      <Pressable
        onPress={showDetailHandler.bind(this, item.id)}
        android_ripple={{ color: "#ccc" }}
        style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
      >
        <View style={styles.imageInnerContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </View>
        {isLoading && (
          <ActivityIndicator
            style={styles.activityIndicator}
            size="large"
            color={Colors.primary}
          />
        )}
      </Pressable>

      <View style={styles.titleContainer}>
        <Text style={styles.textColor}>{item.title}</Text>
        {!isMyPost && (
          <HeartButton
            icon={isFaved ? "heart" : "heart-outline"}
            color={isFaved ? "#cd4f43" : "gray"}
            onPress={removeFavStatusHandler.bind(this, item.id)}
          />
        )}
      </View>
    </View>
  );
};
export default MiniItemCard;

const styles = StyleSheet.create({
  container: {
    alignContent: "center",
    borderRadius: 8,
    backgroundColor: Colors.accent100,
    margin: 4,
    width: "48%",
    overflow: "hidden",
  },
  title: {},
  titleContainer: {
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
  },
  textColor: { color: Colors.primary900, marginRight: 10 },
  buttonPressed: {
    opacity: 0.5,
  },

  imageInnerContainer: {
    width: "100%",
    height: 150,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});
