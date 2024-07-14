import { apiSlice } from './apiSlice'


const token = localStorage.getItem('token')
console.log(token)

export const productApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query({
            query: ({keyword}) => ({
                url: "/api/v1/auth/products",
                params: {keyword}
            }),

            keepUnusedDataFor: 5,
            providesTags: ['Product'],
        }),

        getProductById: builder.query({
            query: (productId) => `/api/v1/auth/product/${productId}`,
            providedTags: (result, error, productId) => [
                {type: "Product", id: productId}
            ]
        }),

        allProducts: builder.query({
            query: () => "/api/v1/auth/product/all"
        }),

        getProductDetails: builder.query({
            query: (productId) => ({
                url:`/api//v1/auth/product/${productId}`
            }),
            keepUnusedDataFor: 5,
        }),

        createProduct: builder.mutation({
            query: (productData) => ({
                url: "/api/v1/auth/product",
                method: 'PUT',
                body: productData
            }),

            invalidatesTags: ['Product']
        }),

        updateProduct: builder.mutation({
            query: ({productId, productData}) => ({
                url: `/api/v1/auth/product/${productId}`,
                method: "PUT",
                body: productData
            })
        }),

        deleteProduct: builder.mutation({
            query: (productId) => ({
                url: `/api/v1/auth/product/${productId}/delete`,
                method: "DELETE",
            }),
            providesTags: ['Product']
        }),

        createReview: builder.mutation({
            query: (data) => ({
                url: `/api/v1/auth/product/${data.productId}/review`,
                method: "POST",
                headers: {
                    'x-access-token': token
                },
                body: data,
            })
        }),

        getTopproducts: builder.query({
            query: () => "/api/v1/auth/product/top",
            keepUnusedDataFor: 5,
        }),

        getNewProducts: builder.query({
            query: () => "/api/v1/auth/product/new",
            keepUnusedDataFor: 5,
        }),

        uploadProductImage: builder.mutation({
            query: (data) => ({
                url: "/api/upload",
                method: "POST",
                body: data
            })
        }),

        getFilteredProducts : builder.query({
            query: ({checked, radio}) => ({
                url: "api/v1/auth/product/filtered",
                method: "POST",
                body: {checked, radio}
            })
        })

    })
})


export const {
    useAllProductsQuery,
    useCreateProductMutation,
    useCreateReviewMutation,
    useDeleteProductMutation,
    useGetNewProductsQuery,
    useGetProductByIdQuery,
    useGetProductDetailsQuery,
    useGetTopproductsQuery,
    useGetProductsQuery,
    useUpdateProductMutation,
    useUploadProductImageMutation,
    useGetFilteredProductsQuery,
} = productApiSlice