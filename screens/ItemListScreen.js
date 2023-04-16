import { useContext, useEffect, useState, useLayoutEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  ImageBackground,
  Button,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import ItemCard from "../components/ItemCard.js";
import Colors from "../constants/Colors";
// import { MyPostsContext } from "../store/context/myPostsContext";
import { fetchPosts } from "../util/http.js";
import { MyPostsContext } from "../store/context/myPostsContext.js";
import { AuthContext } from "../store/context/auth-context.js";

export default function ItemListScreen({ route, navigation }) {
  const category = route.params.category;
  const [posts, setPosts] = useState([]);
  const [filterdPosts, setFilteredPosts] = useState([]);
  const [filter, setFilter] = useState("All");
  const isFocused = useIsFocused();

  const authCtx = useContext(AuthContext);
  const postsCtx = useContext(MyPostsContext);

  useEffect(() => {
    async function getPosts() {
      let posts;
      try {
        posts = await fetchPosts(authCtx.token);
        postsCtx.getPosts(posts);
        posts = posts.filter((post) => {
          return post.category == category;
        });
        posts = posts.slice().reverse();
        setPosts(posts);
        setFilteredPosts(posts);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, [isFocused]);

  // let posts = postsCtx.myPosts;
  // posts = posts.filter((post) => {
  //   return post.category == category;
  // });
  // console.log(posts);

  useLayoutEffect(() => {
    navigation.setOptions({ title: category });
  }, [navigation, category]);

  const showDetailHandler = (item) => {
    navigation.navigate("DetailScreen", {
      item: item,
    });
  };

  const setFilterHandler = (filterValue) => {
    setFilter(filterValue);
    switch (filterValue) {
      case "All":
        setFilteredPosts(posts);
        break;
      case "Vote":
        setFilteredPosts(
          posts.filter((post) => {
            return post.vote < 10;
          })
        );
        break;
      case "Review":
        setFilteredPosts(
          posts.filter((post) => {
            return post.vote == 10 && !post.isSolved;
          })
        );
        break;
      case "Verified":
        setFilteredPosts(
          posts.filter((post) => {
            return post.isVerified;
          })
        );
        break;
      case "Rejected":
        setFilteredPosts(
          posts.filter((post) => {
            return post.isSolved && !post.isVerified;
          })
        );
        break;
    }
  };

  return (
    <LinearGradient
      colors={[Colors.primary400, Colors.accent400]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("../assets/images/background.png")}
        resizeMode="cover"
        style={styles.rootScreen}
        imageStyle={styles.backgroundImage}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: Colors.primary900,
          }}
        >
          <Button
            title="All"
            onPress={setFilterHandler.bind(this, "All")}
            color={filter == "All" ? Colors.accent600 : Colors.accent100}
          />
          <Button
            title="Vote"
            onPress={setFilterHandler.bind(this, "Vote")}
            color={filter == "Vote" ? Colors.accent600 : Colors.accent100}
          />
          <Button
            title="Review"
            onPress={setFilterHandler.bind(this, "Review")}
            accent600
            color={filter == "Review" ? Colors.accent600 : Colors.accent100}
          />
          <Button
            title="Verified"
            onPress={setFilterHandler.bind(this, "Verified")}
            color={filter == "Verified" ? Colors.accent600 : Colors.accent100}
          />
          <Button
            title="Rejected"
            onPress={setFilterHandler.bind(this, "Rejected")}
            color={filter == "Rejected" ? Colors.accent600 : Colors.accent100}
          />
        </View>

        <View>
          <FlatList
            data={filterdPosts}
            renderItem={(itemData) => {
              return (
                <ItemCard
                  item={itemData.item}
                  onShowDetail={showDetailHandler.bind(this, itemData.item)}
                />
              );
            }}
            keyExtractor={(item) => item.id}
          />
        </View>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
