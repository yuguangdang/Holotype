import {
  StyleSheet,
  View,
  SafeAreaView,
  Text,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useCallback, useContext, useEffect, useState } from "react";
import DropDownPicker from "react-native-dropdown-picker";

import Colors from "../constants/Colors";
import PrimaryButton from "../components/UI/PrimaryButton";
import Input from "../components/UI/Input";
import { storePost } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { AuthContext } from "../store/context/auth-context";
import ImagePicker from "../components/ImagePicker";
import LocationPicker from "../components/UI/LocationPicker";
import TitleText from "../components/UI/TitleText";
import HrLine from "../components/UI/HrLine";

function PostItemScreen({ navigation }) {
  DropDownPicker.setListMode("SCROLLVIEW");

  const authCtx = useContext(AuthContext);

  const [isSubmiting, setIsSubmiting] = useState(false);
  const [isInValid, setIsInValid] = useState(true);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    { label: "Mammals", value: "Mammals" },
    { label: "Birds", value: "Birds" },
    { label: "Reptiles", value: "Reptiles" },
    { label: "Amphibians", value: "Amphibians" },
    { label: "Fish", value: "Fish" },
    { label: "Insects", value: "Insects" },
    { label: "Plants", value: "Plants" },
    { label: "dinosaurs", value: "dinosaurs" },
  ]);

  const [post, setPost] = useState({
    title: "",
    category: "",
    description: "",
    imageUrl: "",
    location: "",
  });

  useEffect(() => {
    if (
      post.title.trim().length != 0 &&
      post.category != null &&
      post.description.trim().length != 0
    ) {
      setIsInValid(false);
    } else {
      setIsInValid(true);
    }
  }, [post]);

  const inputChangeHandler = (identifier, enteredValue) => {
    setPost((currentPost) => {
      return {
        ...currentPost,
        [identifier]: enteredValue,
      };
    });
  };

  const addImageHandler = (imageUrl) => {
    setPost((currentPost) => {
      return {
        ...currentPost,
        imageUrl: imageUrl,
      };
    });
  };

  const addLocationHandler = useCallback((location) => {
    setPost((currentPost) => {
      return {
        ...currentPost,
        location: location,
      };
    });
  }, []);

  async function addPostHandler() {
    setIsSubmiting(true);
    post.category = value;
    if (
      !post.category ||
      post.title.trim().length == 0 ||
      post.description.trim().length == 0
    ) {
      Alert.alert("Input cannot be empty.");
      return;
    }

    await storePost(post, authCtx.token)
      .then(() => {
        // addPost(post);
      })
      .catch((err) => {
        console.log(err);
      });

    setIsSubmiting(false);

    setPost({
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      location: "",
    });
    setValue("");
    navigation.navigate("ItemListScreen", {
      category: post.category,
    });
  }

  const cancelHandler = () => {
    setPost({
      title: "",
      category: "",
      description: "",
      imageUrl: "",
      location: "",
    });
    setValue("");
    navigation.navigate("CategoriesScreen");
  };

  return (
    <LinearGradient
      colors={[Colors.primary400, Colors.accent400]}
      style={styles.rootScreen}
    >
      {isSubmiting && <LoadingOverlay text={"Create your post ..."} />}
      <SafeAreaView>
        <KeyboardAvoidingView>
          <ScrollView>
            <View style={styles.createPostContainer}>
              <TitleText>Add photo</TitleText>
              <ImagePicker
                addImageHandler={addImageHandler}
                imageUrl={post.imageUrl}
              />
              <HrLine></HrLine>
              <TitleText>Add location</TitleText>
              <LocationPicker
                addLocationHandler={addLocationHandler}
                location={post.location}
              />
              <HrLine></HrLine>
              <TitleText>Add content</TitleText>

              <Input
                label="Title"
                textInputConfig={{
                  onChangeText: inputChangeHandler.bind(this, "title"),
                  value: post.title,
                }}
              />
              <Text style={styles.label}>Category</Text>
              <DropDownPicker
                scrollEnabled={true}
                style={styles.dropDownPicker}
                placeholderStyle={{
                  color: Colors.primary900,
                }}
                listParentLabelStyle={{
                  color: Colors.primary900,
                }}
                textStyle={{
                  color: Colors.primary900,
                }}
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                maxHeight={500}
                placeholder="Select a category"
              />
              <Input
                label="Description"
                textInputConfig={{
                  multiline: true,
                  onChangeText: inputChangeHandler.bind(this, "description"),
                  value: post.description,
                }}
              />

              <View style={styles.buttonContainer}>
                <PrimaryButton onPress={cancelHandler}>Cancel</PrimaryButton>
                <PrimaryButton
                  onPress={addPostHandler}
                  style={{ backgroundColor: Colors.accent600 }}
                  disabled={isInValid}
                >
                  Submit
                </PrimaryButton>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
}

export default PostItemScreen;

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
    paddingHorizontal: 20,
  },
  backgroundImage: {
    opacity: 0.2,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  createPostContainer: {
    marginTop: 20,
    marginBottom: "80%",
  },
  label: {
    fontSize: 12,
    color: Colors.primary900,
    marginBottom: 4,
  },
  dropDownPicker: {
    borderWidth: 0,
    backgroundColor: Colors.accent100,
    color: Colors.primary900,
  },
  input: {
    backgroundColor: Colors.accent100,
    color: Colors.primary900,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
});
