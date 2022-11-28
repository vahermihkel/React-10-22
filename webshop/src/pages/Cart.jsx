import { useState } from "react";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
    
  const removeFromCart = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice()); // HTML uuendus
    sessionStorage.setItem("cart", JSON.stringify(cart)); // SessionStorage uuendus
  };

  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
  };

  const calculateCartSum = () => {
    let sum = 0;
    cart.forEach(element => sum = sum + element.price);
    return sum;
  };

  return ( 
    <div>
        { cart.length > 0 && <button onClick={emptyCart} >Empty cart</button> } 
        { cart.length >= 2 && <div>You have {cart.length} items in your cart.</div>}
        { cart.length === 1 && <div>You have 1 item in your cart.</div>}
        { cart.length === 0 && <div>Your cart is empty.</div>  }
        { cart.length === 0 && <img className="emptyCart" src="/empty-cart.png" alt="" />}

        <div>
          {cart.map((element, index) =>
            <div key={index}>
              <img src={element.image} alt="" />
              <div>{element.name}</div>
              <div>{element.price}</div>
              <div>{element.description}</div>
              <div>{element.category}</div>
              <button onClick={() => removeFromCart(index)}>x</button>
            </div>
          )}
        </div>
        { cart.length > 0 && <div>Estimated total price {calculateCartSum()} €</div>}
    </div> );
}

export default Cart;