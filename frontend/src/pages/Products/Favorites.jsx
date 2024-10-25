import { useSelector } from "react-redux";
import { selectFavoriteProduct } from "../../redux/features/favourites/favouriteSlice";
import Product from "./Product";

const Favorites = () => {
  const favorites = useSelector(selectFavoriteProduct);


  return (
    <div className="ml-[12rem]">
      <h1 className="text-xl font-bold ml-[3rem] mt-[3rem]">
        FAVORITE PRODUCTS
      </h1>

      <div className="flex flex-wrap">
        {favorites.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Favorites;