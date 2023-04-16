import { useContext, useEffect } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useIsFocused } from "@react-navigation/native";

import ItemCard from "../components/ItemCard.js";
import Colors from "../constants/Colors";
import { MyPostsContext } from "../store/context/myPostsContext.js";
import { AuthContext } from "../store/context/auth-context.js";
import { fetchPosts } from "../util/http.js";

function WaitingListScreen({ navigation }) {
  const postsCtx = useContext(MyPostsContext);
  const isFocused = useIsFocused();
  const authCtx = useContext(AuthContext)

  useEffect(() => {
    async function getPosts() {
      let posts;
      try {
        posts = await fetchPosts(authCtx.token);
        postsCtx.getPosts(posts);
      } catch (err) {
        console.log(err);
      }
    }
    getPosts();
  }, [isFocused]);

  const posts = postsCtx.myPosts.filter((post) => {
    return post.vote == 10 && !post.isSolved;
  });

  const showDetailHandler = (item) => {
    navigation.navigate("DetailScreen", {
      item: item,
    });
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
        <SafeAreaView>
          <View>
            <FlatList
              data={posts}
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
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default WaitingListScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
