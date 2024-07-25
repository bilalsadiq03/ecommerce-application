import { useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import {
  addToFavourites,
  removeFromFavourites,
  setFavourites,
} from "../../redux/features/favourites/favouriteSlice";


import {
  addFavoriteToLocalStorage,
  getFavoritesFromLocalStorage,
    removeFavoriteFromLocalStorage,
} from "../../Utils/localStorage";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const HeartIcon = ({ product }) => {

  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const favorites = useSelector((state) => state.favourites) || [];
  const isFavourite = favorites.some((p) => p._id === product._id);
  // console.log(isFavourite)

  useEffect(() => {
    const favoritesFromLocalStorage =  getFavoritesFromLocalStorage();
    dispatch(setFavourites(favoritesFromLocalStorage));
  }, []);

  const toggleFavorites = () => {
    if (userInfo){
      if (isFavourite) {
        dispatch(removeFromFavourites(product));
        // remove the product from the localStorage as well
        removeFavoriteFromLocalStorage(product._id);
        
        
      } else {
        dispatch(addToFavourites(product));
        // add the product to localStorage as well
        addFavoriteToLocalStorage(product);
        
        
      }
    } else {
      toast.error("Please login to add to favourites")
      navigate("/login")
    }
  };

  return (
    <div
      className="absolute top-2 right-5 cursor-pointer"
      onClick={toggleFavorites}
    >
      {isFavourite ? (
        <FaHeart className="text-pink-500" />
      ) : (
        <FaRegHeart className="text-black" />
      )}
    </div>
  );
};

export default HeartIcon;