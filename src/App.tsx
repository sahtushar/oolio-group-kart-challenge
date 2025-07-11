import Home from "./pages/Home";
import { CartProvider } from "./context/CartContext";
import styled from "styled-components";
import Orders from "./pages/Orders";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

function App() {
  //API routes
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/orders",
      element: <Orders />,
    },
  ]);
  return (
    <CartProvider>
      <div>
        <HeaderText>Food Cart 🍔</HeaderText>
        <RouterProvider router={router} />
      </div>
    </CartProvider>
  );
}

const HeaderText = styled.h1`
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 36.8px;
  line-height: 45px;
  display: flex;
  align-items: center;
`;

export default App;
