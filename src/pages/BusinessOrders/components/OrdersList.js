import React from "react";

import OrderItem from "./OrderItem";

const UpdateOrderStatus = ({ orders, openEvaluationModal }) => {
  if (!orders || orders.length === 0) return null;

  return (
    <>
      {orders.map(order => (
        <OrderItem order={order} key={order.id} openEvaluationModal={openEvaluationModal} />
      ))}
    </>
  );
}

export default UpdateOrderStatus;
