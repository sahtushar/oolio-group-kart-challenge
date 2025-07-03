import styled from "styled-components";
import type { Product } from "../types";
import { useCart } from "../context/CartContext";
import { ShoppingCart, Plus, Minus } from "lucide-react";

const Card = styled.div`
  margin-right: 10px;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
  width: 200px;
`;

const Thumbnail = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 12px;
  object-fit: cover;
`;

const Info = styled.div`
  margin-top: 8px;
`;

const Category = styled.p`
  font-size: 12px;
  color: #aca09c;
  margin: 4px 0;
`;

const Name = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #6e6461;
  line-height: 1.2;
`;

const Price = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #b05b3b;
  margin-top: 4px;
`;

const AddButtonWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 30px;
`;

const AddButton = styled.button`
  width: 159px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  background: #fdfdfc;
  border: 1px solid #b8a1a2;
  border-radius: 19px;
  color: #6e6461;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background: #f7f3f2;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const QuantityBadge = styled.div`
  width: 159px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 36px;
  background-color: #b05b3b;
  border: 1px solid #b8a1a2;
  border-radius: 19px;
  color: white;
  font-size: 14px;
  cursor: pointer;
`;

const IconButton = styled.button`
  background: transparent;
  border: none;
  color: white;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;

  &:hover {
    opacity: 0.85;
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

const ProductCard = ({ product }: { product: Product }) => {
  const { cart, addToCart, updateQuantity, removeFromCart } = useCart();
  const item = cart.find((c) => c.product.id === product.id);
  const quantity = item?.quantity ?? 0;

  const handleIncrement = () => addToCart(product);
  const handleDecrement = () => {
    if (quantity > 1) {
      updateQuantity(product.id, -1);
    } else {
      removeFromCart(product.id);
    }
  };

  return (
    <Card>
      <Thumbnail src={product.image.thumbnail} alt={product.name} />
      <AddButtonWrapper>
        {quantity > 0 ? (
          <QuantityBadge>
            <IconButton
              onClick={handleDecrement}
              aria-label="Decrease quantity"
            >
              <Minus />
            </IconButton>
            {quantity}
            <IconButton
              onClick={handleIncrement}
              aria-label="Increase quantity"
            >
              <Plus />
            </IconButton>
          </QuantityBadge>
        ) : (
          <AddButton onClick={() => addToCart(product)}>
            <ShoppingCart />
            Add to Cart
          </AddButton>
        )}
      </AddButtonWrapper>

      <Info>
        <Category>Waffle</Category>
        <Name>{product.name}</Name>
        <Price>${product.price.toFixed(2)}</Price>
      </Info>
    </Card>
  );
};

export default ProductCard;
