import React from "react";
import "./ShoppingHistory.css";
import { useSelector } from "react-redux";

const ShoppingHistory = () => {
  const userData = useSelector((state) => state.userData);
  console.log("Shopping History", userData);

  const { name, email, purchases } = userData;

  return (
    <div className="shopping-history-container">
      <h2>User Information</h2>
      <p>Name: {name}</p>
      <p>Email: {email}</p>

      <h2>Shopping History</h2>
      {purchases && purchases.count > 0 ? (
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Total</th>
              <th>Products</th>
            </tr>
          </thead>
          <tbody>
            {purchases.ordersWithProducts.map((order) => (
              <tr key={order.order.id} className="order-row">
                <td>{order.order.id}</td>
                <td>${order.order.total}</td>
                <td>{order.productIds.join(", ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchase history available.</p>
      )}
    </div>
  );
};

export default ShoppingHistory;
