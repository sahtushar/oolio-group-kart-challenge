import React, { useEffect } from "react";
import styled from "styled-components";

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5); /* backdrop */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; /* ensure it appears above other content */
`;

type ModalProps = {
  children: React.ReactNode;
};

const Modal = ({ children }: ModalProps) => {
  useEffect(() => {
    // Prevent background scroll
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";

    return () => {
      // Restore scroll on cleanup
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return <Overlay>{children}</Overlay>;
};
export default Modal;
