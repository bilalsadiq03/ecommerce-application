import { apiSlice } from "./apiSlice";


export const CategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: '/api/v1/auth/category/new',
                method: "POST",
                body: newCategory,
            })
        }),

        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) => ({
                url: '/api/v1/auth/category/:categoryId',
                method: "PUT",
                body: updatedCategory,
            })
        }),

        deleteCategory: builder.mutation({
            query: (categoryId) => ({
                url: '/api/v1/auth/category/:categoryId',
                method: "DELETE",
            })
        }),

        fetchCategories: builder.query({
            query: ()=> ({
                url: '/api/v1/auth/category/all',
                method: "GET"
            })
        })
    })
})

export const {
    useCreateCategoryMutation,
    useDeleteCategoryMutation,
    useFetchCategoriesQuery,
    useUpdateCategoryMutation
} = CategoryApiSlice





