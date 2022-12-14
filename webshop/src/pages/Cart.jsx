import Payment from "../components/cart/Payment";
import "../css/Cart.css";
import { useContext, useState } from "react";
import CartSumContext from "../store/CartSumContext";
import ParcelMachines from "../components/cart/ParcelMachines";
import { Link } from "react-router-dom";

function Cart() {
  const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem("cart")) || []);
  const cartSumCtx = useContext(CartSumContext);

  const emptyCart = () => {
    setCart([]);
    sessionStorage.setItem("cart", JSON.stringify([]));
    cartSumCtx.setCartSum(0);
  };

  const decreaseQuantity = (index) => {
    cart[index].quantity = cart[index].quantity - 1;
    if (cart[index].quantity <= 0) {
      removeFromCart(index);
    }
    setCart(cart.slice());
    sessionStorage.setItem("cart", JSON.stringify(cart)); 
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const increaseQuantity = (index) => {
    // kogus = kogus + 1;
    cart[index].quantity = cart[index].quantity + 1;
    setCart(cart.slice()); // HTML uuendus
    sessionStorage.setItem("cart", JSON.stringify(cart)); // sessionStorage uuendus
    cartSumCtx.setCartSum(calculateCartSum());
  }

  const removeFromCart = (index) => {
    cart.splice(index, 1);
    setCart(cart.slice()); // HTML uuendus
    sessionStorage.setItem("cart", JSON.stringify(cart)); // SessionStorage uuendus
    cartSumCtx.setCartSum(calculateCartSum());
  };

  const calculateCartSum = () => {
    let sum = 0;
    cart.forEach(element => sum = sum + element.product.price * element.quantity);
    return sum.toFixed(2);
  };

  return ( 
    <div>
        <div className="cart-top">
          { cart.length > 0 && <button onClick={emptyCart} >Empty cart</button> } 
          { cart.length >= 2 && <div>You have {cart.length} items in your cart.</div>}
          { cart.length === 1 && <div>You have 1 item in your cart.</div>}
        </div>

        { cart.length === 0 && <div>Your cart is empty.<Link to="/">Add products</Link></div>  }
        { cart.length === 0 && <img className="emptyCart" src="/empty-cart.png" alt="" />}

        <div>
        {/* [{"product": toode1, "quantity": 3}, {"product": toode2, "quantity": 6}] */}
          {cart.map((element, index) =>
            <div className="product" key={index}>
              <img className="image" src={element.product.image} alt="" />
              <div className="name">{element.product.name}</div>
              <div className="price">{element.product.price.toFixed(2)} ???</div>
              <div className="quantity">
                <img className="button" onClick={() => decreaseQuantity(index)} src="/minus.png" alt="" />
                <div>{element.quantity} tk</div>
                <img className="button" onClick={() => increaseQuantity(index)} src="/add.png" alt="" />
              </div>
              <div className="sum">{(element.product.price * element.quantity).toFixed(2)} ???</div>
              <img className="button" onClick={() => removeFromCart(index)} src="/delete.png" alt="" />
            </div>
          )}
        </div>
        { cart.length > 0 && 
        <div className="cart-bottom">
          <div>Estimated total price {calculateCartSum()} ???</div>
        
          <ParcelMachines />

          <Payment sum={calculateCartSum()} />
        
        </div>}
    </div> );
}

export default Cart;

// ei lase ??htegi faili ??le 200 rea
// meil on pandud plugin, mis viskab warningu kui on ??le 200
// lahendus: teeme uue faili kuhu t??stame koodijupid

// ideaalis hakkame selle peale m??tlema juba ??le 150 rea