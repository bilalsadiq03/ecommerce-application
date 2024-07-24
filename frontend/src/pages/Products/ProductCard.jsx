import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import HeartIcon from './HeartIcon'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { addToCart } from '../../redux/features/cart/cartSlice'
 


const ProductCard = ({p}) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { userInfo } =useSelector((state) => state.auth);

    const addToCartHandler = (product, qty) => {
        if (userInfo){
          dispatch(addToCart({ ...product, qty}))
          toast.success('Item added successfully')
        } else {
          toast.error('Please login to add items to cart');
          navigate('/login');
        }
    }
    
  return (
    <div className="max-w-sm relative bg-[#1A1A1A] rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <section className="relative ">
        <Link to={`/product/${p._id}`}>
          <span className="absolute bottom-3 right-3 bg-pink-100 text-pink-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-pink-900 dark:text-pink-300">
            {p.name}
          </span>

          <img
            className="cursor-pointer w-full"
            src={`http://localhost:8080/${p.productImage}`}
            alt={p.name}
            style={{ height: "170px", objectFit: "cover" }}
          />

        </Link>
        <HeartIcon product={p} />
      </section>

      <div className="py-2 px-4 ">
        <div className="flex justify-between">
          <h5 className="text-white mb-1 text-md  dark:text-white">
            {p?.name}
          </h5>

          <p className="font-semibold text-pink-500">
            {p?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}
          </p>
        </div>
      </div>


      <p className="px-4 py-1 mb-1 font-normal text-[#CFCFCF]">
        {p?.description?.substring(0, 60)} ...
      </p>


      <section className="px-4 py-2 flex justify-between items-center">
          <Link
            to={`/product/${p._id}`}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-pink-700 rounded-lg hover:bg-pink-800 focus:ring-4 focus:outline-none focus:ring-pink-300 dark:bg-pink-600 dark:hover:bg-pink-700 dark:focus:ring-pink-800"
          >
            Read More
            <svg
              className="w-3.5 h-3.5 ml-2"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 10"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M1 5h12m0 0L9 1m4 4L9 9"
              />
            </svg>
          </Link>

          <button
            className="rounded-full"
            onClick={() => addToCartHandler(p, 1)}
          >
            <AiOutlineShoppingCart size={25} className='text-white' />
          </button>
        </section>



    </div>
  );
}

export default ProductCard