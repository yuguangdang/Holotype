import {
  FlatList,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import CategoryGridTile from "../components/CategoryGridTile";
import Colors from "../constants/Colors";
import { CATEGORIES } from "../data/dummyData";
import { useContext, useEffect } from "react";
import { AuthContext } from "../store/context/auth-context";
import { MyPostsContext } from "../store/context/myPostsContext";
import { fetchPosts } from "../util/http";

function CategoriesScreen({ navigation }) {

  const authCtx = useContext(AuthContext)
  const postsCtx = useContext(MyPostsContext)

  const showItemList = (title) => {
    navigation.navigate("ItemListScreen", {
      category: title,
    });
  };

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
  }, []);

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
          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            numColumns={2}
            renderItem={(itemData) => {
              return (
                <CategoryGridTile
                  title={itemData.item.title}
                  color={itemData.item.color}
                  numColumns={2}
                  onPress={showItemList.bind(this, itemData.item.title)}
                />
              );
            }}
          />
        </SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

export default CategoriesScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    opacity: 0.2,
  },
});
