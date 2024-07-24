import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useCreateReviewMutation, useGetProductDetailsQuery } from '../../redux/api/productApiSlice'
import Loader from '../../components/Loader'
import Message from '../../components/Message'
import {
    FaBox,
    FaClock,
    FaShoppingCart,
    FaStar,
    FaStore,
  } from "react-icons/fa";
import moment from 'moment'
import HeartIcon from './HeartIcon'
import Ratings from './Ratings'
import ProductTab from './ProductTab'
import { addToCart } from '../../redux/features/cart/cartSlice'




const ProductDetails = () => {
    const { id: productId } = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [createReview, { isLoading: loadingProductReview }] = useCreateReviewMutation()
    const {
        data: product,
        isLoading,
        refetch,
        error,
      } = useGetProductDetailsQuery(productId);

    const { userInfo } = useSelector((state) => state.auth)

    const [qty, setQty] = useState(0)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const submitHandler = async (e) => {
      e.preventDefault();
  
      try {
        await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        refetch();
        toast.success("Review created successfully");
      } catch (error) {
        console.log(error)
        toast.error(error?.data || error.message);
      }
    };

    const addToCartHandler = () => {
      if (userInfo) {
        dispatch(addToCart({ ...product, qty}))
        navigate('/cart')
      } else {
        navigate('/login?redirect=/cart');
      }
    }




  return (
    <>
      <div>
        <Link to="/" className="font-semibold hover:underline ml-14">
          Go Back
        </Link>
      </div>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
        <div className="flex relative items-between mt-[2rem] ml-14 w-full">
            <div>
              <img
                src={`http://localhost:8080/${product.productImage}`}
                alt={product.name}
                className="w-full xl:w-[40rem] lg:w-[40rem] md:w-[30rem] sm:w-[20rem] mr-[2rem]"
              />

              <HeartIcon product={product} />
            </div>

            <div className="flex flex-col justify-between">
              <h2 className="text-2xl font-semibold">{product.name}</h2>
              <p className="my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-[#B0B0B0]">
                {product.description}
              </p>

              <p className="text-5xl my-4 font-extrabold">$ {product.price}</p>
              <div className='flex items-center justify-between w-[20rem]'>
                <div className='one'>
                  <h1 className='flex items-center mb-6'>
                    <FaClock className='mr-2 ' /> Added: {" "}
                    {moment(product.createAt).fromNow()}
                  </h1>
                  <h1 className='flex items-center mb-6'>
                    <FaStar className='mr-2 ' /> Reviews: {" "}
                    {product.numReviews}
                  </h1>
                </div>
                <div className="two">
                  <h1 className="flex items-center mb-6">
                    <FaStar className='mr-2'/> Ratings: {rating}
                  </h1>
                  <h1 className="flex items-center mb-6">
                    <FaShoppingCart className='mr-2'/> Quantity: {product.stock}
                  </h1>
                </div>
              </div>
              <div className="flex justify-between flex-wrap">
              <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
              />
                
                {product.stock > 0 && (
                  <div>
                    <select
                      value={qty}
                      onChange={(e) => setQty(e.target.value)}
                      className="p-2 w-[6rem] rounded-lg text-black"
                    >
                      {[...Array(product.stock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                          {x + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div className="btn-container">
                <button
                  onClick={addToCartHandler}
                  disabled={product.stock === 0}
                  className="bg-pink-600 text-white py-2 px-4 rounded-lg mt-4 md:mt-0"
                >
                  Add To Cart
                </button>
              </div>
            </div> 
            
          </div>
          <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-[10rem]">
              <ProductTab
                loadingProductReview={loadingProductReview}
                userInfo={userInfo}
                submitHandler={submitHandler}
                rating={rating}
                setRating={setRating}
                comment={comment}
                setComment={setComment}
                product={product}
              />
            </div>
        </>
      )}
    </>
  );
}

export default ProductDetails