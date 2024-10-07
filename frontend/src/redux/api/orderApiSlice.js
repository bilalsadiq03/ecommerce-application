import { apiSlice } from "./apiSlice";


const token = localStorage.getItem('token')

export const orderApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createOrder : builder.mutation({
            query: (data) => ({
                url: '/api/v1/auth/order/new',
                method: "POST",
                headers: {
                    'x-access-token': token
                },
                body: data
            })
        }),

        getOrderDetails : builder.query({
            query: (id) => ({
                url: `/api/v1/auth/order/${id}`,
                headers: {
                    'x-access-token': token
                },
            })
        }),

        payOrder: builder.mutation({
            query: ({orderId, details}) => ({
                url: `/api/v1/auth/order/${orderId}/pay`,
                method: 'PUT',
                body: details
            })
        }),

        getPayPalClientId: builder.query({
            query: () => ({
                url:'/api/v1/config/paypal',
            })
        }),

        getMyOrders: builder.query({
            query: () => ({
                url: '/api/v1/auth/order/my',
                headers: {
                    'x-access-token': token
                },
            }),
            keepUnusedDataFor: 5
        }),

        getOrders: builder.query({
            query: () => ({
                url: '/api/v1/auth/order/all'
            })
        }),

        deliverOrder: builder.mutation({
            query: ({orderId}) => ({
                url: `/api/v1/auth/order/${orderId}/deliver`,
                method:"PUT",
                headers: {
                    'x-access-token': token
                },
            })
        }),

        getTotalOrders: builder.query({
            query: () => ({
                url: '/api/v1/auth/order/total',
                method: "POST"
            })
        }),

        getTotalSales: builder.query({
            query: () => ({
                url: '/api/v1/auth/order/total-sales',
                method: "POST"
            })
        }),

        getTotalSalesByDate: builder.query({
            query: () => ({
                url: '/api/v1/auth/order/totalSales-by-date',
                method: "POST"
            })
        }),
    })
})

export const {
    useCreateOrderMutation,
    useGetOrderDetailsQuery,
    usePayOrderMutation,
    useGetPayPalClientIdQuery,
    useGetMyOrdersQuery,
    useDeliverOrderMutation,
    useGetTotalOrdersQuery,
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery,
    useGetOrdersQuery,

} = orderApiSlice