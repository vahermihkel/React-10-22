import { useState } from "react";
import "../css/Cart.css";

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
        <div className="cart-top">
          { cart.length > 0 && <button onClick={emptyCart} >Empty cart</button> } 
          { cart.length >= 2 && <div>You have {cart.length} items in your cart.</div>}
          { cart.length === 1 && <div>You have 1 item in your cart.</div>}
        </div>

        { cart.length === 0 && <div>Your cart is empty.</div>  }
        { cart.length === 0 && <img className="emptyCart" src="/empty-cart.png" alt="" />}

        <div>
        {/* [{"product": toode1, "quantity": 3}, {"product": toode2, "quantity": 6}] */}
          {cart.map((element, index) =>
            <div className="product" key={index}>
              <img className="image" src={element.product.image} alt="" />
              <div className="name">{element.product.name}</div>
              <div className="price">{element.product.price.toFixed(2)} €</div>
              <div className="quantity">
                <img className="button" onClick={() => decreaseQuantity(index)} src="/minus.png" alt="" />
                <div>{element.quantity} tk</div>
                <img className="button" onClick={() => increaseQuantity(index)} src="/add.png" alt="" />
              </div>
              <div className="sum">{(element.product.price * element.quantity).toFixed(2)} €</div>
              <img className="button" onClick={() => removeFromCart(index)} src="/delete.png" alt="" />
            </div>
          )}
        </div>
        <div className="cart-bottom">
          { cart.length > 0 && <div>Estimated total price {calculateCartSum()} €</div>}
        </div>
    </div> );
}

export default Cart;