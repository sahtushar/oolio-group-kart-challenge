import { useEffect, useState } from "react";

import ProductCard from "../components/ProductCard";
import type { Product } from "../types";
import { fetchProducts } from "../api/products";
import Cart from "../components/Cart";
import styled from "styled-components";
import OrderConfirmed from "../components/OrderConfirmed";
import { useCart } from "../context/CartContext";
import Modal from "../components/Modal";
import { Link } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isOrderConfirmed, setIsOrderConfirmed] = useState(false);
  const { clearCart } = useCart();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetchProducts().then((products) => {
      setProducts(products);
      setIsLoading(false);
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
        {/* <SubHeader>
          <Link to="/orders" style={{ textDecoration: "none", color: "black" }}>
            My Orders
          </Link>
        </SubHeader> */}
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <>
            <ProductContainer>
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </ProductContainer>
            <CartContainer>
              <SubHeader>
                <Link
                  to="/orders"
                  style={{ textDecoration: "none", color: "black" }}
                >
                  My Orders
                </Link>
              </SubHeader>
              <Cart setIsOrderConfirmed={setIsOrderConfirmed} />
            </CartContainer>

            {isOrderConfirmed ? (
              <Modal>
                <OrderConfirmed
                  onStartNewOrder={() => {
                    setProducts(products);
                    setIsOrderConfirmed(false);
                    clearCart();
                  }}
                />
              </Modal>
            ) : null}
          </>
        )}
      </HomeContainer>
    </main>
  );
};

const HomeContainer = styled.main`
  display: flex;
  flex-wrap: wrap;
  /* flex-direction: column; */
`;

const ProductContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 68%;
`;

const CartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: column;
`;

export const SubHeader = styled.h3`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 18px;
  line-height: 22px;
  margin-left: auto;
  margin-right: auto;
  text-decoration: underline;
`;

export default Home;
