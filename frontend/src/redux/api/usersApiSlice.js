import { apiSlice } from "./apiSlice"



export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: "/api/v1/auth/signin",
                method: "POST",
                body: data,
            }),
            

        }),

        logout: builder.mutation({
            query: (data) => ({
                url: "/api/v1/auth/logout",
                method: "POST",
                body: data,
            
            })
        }),

        register: builder.mutation({
            query: (data) => ({
                url: "/api/v1/auth/signup",
                method: "POST",
                body: data,
            })
        }),

        profile: builder.mutation({
            query: (data)=> ({
                url: "/api/v1/auth/profile",
                method: "PUT",
                body: data,
            })
        }),

        getUsers :builder.query({
            query: ()=> ({
                url: "/api/v1/auth/users",
            }),
            providesTags: ['Users'],
            keepUnusedDataFor: 5,
        }),

        deleteUser: builder.mutation({
            query: (userId) => ({
              url: `/api/v1/auth/${userId}`,
              method: "DELETE",
            }),
          }),

        getUserDetails: builder.query({
            query: (id) => ({
              url: `/api/v1/auth/${id}`,
            }),
            keepUnusedDataFor: 5,
        }),

        updateUser: builder.mutation({
            query: (data) => ({
              url: `/api/v1/auth/${data.userId}`,
              method: "PUT",
              body: data,
        }),
            invalidatesTags: ["User"],
        }),

    }),

})

export const { 
    useLoginMutation, 
    useLogoutMutation, 
    useRegisterMutation, 
    useProfileMutation,
    useDeleteUserMutation,
    useGetUserDetailsQuery,
    useGetUsersQuery,
    useUpdateUserMutation,
} = userApiSlice