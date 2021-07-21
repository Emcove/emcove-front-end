import React from "react";

import OrderItem from "./OrderItem";

const UpdateOrderStatus = ({ orders, openEvaluationModal, onClickStatus }) => {
  if (!orders || orders.length === 0) return null;

  return (
    <>
      {orders.map(order => (
        <OrderItem
          order={order}
          key={order.id}
          onClickStatus={onClickStatus}
          openEvaluationModal={openEvaluationModal}
        />
      ))}
    </>
  );
}

export default UpdateOrderStatus;
