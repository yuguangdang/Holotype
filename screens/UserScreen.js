import { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Pressable,
  Alert,
  Image,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

import MiniItemCard from "../components/MiniItemCard";
import { FavoriteContext } from "../store/context/favoriteContext";
import Colors from "../constants/Colors";
import TitleText from "../components/UI/TitleText";
import NormalText from "../components/UI/NormalText";
import { MyPostsContext } from "../store/context/myPostsContext";
import IconButton from "../components/UI/IconButton";
import { AuthContext } from "../store/context/auth-context";

function UserScreen({ navigation }) {
  const favoriteItemIds = useContext(FavoriteContext);
  const favedItemIds = favoriteItemIds.ids;

  const postsCtx = useContext(MyPostsContext);
  const authCtx = useContext(AuthContext);
  const posts = postsCtx.myPosts;
  const myPosts = posts.filter((post) => {
    return post.creatorId == authCtx.userId;
  });

  const favedItems = posts.filter((item) => favedItemIds.includes(item.id));

  const [isJournalsShown, setIsJournalsShown] = useState(true);

  const switchHandler = () => {
    isJournalsShown ? setIsJournalsShown(false) : setIsJournalsShown(true);
  };

  const journals =
    myPosts.length > 0 ? (
      <View>
        <FlatList
          data={myPosts}
          keyExtractor={(item) => item.id}
          numColumns={2}
          renderItem={(itemData) => {
            return <MiniItemCard item={itemData.item} isMyPost={true} />;
          }}
        />
      </View>
    ) : (
      <NormalText>You have not written any journal yet.</NormalText>
    );
  const likes =
    favedItems.length > 0 ? (
      <FlatList
        data={favedItems}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={(itemData) => {
          return <MiniItemCard item={itemData.item} />;
        }}
      />
    ) : (
      <NormalText>You have not favored any journal yet.</NormalText>
    );

  const logoutHandler = () => {
    Alert.alert("Alert", "Do you want to logout?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          authCtx.logout();
          console.log(authCtx.isAuthenticated);
          navigation.navigate("LoginScreen");
        },
      },
    ]);
  };

  useEffect(() => {
    if (authCtx.isExpert) {
      setIsJournalsShown(false);
    }
  }, []);

  const dashBoard = !authCtx.isExpert ? (
    <View style={styles.titleContainer}>
      <Pressable onPress={switchHandler}>
        <TitleText
          style={isJournalsShown ? styles.activeStyle : styles.nonActiveStyle}
        >
          My Journals ({myPosts.length})
        </TitleText>
      </Pressable>
      <Pressable onPress={switchHandler}>
        <TitleText
          style={!isJournalsShown ? styles.activeStyle : styles.nonActiveStyle}
        >
          My Likes ({favedItems.length})
        </TitleText>
      </Pressable>
    </View>
  ) : (
    <View style={styles.titleContainer}>
      <Pressable>
        <TitleText
          style={!isJournalsShown ? styles.activeStyle : styles.nonActiveStyle}
        >
          My Likes ({favedItems.length})
        </TitleText>
      </Pressable>
    </View>
  );

  return (
    <View contentContainerStyle={styles.container}>
      <LinearGradient
        colors={[Colors.primary400, Colors.accent400]}
        style={styles.userInfoSection}
      >
        <View style={styles.logout}>
          <IconButton
            icon="arrow-forward-circle-outline"
            onPress={logoutHandler}
            size={24}
            color={Colors.primary900}
          ></IconButton>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            alignItems: 'center',
          }}
        >
          <View style={styles.profileContainer}>
            <Image
              style={styles.profilePicture}
              source={require("../assets/images/background.png")}
            />
          </View>
          <View style={styles.userContainer}>
            <View style={styles.userInfoContainer}>
              <TitleText>Name: </TitleText>
              <NormalText>{authCtx.name}</NormalText>
            </View>
            <View style={styles.userInfoContainer}>
              <TitleText>Email: </TitleText>
              <NormalText>{authCtx.email}</NormalText>
            </View>
            <View style={styles.userInfoContainer}>
              <TitleText>Title: </TitleText>
              <NormalText>
                {authCtx.isExpert ? "Taxonomist" : "Amateur"}
              </NormalText>
            </View>
          </View>
        </View>
      </LinearGradient>
      <View style={styles.statsContainer}>
        {dashBoard}
        {isJournalsShown ? journals : likes}
      </View>
    </View>
  );
}

export default UserScreen;

const styles = StyleSheet.create({
  userInfoSection: {
    paddingTop: "10%",
    paddingHorizontal: "4%",
  },
  logout: {
    alignItems: "flex-end",
  },
  userContainer: {
    padding: "5%",
    overflow: "hidden",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    padding: 2,
    width: "100%",
    height: 600,
    overflow: "auto",
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 0.2,
    borderColor: "gray",
    marginBottom: 12,
  },
  activeStyle: {
    fontSize: 16,
    color: Colors.primary800,
    fontWeight: "bold",
  },
  nonActiveStyle: {
    fontSize: 16,
    color: "gray",
  },
  profileContainer: {
    width: 90,
    height: 90,
    borderRadius: 90,
    overflow: "hidden",
  },
  profilePicture: {
    width: "100%",
    height: "100%",
  },
});
