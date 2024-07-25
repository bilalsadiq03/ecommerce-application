import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDeleteProductMutation,
        useGetProductByIdQuery, 
        useUpdateProductMutation, 
        useUploadProductImageMutation 
    } from '../../redux/api/productApiSlice'
import { useFetchCategoriesQuery } from '../../redux/api/CategoryApiSlice'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu'

const ProductUpdate = () => {
    const params = useParams()

    const {data: productData} = useGetProductByIdQuery(params._id)
    console.log(productData)

    const [productImage, setProductImage] = useState(productData?.productImage || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [stock, setStock] = useState(productData?.stock || "");

    const navigate = useNavigate()
    const { data: categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct] = useDeleteProductMutation()

    useEffect(() => {
      if(productData && productData._id){
        setName(productData.name)
        setDescription(productData.description)
        setPrice(productData.price)
        setCategory(productData.category)
        setStock(productData.stock)
        setProductImage(productData.productImage)

      }
    }, [productData])

  const uploadFileHandler = async(e) => {
      const formData = new FormData()
      formData.append('productImage', e.target.files[0])
      
      try {
            
        const res = await uploadProductImage(formData).unwrap()
        console.log(res)
        toast.success(res.message);
        setProductImage(res.productImage)
      } catch (error) {
          toast.error(error?.data?.message || error.error || "An error occurred")
        } 
  }

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const productData = {productImage, name, price, description, category, stock};
      console.log(productData)
  
      const data = await updateProduct({ productId: params._id, productData });
      console.log(data.data.name)

      if (data?.error) {
        toast.error(data.error);
      } else {
        toast.success(`${data.data.name} successfully updated`);
        navigate("/admin/allproductslist");
      }
    } catch (err) {
      console.log(err);
      toast.error("Product update failed. Try again.");
    }
  };


  const handleDelete = async () => {
    try {
      let answer = window.confirm(
        "Are you sure you want to delete this product?"
      );
      if (!answer) return;

      const { data } = await deleteProduct(params._id);
      console.log(data)
      toast.success(`"${data.name}" is deleted`);
      navigate("/admin/allproductslist");
    } catch (err) {
      console.log(err);
      toast.error("Delete failed. Try again.");
    }
  };

  return (
    <div className=" xl:mx-[15rem] sm:mx-[0]">
    <div className="flex flex-col md:flex-row">
      <AdminMenu />
      <div className="md:w-3/4 p-3">
        <div className="h-12">Update Product</div>

        {productImage && (
          <div className="text-center">
            <img
              src={`/api/${productImage}`}
              alt="Error Loading Image..."
              className="block mx-auto max-h-[200px] p-4"
            />
          </div>
        )}

        <div className="mb-3">
          <label className="border px-4 block w-full text-center rounded-lg cursor-pointer py-11">
            {productImage ? productImage.name : "Upload Image"}

            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={uploadFileHandler}
              className={!productImage ? "hidden" : "text-black"}
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

          <div className="">
                <button
                  onClick={handleSubmit}
                  className="py-2 px-4 mt-5 rounded-lg text-white text-md font-semibold  bg-pink-600 mr-6"
                >
                  Update
                </button>
                <button
                  onClick={handleDelete}
                  className="py-2 px-4 mt-5 rounded-lg text-white text-md font-semibold  bg-red-600"
                >
                  Delete
                </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default ProductUpdate