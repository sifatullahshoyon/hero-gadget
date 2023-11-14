import React, { createContext, useState } from "react";
import Header from "./components/Header";
import { Outlet, useLoaderData } from "react-router-dom";
import Footer from "./components/Footer";
import Modal from "./components/Modal/modal";

export const ProductContext = createContext([]);
export const CartContext = createContext([]);

const App = () => {
  let [isOpen, setIsOpen] = useState(false);
  const { cartArray, products } = useLoaderData();
  const [cart , setCart] = useState(cartArray);

  const cartAlert = sessionStorage.getItem('alert');
  if(cart.length > 0 && cartAlert !== 'true'){
    setIsOpen(true);
    sessionStorage.setItem('alert' , true);
  }

  return (
    <ProductContext.Provider value={products}>
      <CartContext.Provider value={[cart , setCart]}>
        <Header />
        <div className="md:min-h-[calc(100vh-341px)]">
          <Outlet />
        </div>
        <Footer />
        <Modal isOpen={isOpen} setIsOpen={setIsOpen} />
      </CartContext.Provider>
    </ProductContext.Provider>
  );
};

export default App;
