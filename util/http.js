import axios from "axios";
import FormData from "form-data";

import { BAKCEND_URL } from "../constants/BackendUrl";

export async function storePost(postItem, token) {
  let data = new FormData();
  data.append("title", postItem.title);
  data.append("category", postItem.category);
  data.append("description", postItem.description);
  data.append("lat", postItem.location.lat);
  data.append("lng", postItem.location.lng);
  data.append("address", postItem.location.address);
  data.append("image", {
    uri: postItem.imageUrl,
    name: "uploadImage.jpg",
  });

  console.log(postItem);
  const httpUrl = BAKCEND_URL + "/feed/posts?token=" + token;
  const response = await axios.post(httpUrl, data);
  return response;
}

export async function fetchPosts(token) {
  const response = await axios.get(BAKCEND_URL + "/feed/posts?token=" + token);
  const posts = response.data.posts.map((post) => {
    console.log("This is the public url:" + post.imageUrl);
    return {
      id: post.id,
      title: post.title,
      category: post.category,
      description: post.description,
      imageUrl: post.imageUrl,
      creatorId: post.creatorId.toString(),
      creatorName: post.creatorName,
      lat: post.lat,
      lng: post.lng,
      address: post.address,
      vote: post.vote,
      isVerified: post.isVerified,
      isSolved: post.isSolved,
    };
  });
  return posts;
}

export async function deletePost(postId, token) {
  console.log(token);
  const response = await axios.delete(
    BAKCEND_URL + "/feed/post/" + postId + "?token=" + token
  );
  return response.data;
}

export async function updatePost(postId, vote, isVerified, isSolved) {
  const response = await axios.put(BAKCEND_URL + "/feed/post/" + postId, {
    vote: vote,
    isVerified: isVerified,
    isSolved: isSolved,
  });
  return response.data;
}

export async function createUser(user) {
  console.log(user);
  const response = await axios.post(BAKCEND_URL + "/auth/signup", user);
  return response.data;
}

export async function login(user) {
  console.log(user);
  const response = await axios.post(BAKCEND_URL + "/auth/login", user);
  return response;
}