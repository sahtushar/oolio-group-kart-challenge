import styled from "styled-components";
import type { CartItem as CartItemType } from "../types";
import { X } from "lucide-react";
import { useCart } from "../context/CartContext";

const ItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
  padding: 12px 0;
  border-bottom: 1px solid #f1f5f9;
`;

const ItemInfo = styled.div`
  flex: 1;
`;

const ItemName = styled.p`
  font-size: 14px;
  font-weight: 500;
  color: #1a202c;
`;

const PriceInfo = styled.p`
  font-size: 12px;
  color: #718096;
  margin-top: 4px;
`;

const Quantity = styled.span`
  font-weight: 600;
  color: #9a3b3b;
`;

const UnitTotal = styled.span`
  margin-left: 4px;
  color: #4a5568;
`;

const RemoveButton = styled.button`
  color: #a0aec0;
  transition: color 0.2s ease;

  &:hover {
    color: #f56565;
  }
`;

const CartItem = ({ item }: { item: CartItemType }) => {
  const { removeFromCart } = useCart();

  const { product, quantity } = item;
  const unitPrice = product.price;
  const total = unitPrice * quantity;

  return (
    <ItemContainer>
      <ItemInfo>
        <ItemName>{product.name}</ItemName>
        <PriceInfo>
          <Quantity>{quantity}x</Quantity>
          <UnitTotal>
            @${unitPrice.toFixed(2)} ${total.toFixed(2)}
          </UnitTotal>
        </PriceInfo>
      </ItemInfo>

      <RemoveButton
        onClick={() => removeFromCart(product.id)}
        aria-label={`Remove ${product.name}`}
      >
        <X size={16} />
      </RemoveButton>
    </ItemContainer>
  );
};

export default CartItem;
