import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import { fetchProducts } from "../api/products";
import Cart from "../components/Cart";
import styled from "styled-components";
import OrderConfirmed from "../components/OrderConfirmed";
import { useCart } from "../context/CartContext";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { clearCart } = useCart();
  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  return (
    <main
      style={{
        display: "flex",
        flexWrap: "wrap",
      }}
    >
      <HomeContainer>
        <ProductContainer>
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </ProductContainer>
        <CartContainer>
          <Cart setIsOrderConfirmed={setIsOrderConfirmed} />
        </CartContainer>

        {isOrderConfirmed ? (
          <OrderModal>
            <OrderConfirmed
              onStartNewOrder={() => {
                setProducts(products);
                setIsOrderConfirmed(false);
                clearCart();
              }}
            />
          </OrderModal>
        ) : null}
      </HomeContainer>
    </main>
  );
};

const HomeContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 68%;
`;

const CartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const OrderModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  z-index: 1000;
`;

export default Home;
