import { createContext, useState } from "react";

export const FavouritesContext = createContext({
  favourites: [],
  addFavourites: (item) => {},
  removeFavourites: (id) => {},
});

function CreateContextProvider({ children }) {
  const [favouriteProducts, setFavouriteProducts] = useState([]);

  const addFavourites = (item) => {
    setFavouriteProducts((currentfav) => [item, ...currentfav]);
  };

  const removeFavourites = (id) => {
    setFavouriteProducts((currentfav) =>
      currentfav.filter((item) => item._id != id)
    );
  };

  const value = {
    favourites: favouriteProducts,
    addFavourites: addFavourites,
    removeFavourites: removeFavourites,
  };
  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default CreateContextProvider;
