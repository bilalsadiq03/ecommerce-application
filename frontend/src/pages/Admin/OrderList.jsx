import React from 'react'
import AdminMenu from './AdminMenu'
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice'
import Loader from '../../components/Loader'
import Messgae from '../../components/Message'
import { Link } from 'react-router-dom'

const OrderList = () => {

    const {data: orders, isLoading, error} = useGetOrdersQuery()
    



  return (
    <>
    {isLoading ? ( 
        <Loader /> ) : 
        error ? (
        <Messgae variant='danger'>{error?.data?.message || error.error}</Messgae>
    ) : 
    (
        <table className="container mx-auto">
          <AdminMenu />

          <thead className="w-full ">
            <tr className="mb-[5rem]">
              <th className="text-left pl-1">ITEMS</th>
              <th className="text-left pl-1">ID</th>
              <th className="text-left pl-1">USER</th>
              <th className="text-left pl-1">DATA</th>
              <th className="text-left pl-1">TOTAL</th>
              <th className="text-left pl-1">PAID</th>
              <th className="text-left pl-1">DELIVERED</th>
              <th></th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>
                  <img
                    src={`http://localhost:8080/${order.orderItems[0].productImage}`}
                    alt={order._id}
                    className="w-[5rem] pt-4"
                  />
                </td>
                <td>{order._id}</td>

                <td>{order.user ? order.user.name : "N/A"}</td>

                <td>
                  {order.createdAt ? order.createdAt.substring(0, 10) : "N/A"}
                </td>

                <td>$ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 text-white w-[6rem] rounded-full">
                      Paid
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 text-white w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 text-white w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 text-white w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>More</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
    )}
    </>
  )
}

export default OrderList