import { createContext, useState } from "react";

export const FavoriteContext = createContext({
  ids: [0],
  addFavorite: (id) => {},
  removeFavorite: (id) => {},
});

const FavoriteContextProvider = ({ children }) => {
  const [favoriteItemIds, setFavoriteItemIds] = useState([]);

  const addFavorite = (id) => {
    setFavoriteItemIds((currentFavItemIds) => [...currentFavItemIds, id]);
  };

  const removeFavorite = (id) => {
    setFavoriteItemIds((currentFavItemIds) =>
      currentFavItemIds.filter((favItemId) => favItemId !== id)
    );
  };

  const value = {
    ids: favoriteItemIds,
    addFavorite: addFavorite,
    removeFavorite: removeFavorite,
  };

  return (
    <FavoriteContext.Provider value={value}>
      {children}
    </FavoriteContext.Provider>
  );
};

export default FavoriteContextProvider;
