import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useUploadProductImageMutation, useCreateProductMutation } from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApiSlice'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import AdminMenu from './AdminMenu'


const ProductList = () => {

    const [image, setImage] = useState()
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [stock, setStock] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const navigate =  useNavigate()

    const dispatch = useDispatch()
    
    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()

    const {data: categories} =  useFetchCategoriesQuery()


    const handleSubmit = async (e) => {
      e.preventDefault();
  
      try {  
        const productData = new FormData();
        productData.append("productImage", image);
        productData.append("name", name);
        productData.append("description", description);
        productData.append("price", price);
        productData.append("category", category);
        productData.append("countInStock", stock);
        
        const result  = await createProduct(productData);
      
        console.log(result.data)
        
        if (result?.error) {
          toast.error("Product create failed. Try Again.");
        } else {
          toast.success(`${result?.name} is created`);
          navigate("/");
        }
      } catch (error) {
        console.error(error);
        toast.error("Product create failed. Try Again.");
      }
    };
  

    const uploadFileHandler = async(e) => {
      const formData = new FormData()
      formData.append('productImage', e.target.files[0])

      try {
            
        const res = await uploadProductImage(formData).unwrap()
        console.log(res)
        toast.success(res.message);
        setImage(res.productImage)
      } catch (error) {
          toast.error(error?.data?.message || error.error || "An error occurred")
        } 
  }



  return (
    <div className=" xl:mx-[15rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Create Product</div>

        {imageUrl && (
          <div className="text-center">
            <img
              src={`/api/${imageUrl}`}
              alt="Error loading image..."
              className="block mx-auto max-h-[200px]"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border px-4 block w-full text-center rounded-lg cursor-pointer py-11">
            {image ? image.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!image ? "hidden" : "text-white"}
            />
          </label>
        </div>

        <div className="p-3">
          <div className="flex flex-wrap">
            <div className="one">
              <label htmlFor="name">Name</label> <br />
              <input
                type="text"
                className="px-4 py-2 mb-3 w-[30rem] border rounded-lg "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="two ">
              <label htmlFor="name block">Price</label> <br />
              <input
                type="number"
                className="px-4 py-2 mb-3 w-[30rem] border rounded-lg"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
          </div>
          

          <label htmlFor="" className="my-5">
            Description
          </label>
          <textarea
            type="text"
            className="px-4 py-2 mb-3 border rounded-lg w-[95%] "
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div className="flex justify-between">
            <div>
              <label htmlFor="name block">Count In Stock</label> <br />
              <input
                type="text"
                className=" px-4 py-2 mb-3 w-[15rem] border rounded-lg "
                value={stock}
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Category</label> <br />
              <select
                placeholder="Choose Category"
                className="px-4 py-2 mb-3 w-[15rem] border rounded-lg "
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories?.map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-white mt-5 rounded-lg font-semibold bg-pink-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
    </div>
);
};

export default ProductList