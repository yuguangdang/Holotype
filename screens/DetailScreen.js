import React, { useContext, useEffect, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Image,
  TextInput,
  Alert,
  Pressable,
  Modal,
  SafeAreaView,
  ActivityIndicator,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import Colors from "../constants/Colors";
import PrimaryButton from "../components/UI/PrimaryButton";
import TitleText from "../components/UI/TitleText";
import NormalText from "../components/UI/NormalText";
import VoteBar from "../components/UI/VoteBar";
import HrLine from "../components/UI/HrLine";
import HeartButton from "../components/UI/HeartButton";
import { FavoriteContext } from "../store/context/favoriteContext";
import { MyPostsContext } from "../store/context/myPostsContext";
import IconButton from "../components/UI/IconButton";
import { deletePost, updatePost } from "../util/http";
import VerficationStatus from "../components/UI/VerficationStatus";
import { AuthContext } from "../store/context/auth-context";
import { getMapPreview } from "../util/location";
import MapView, { Marker } from "react-native-maps";

function DetailScreen({ route, navigation }) {
  const [isLoading, setIsLoading] = useState(true);

  const favoriteItemsCtx = useContext(FavoriteContext);
  const postsCtx = useContext(MyPostsContext);
  const authCtx = useContext(AuthContext);
  const item = route.params.item;
  const itemId = item.id;
  const removePost = postsCtx.removePost;
  const token = authCtx.token;
  // console.log(token);

  const isUserPostCreator = item.creatorId == authCtx.userId;

  const imageUrl = item.imageUrl;

  const dummyComment1 = {
    id: Math.random().toString(),
    text: "I blieve this is indeed a new species",
  };

  const dummyComment2 = {
    id: Math.random().toString(),
    text: "I don't think this is a new species becuase ...",
  };

  const [vote, setVote] = useState(item.vote);
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([dummyComment1, dummyComment2]);
  const [isVerified, setIsVerified] = useState(item.isVerified);
  const [isSolved, setIsSolved] = useState(item.isSolved);
  const [modalIsVisible, setModalIsVisible] = useState(false);

  const showMapHandler = () => {
    setModalIsVisible(true);
  };

  const closeMapHandler = () => {
    setModalIsVisible(false);
  };

  const inputChangeHandler = (enteredValue) => {
    setInput(enteredValue);
  };

  const addCommentHandler = () => {
    setComments((currentComments) => [
      ...currentComments,
      { id: Math.random().toString(), text: input },
    ]);
    setInput("");
  };

  const isFaved = favoriteItemsCtx.ids.includes(item.id);

  const changeFavStatusHandler = () => {
    if (isFaved) {
      favoriteItemsCtx.removeFavorite(itemId);
    } else {
      favoriteItemsCtx.addFavorite(itemId);
    }
  };

  const upVote = () => {
    setVote((vote) => {
      return vote + 1;
    });
  };

  const downVote = () => {
    if (vote == 0) {
      Alert.alert("Alert", "Vote can not be negative.");
      return;
    }
    setVote(vote - 1);
  };

  useEffect(() => {
    updatePost(itemId, vote, isVerified, isSolved)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [vote, isVerified, isSolved]);

  const commentsSection = comments
    .slice()
    .reverse()
    .map((comment) => {
      return (
        <View style={styles.sperationLine} key={comment.id}>
          <NormalText>{comment.text}</NormalText>
        </View>
      );
    });

  const removePostHandler = () => {
    Alert.alert("Alert", "Please confirm if you want to delete this post?", [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      {
        text: "Continue",
        onPress: () => {
          removePost(itemId);
          deletePost(itemId, token)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err);
            });
          navigation.navigate("ItemListScreen", {
            category: item.category,
          });
        },
      },
    ]);
  };

  const openInfoHandler = () => {
    Alert.alert(
      "Information",
      "Once a post has recieved 10 votes, it will be sent to taxonomists to review."
    );
  };

  const rejectHandler = () => {
    console.log("reject button pressed");
    setIsSolved(true);
  };

  const verifyHandler = () => {
    setIsVerified(true);
    setIsSolved(true);
  };

  let status;
  if (vote == 10 && !isSolved) {
    status = (
      <VerficationStatus text="To be verified ..." color={Colors.accent400} />
    );
  } else if (vote == 10 && isSolved && !isVerified) {
    status = <VerficationStatus text="Rejected" color={Colors.accent800} />;
  } else if (vote == 10 && isSolved && isVerified) {
    status = <VerficationStatus text="Verified" color={Colors.primary800} />;
  }

  const voteComponent = (
    <>
      <View style={{ alignItems: "center", marginBottom: 10 }}>
        <NormalText>{vote}/10</NormalText>
      </View>
      <VoteBar vote={vote}></VoteBar>
      <View style={styles.buttonsContainer}>
        <PrimaryButton onPress={downVote}>Downvote</PrimaryButton>
        <PrimaryButton
          style={{ backgroundColor: Colors.accent600 }}
          onPress={upVote}
        >
          Upvote
        </PrimaryButton>
      </View>
    </>
  );

  const waitingForReview = (
    <>
      {!authCtx.isExpert && (
        <NormalText>
          This post has been sent to taxonomists to review.
        </NormalText>
      )}

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <NormalText>Status: </NormalText>
        {status}
      </View>
      {authCtx.isExpert && !isSolved && (
        <View style={styles.expertButtonContainer}>
          <PrimaryButton
            onPress={rejectHandler}
            style={{ backgroundColor: Colors.accent600, flex: 1 }}
          >
            Reject
          </PrimaryButton>
          <PrimaryButton
            onPress={verifyHandler}
            style={{ backgroundColor: Colors.primary400, flex: 1 }}
          >
            Verify
          </PrimaryButton>
        </View>
      )}
    </>
  );

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.rootScreen}>
        <Modal visible={modalIsVisible} animationType="slide">
          <View
            style={{
              backgroundColor: Colors.primary900,
              paddingTop: 50,
              paddingBottom: 10,
              paddingHorizontal: 10,
            }}
          >
            <IconButton
              icon="ios-arrow-back"
              size={34}
              color="white"
              onPress={closeMapHandler}
            ></IconButton>
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: item.lat,
              longitude: item.lng,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              title="Species Location"
              coordinate={{
                latitude: item.lat,
                longitude: item.lng,
              }}
            />
          </MapView>
        </Modal>

        <View style={styles.imageInnerContainer}>
          <Image
            style={styles.image}
            source={{ uri: imageUrl }}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
          {isLoading && (
            <ActivityIndicator
              style={styles.activityIndicator}
              size="large"
              color={Colors.primary}
            />
          )}
        </View>

        <View style={styles.container}>
          <TitleText style={{ fontWeight: "bold" }}>
            ({item.creatorName}) {item.title}{" "}
          </TitleText>
          <View style={styles.titleContainer}>
            <View style={styles.titleContainerLeft}>
              <HeartButton
                icon={isFaved ? "heart" : "heart-outline"}
                color={isFaved ? "#cd4f43" : "gray"}
                onPress={changeFavStatusHandler}
              />
            </View>
            {isUserPostCreator && (
              <IconButton
                onPress={removePostHandler}
                icon="trash-bin"
                color="#962626"
                size="20"
              />
            )}
          </View>
          <HrLine />

          <TitleText>Description</TitleText>
          <NormalText>{item.description}</NormalText>
          <HrLine />

          <Pressable onPress={showMapHandler}>
            <View style={styles.mapPreview}>
              <Image
                style={styles.image}
                source={{
                  uri: getMapPreview(item.lat, item.lng),
                }}
                // source={{ uri: getMapPreview(randomLat, randomLng) }}
              />
            </View>
          </Pressable>
          <NormalText>{item.address}</NormalText>
          <HrLine />

          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TitleText style={{ paddingRight: 8 }}>Vote</TitleText>
            <IconButton
              onPress={openInfoHandler}
              icon="information-circle"
              color={Colors.accent400}
              size="20"
            />
          </View>
          {vote == 10 ? waitingForReview : voteComponent}
          <HrLine />

          <TitleText>Comments</TitleText>
          <View style={styles.commentContainer}>
            <TextInput
              style={styles.input}
              placeholder="Say something ..."
              onChangeText={inputChangeHandler}
              value={input}
            ></TextInput>
            <Ionicons
              style={styles.sendIcon}
              name="ios-send"
              size={24}
              color={input ? Colors.accent400 : "grey"}
              onPress={input ? addCommentHandler : null}
            />
          </View>
          {commentsSection}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    alignItems: "center",
    paddingBottom: "50%",
  },
  imageInnerContainer: {
    width: "100%",
    height: 250,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  container: {
    padding: 15,
    width: "100%",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flex: 1,
  },
  titleContainerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  sperationLine: {
    borderTopColor: "black",
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 10,
    paddingVertical: 10,
  },
  commentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    backgroundColor: Colors.accent100,
    padding: 8,
    borderRadius: 5,
    flex: 1,
  },
  sendIcon: {
    marginHorizontal: 8,
  },
  expertButtonContainer: {
    marginTop: "5%",
    // flexDirection: "row",
    // justifyContent: "space-around"
  },
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  map: {
    flex: 1,
  },
  activityIndicator: {
    position: "absolute",
    top: "50%",
    left: "50%",
  },
});

export default DetailScreen;
