import styled from "styled-components";
import { useCart } from "../context/CartContext";
import CartItem from "./CartItem";
import { Leaf } from "lucide-react";

const CartContainer = styled.div`
  width: 384px;
  height: 543px;
  background: #ffffff;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
`;

const Header = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: #9a3b3b;
  margin-bottom: 16px;
`;

const ItemsContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  margin-bottom: 16px;
`;

const EmptyText = styled.p`
  font-size: 14px;
  color: #a0aec0;
`;

const TotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #4a5568;
  font-weight: 500;
  padding-top: 12px;
  border-top: 1px solid #e2e8f0;
`;

const TotalAmount = styled.span`
  font-size: 20px;
  font-weight: bold;
  color: #1a202c;
`;

const Banner = styled.div`
  margin-top: 16px;
  background: #fff6f1;
  border: 1px solid #ffece3;
  border-radius: 8px;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  font-size: 14px;
  color: #9a3b3b;

  span b {
    font-weight: 600;
  }
`;

const ConfirmButton = styled.button`
  margin-top: 20px;
  width: 100%;
  background: #b05b3b;
  color: white;
  font-size: 14px;
  font-weight: 500;
  padding: 12px 0;
  border: none;
  border-radius: 9999px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #9a3b3b;
  }
`;

const Cart = ({
  setIsOrderConfirmed,
}: {
  setIsOrderConfirmed: (isOrderConfirmed: boolean) => void;
}) => {
  const { cart, total, orderConfirmed } = useCart();

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContainer>
      <Header>Your Cart ({itemCount})</Header>

      <ItemsContainer>
        {cart.length === 0 ? (
          <EmptyText>Your cart is empty.</EmptyText>
        ) : (
          cart.map((item) => <CartItem key={item.product.id} item={item} />)
        )}
      </ItemsContainer>

      <TotalContainer>
        <span>Order Total</span>
        <TotalAmount>${total.toFixed(2)}</TotalAmount>
      </TotalContainer>

      <Banner>
        <Leaf size={16} strokeWidth={2.5} />
        <span>
          This is a <b>carbon-neutral</b> delivery
        </span>
      </Banner>

      <ConfirmButton
        onClick={() => {
          setIsOrderConfirmed(true);
          orderConfirmed();
        }}
      >
        Confirm Order
      </ConfirmButton>
    </CartContainer>
  );
};

export default Cart;
