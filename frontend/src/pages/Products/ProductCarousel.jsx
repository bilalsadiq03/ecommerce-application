import React from "react";
import {
  productApiSlice,
  useGetTopproductsQuery,
} from "../../redux/api/productApiSlice";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import moment from "moment";
import {
  FaBox,
  FaClock,
  FaShoppingCart,
  FaStar,
  FaStore,
} from "react-icons/fa";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopproductsQuery();
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <div className="mb-4 xl:block lg:block md:block">
      {isLoading ? null : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Slider
          {...settings}
          className=" xl:w-[40rem] lg:w-[40rem] md:w-[56rem] sm:w-[40rem] sm:block"
        >
          {products.map(
            ({
              productImage,
              _id,
              name,
              price,
              description,
              createdAt,
              numReviews,
              rating,
              stock,
            }) => (
              <div key={_id}>
                <img
                  src={productImage}
                  alt={name}
                  className="w-full rounded-lg object-cover h-[20rem] mb-2"
                />
                <div className="flex justify-between">
                  <div className="one w-1/2">
                    <h2 className="text-lg font-semibold">{name}</h2>
                    <p className="text-sm text-gray-500">
                      Price: ${price}
                    </p>{" "}
                    <br />
                    <br />
                    <p className="text-gray-600 ">
                      {description.substring(0, 170)}...
                    </p>
                  </div>
                  <div className="flex justify-between w-[20rem]">
                    <div className="one">
                      <h1 className="flex items-center mb-6">
                        <FaClock className="mr-2 " /> Added:{" "}
                        {moment(createdAt).fromNow()}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2 " /> Reviews: {numReviews}
                      </h1>
                    </div>

                    <div className="two">
                      <h1 className="flex items-center mb-6">
                        <FaStar className="mr-2" /> Ratings:{" "}
                        {Math.round(rating)}
                      </h1>
                      <h1 className="flex items-center mb-6">
                        <FaBox className="mr-2 " /> In Stock: {stock}
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            )
          )}
        </Slider>
      )}
    </div>
  );
};

export default ProductCarousel;
