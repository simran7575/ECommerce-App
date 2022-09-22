import { createContext, useReducer, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const FavouritesContext = createContext({
  user: {},
  authenticate: (token) => {},
  logout: () => {},
  addUserDetails: (user) => {},
  addFavourites: (item) => {},
  addCategories: (categoryList) => {},
  removeFavourites: (id) => {},
});

const user = {
  token: "",
  isAuthenticated: !!this.token,
  userDetails: {},
  favourites: [],
  categories: [],
};

function userReducer(state, action) {
  switch (action.type) {
    case "AUTHENTICATE":
      AsyncStorage.setItem("token", action.payload);
      return { ...state, token: action.payload, isAuthenticated: true };
    case "DETAILS":
      return { ...state, userDetails: action.payload };
    case "ADDFAVOURITES":
      return { ...state, favourites: [action.payload, ...state.favourites] };
    case "ADDCATEGORIES":
      return { ...state, categories: action.payload };
    case "REMOVEFAVOURITES":
      return state.favourites.filter((item) => item._id !== action.payload);
    case "LOGOUT":
      AsyncStorage.removeItem("token");
      return { ...state, token: action.payload, isAuthenticated: false };
    default:
      return state;
  }
}

function CreateContextProvider({ children }) {
  const [userState, dispatch] = useReducer(userReducer, user);
  //const [favouriteProducts, setFavouriteProducts] = useState([]);

  function authenticate(token) {
    dispatch({
      type: "AUTHENTICATE",
      payload: token,
    });
  }

  function logout() {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
  }
  function addUserDetails(user) {
    dispatch({
      type: "DETAILS",
      payload: user,
    });
  }

  function addFavourites(item) {
    dispatch({
      type: "ADDFAVOURITES",
      payload: item,
    });
    // setFavouriteProducts((currentfav) => [item, ...currentfav]);
  }

  function addCategories(categoryList) {
    dispatch({
      type: "ADDCATEGORIES",
      payload: categoryList,
    });
    // setFavouriteProducts((currentfav) => [item, ...currentfav]);
  }

  const removeFavourites = (id) => {
    dispatch({
      type: "REMOVEFAVOURITES",
      payload: id,
    });
  };

  const value = {
    user: userState,
    authenticate: authenticate,
    logout: logout,
    addUserDetails: addUserDetails,
    addFavourites: addFavourites,
    removeFavourites: removeFavourites,
    addCategories: addCategories,
  };
  return (
    <FavouritesContext.Provider value={value}>
      {children}
    </FavouritesContext.Provider>
  );
}

export default CreateContextProvider;
