import { createContext, useEffect, useState } from "react";
import { fetchPosts } from "../../util/http";

export const MyPostsContext = createContext({
  myPosts: [],
  getPosts: (posts) => {},
  addPost: (post) => {},
  removePost: (id) => {},
});

const MyPostsContextProvider = ({ children }) => {
  const [myPosts, setMyPosts] = useState();

  const getPosts = (posts) => {
    setMyPosts(posts);
  };

  // useEffect(() => {
  //   fetchPosts().then((posts) => {
  //     console.log(posts);
  //     setMyPosts(posts);
  //   });
  // }, []);

  const addPost = (post) => {
    setMyPosts((currentPosts) => {
      console.log(currentPosts);
      return [
        ...currentPosts,
        {
          id: post.id,
          userName: "YG",
          title: post.title,
          category: post.category,
          description: post.description,
          vote: 0,
        },
      ];
    });
  };

  const removePost = (postId) => {
    setMyPosts((currentPosts) => {
      return currentPosts.filter((post) => {
        return post.id !== postId;
      });
    });
  };

  const value = {
    myPosts: myPosts,
    getPosts: getPosts,
    addPost: addPost,
    removePost: removePost,
  };

  return (
    <MyPostsContext.Provider value={value}>{children}</MyPostsContext.Provider>
  );
};

export default MyPostsContextProvider;
