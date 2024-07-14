import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { useAllProductsQuery, useGetProductsQuery } from '../redux/api/productApiSlice'
import Loader from "../components/Loader"
import Header from "../components/Header"
import Message from "../components/Message"
import Product from './Products/Product'


const Home = () => {
    const { keyword } = useParams()
    const {data, isLoading, isError} = useAllProductsQuery({keyword})
    console.log(data)
    if (isLoading){
        return <Loader/>
    } 

    if(isError){
        return <h1>ERROR</h1>
    }

  return (
    <>
       {!keyword ?  <Header /> : null}  
       {isLoading ? <Loader /> : isError ?  (<Message variant='danger'>
        {isError?.data.message || isError.error}
       </Message>) : (
        <>
            <div className='flex justify-between items-center '>
                <h1 className='ml-[20rem] mt-2 text-[3rem]'>Latest Products</h1>
                <Link 
                    to='/shop' 
                    className='bg-pink-600 text-white font-bold rounded-full py-2 px-10 mr-[18rem] mt-2'
                >
                    Shop
                </Link>
                </div>
            
                <div className="flex justify-center flex-wrap mt-2">
                    { data.map((product) => (
                        <div key={product._id}>
                            <Product product={product} />
                        </div>
                        ))
                    }
                </div>

            
        </>
       )}
    </>
    
  )
}

export default Home