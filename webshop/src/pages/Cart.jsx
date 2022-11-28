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
    cart.forEach(element => sum = sum + element.product.price * element.quantity);
    return sum.toFixed(2);
  };

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
  }

  const increaseQuantity = (index) => {
    // kogus = kogus + 1;
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice()); // HTML uuendus
    sessionStorage.setItem("cart", JSON.stringify(cart)); // sessionStorage uuendus
  }

  return ( 
    <div>
        { cart.length > 0 && <button onClick={emptyCart} >Empty cart</button> } 
        { cart.length >= 2 && <div>You have {cart.length} items in your cart.</div>}
        { cart.length === 1 && <div>You have 1 item in your cart.</div>}
        { cart.length === 0 && <div>Your cart is empty.</div>  }
        { cart.length === 0 && <img className="emptyCart" src="/empty-cart.png" alt="" />}

        <div>
        {/* [{"product": toode1, "quantity": 3}, {"product": toode2, "quantity": 6}] */}
          {cart.map((element, index) =>
            <div key={index}>
              <img src={element.product.image} alt="" />
              <div>{element.product.name}</div>
              <div>{element.product.price.toFixed(2)} €</div>
              <button onClick={() => decreaseQuantity(index)}>-</button>
              <div>{element.quantity} tk</div>
              <button onClick={() => increaseQuantity(index)}>+</button>
              <div>{(element.product.price * element.quantity).toFixed(2)} €</div>
              <button onClick={() => removeFromCart(index)}>x</button>
            </div>
          )}
        </div>
        { cart.length > 0 && <div>Estimated total price {calculateCartSum()} €</div>}
    </div> );
}

export default Cart;