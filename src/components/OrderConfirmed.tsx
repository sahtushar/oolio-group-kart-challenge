import styled from "styled-components";
import { useCart } from "../context/CartContext";

const Container = styled.div`
  width: 384px;
  background: #ffffff;
  padding: 24px;
  border-radius: 20px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.06);
  text-align: center;
`;

const CheckIcon = styled.div`
  width: 48px;
  height: 48px;
  border: 2px solid #2ecc71;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 12px;

  &::before {
    content: "✓";
    font-size: 24px;
    color: #2ecc71;
  }
`;

const Heading = styled.h2`
  font-size: 24px;
  font-weight: 700;
  color: #3d1f00;
  margin-bottom: 4px;
`;

const Subtext = styled.p`
  font-size: 14px;
  color: #666666;
  margin-bottom: 24px;
`;

const SummaryCard = styled.div`
  background: #fdf6f4;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 24px;
`;

const ItemRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Thumbnail = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  object-fit: cover;
`;

const ItemDetails = styled.div`
  text-align: left;
`;

const ItemName = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #3e3e3e;
  margin-bottom: 4px;
`;

const ItemMeta = styled.p`
  font-size: 12px;
  color: #9a9a9a;

  span {
    color: #b05b3b;
    font-weight: 600;
  }
`;

const ItemTotal = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #3e3e3e;
`;

const TotalRow = styled.div`
  border-top: 1px solid #eee;
  padding-top: 12px;
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #555;
  font-weight: 500;

  span:last-child {
    font-size: 18px;
    font-weight: 700;
    color: #000;
  }
`;

const NewOrderButton = styled.button`
  width: 100%;
  background: #b05b3b;
  color: #fff;
  padding: 14px 0;
  font-size: 15px;
  font-weight: 500;
  border: none;
  border-radius: 999px;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #9a3b3b;
  }
`;

const OrderConfirmed = ({
  onStartNewOrder,
}: {
  onStartNewOrder: () => void;
}) => {
  const { cart, total } = useCart();

  return (
    <Container>
      <CheckIcon />
      <Heading>Order Confirmed</Heading>
      <Subtext>We hope you enjoy your food!</Subtext>

      <SummaryCard>
        {cart.map(({ product, quantity }) => (
          <ItemRow key={product.id}>
            <LeftSection>
              <Thumbnail src={product.image.thumbnail} alt={product.name} />
              <ItemDetails>
                <ItemName>{product.name}</ItemName>
                <ItemMeta>
                  <span>{quantity}x</span> @${product.price.toFixed(2)}
                </ItemMeta>
              </ItemDetails>
            </LeftSection>

            <ItemTotal>${(product.price * quantity).toFixed(2)}</ItemTotal>
          </ItemRow>
        ))}

        <TotalRow>
          <span>Order Total</span>
          <span>${total.toFixed(2)}</span>
        </TotalRow>
      </SummaryCard>

      <NewOrderButton onClick={onStartNewOrder}>Start New Order</NewOrderButton>
    </Container>
  );
};

export default OrderConfirmed;
