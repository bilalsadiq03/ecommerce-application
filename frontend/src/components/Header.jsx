import React from 'react'

import { useGetTopproductsQuery } from '../redux/api/productApiSlice'
import Loader from './Loader';
import SmallProduct from '../pages/Products/SmallProduct';
import ProductCarousel from '../pages/Products/ProductCarousel';

const Header = () => {
    const {data, isLoading, isError} = useGetTopproductsQuery();
    
    if (isLoading){
        return <Loader />
    }
    
    if (isError){
        return <h1>Error</h1>
    }
    

    return (
        <>
        <div className="flex justify-around">
          <div className="xl:block lg:hidden md:hidden sm:hidden">
            <div className="grid grid-cols-2 px-4">
              {data.map((product) => (
                <div key={product._id}>
                  <SmallProduct product={product} />
                </div>
              ))}
            </div>
          </div>
          <ProductCarousel />
        </div>
      </>
  )
}

export default Header