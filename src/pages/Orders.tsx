import { useEffect, useState } from "react";
import styled from "styled-components";
import type { CartItem, Order } from "../types";
import { Link } from "react-router-dom";
import { SubHeader } from "./Home";

const OrdersWrapper = styled.div`
  margin: 2rem;
  padding: 1rem;
  max-width: 600px;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  margin-bottom: 1.5rem;
  transition: box-shadow 0.2s ease;
`;

const OrderHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const OrderMeta = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const ExpandButton = styled.button`
  background: none;
  border: none;
  color: #0070f3;
  font-weight: 500;
  cursor: pointer;
  font-size: 0.9rem;

  &:hover {
    text-decoration: underline;
  }
`;

const ProductList = styled.ul`
  margin-top: 1rem;
  padding-left: 1rem;
`;

const ProductItem = styled.li`
  padding: 0.25rem 0;
  list-style-type: disc;
`;

const EmptyText = styled.p`
  font-size: 1rem;
  color: #666;
`;

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(
    new Set(),
  );

  useEffect(() => {
    const stored = localStorage.getItem("orders") || "[]";
    try {
      const parsed: Order[] = JSON.parse(stored);
      const sorted = parsed.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
      setOrders(sorted);
    } catch (error) {
      console.error("Failed to parse orders from localStorage", error);
    }
  }, []);

  const toggleExpand = (orderId: string) => {
    setExpandedOrderIds((prev) => {
      const newSet = new Set(prev);
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      newSet.has(orderId) ? newSet.delete(orderId) : newSet.add(orderId);
      return newSet;
    });
  };

  return (
    <OrdersWrapper>
      <SubHeader>
        <Link to="/" style={{ textDecoration: "none", color: "black" }}>
          Back to Ordering Food
        </Link>
      </SubHeader>
      <>
        {orders.length === 0 ? (
          <EmptyText>No past orders found.</EmptyText>
        ) : (
          <>
            {orders.map((order) => {
              const isExpanded = expandedOrderIds.has(order.orderId);
              return (
                <Card key={order.orderId}>
                  <OrderHeader>
                    <OrderMeta>
                      <div>
                        <strong>Order ID:</strong> {order.orderId}
                      </div>
                      <div>
                        <strong>Date:</strong>{" "}
                        {new Date(order.date).toLocaleString("en-US", {
                          weekday: "short",
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "numeric",
                          minute: "numeric",
                        })}
                      </div>
                      <div>
                        <strong>Status:</strong>{" "}
                        {order.orderConfirmed ? "✅ Confirmed" : "⌛ Pending"}
                      </div>
                    </OrderMeta>
                    <ExpandButton onClick={() => toggleExpand(order.orderId)}>
                      {isExpanded ? "Hide Items" : "Show Items"}
                    </ExpandButton>
                  </OrderHeader>

                  {isExpanded && (
                    <ProductList>
                      {order.items.map((item: CartItem, index: number) => (
                        <ProductItem key={index}>
                          {item.product.name} × {item.quantity}
                        </ProductItem>
                      ))}
                    </ProductList>
                  )}
                </Card>
              );
            })}
          </>
        )}
      </>
    </OrdersWrapper>
  );
};

export default Orders;
