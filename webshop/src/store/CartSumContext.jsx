import { createContext, useState } from "react";


const CartSumContext = createContext(null);

export const CartSumContextProvider = (props) => {
  const [cartSum, setCartSum] = useState(calculateCartSum());

  function calculateCartSum() {
    const cart = JSON.parse(sessionStorage.getItem("cart")) || [];
    let sum = 0;
    cart.forEach(element => sum = sum + element.product.price * element.quantity);
    return sum.toFixed(2);
  }

  return(
    <CartSumContext.Provider value={{
      cartSum: cartSum,
      setCartSum: setCartSum
    }}>
      {props.children}
    </CartSumContext.Provider>
  );
}

export default CartSumContext;