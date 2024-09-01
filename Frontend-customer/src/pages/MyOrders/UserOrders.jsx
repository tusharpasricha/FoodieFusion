// UserOrders.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        console.log('Token:', token); // Check if token is available
        if (!token) {
          navigate('/login'); // Redirect to login if no token
          return;
        }

        const response = await axios.get('http://localhost:8080/api/orders', {
            headers: {
                'x-access-token': token // Replace with your token storage method
              }
        });

        setOrders(response.data); // Set the orders state
      } catch (err) {
        setError(err.message || 'An error occurred while fetching orders.');
      } finally {
        setLoading(false); // Set loading to false when the request completes
      }
    };

    fetchOrders();
  }, [navigate]);

  if (loading) return <p>Loading orders...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="user-orders">
      <h1>Your Orders</h1>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total Amount</th>
              <th>Payment Status</th>
              <th>Order Timestamp</th>
              <th>Delivery Address</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>${order.totalAmount}</td>
                <td>{order.paymentStatus}</td>
                <td>{new Date(order.orderTimestamp).toLocaleString()}</td>
                <td>
                  {order.deliveryAddress.street}, {order.deliveryAddress.city}, {order.deliveryAddress.state}, {order.deliveryAddress.zipCode}, {order.deliveryAddress.country}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrders;
