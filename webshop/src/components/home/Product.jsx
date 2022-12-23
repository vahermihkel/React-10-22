import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import CartSumContext from "../../store/CartSumContext";
import { toast } from 'react-toastify';
import { useContext } from "react";
import { useTranslation } from 'react-i18next';

function Product(props) {
  const cartSumCtx = useContext(CartSumContext);
  const { t } = useTranslation();

  // VANA: [{id: 1, name: "Nobe", price: 12, ...}, {id: 1, name: "Nobe", price: 12, ...}, {id: 1, name: "Nobe", price: 12, ...}]
  // UUS: [{"product": {id: 1, name: "Nobe", price: 12, ...}, "quantity": 2}]
  // VANA: [toode1, toode1, toode1, toode2, toode2, toode2, toode2, toode2, toode2]
  // UUS: [{"product": toode1, "quantity": 3}, {"product": toode2, "quantity": 6}]
  //            {id: 1, name: "Nobe", price: 12, ...}
  const addToCart = (productClicked) => {
    let cartLS = sessionStorage.getItem("cart");
    cartLS = JSON.parse(cartLS) || [];
    // kui ei leita üles ja ma otsin tema järjekorranumbrit, siis tulem on -1
    const index = cartLS.findIndex( element => element.product.id === productClicked.id );
    if (index >= 0) {
      // tooted[3] = "Midagi_muud";
      // kogus = kogus + 1; <--- muutis küll, aga ei muutnud HTMLi
      // muudaKogus(kogus + 1); <--- muutis HTMLi
      cartLS[index].quantity = cartLS[index].quantity + 1;
    } else {
      cartLS.push({"product": productClicked, "quantity": 1});
    }

    let sum = 0;
    cartLS.forEach(element => sum = sum + element.product.price * element.quantity);
    cartSumCtx.setCartSum(sum.toFixed(2));

    cartLS = JSON.stringify(cartLS);
    sessionStorage.setItem("cart", cartLS);
    toast.success(t("added-to-cart"), {
      "position": "bottom-right",
      "theme": "dark"
    });
  }


  return (
    <div>
      <Link to={"/product/" + props.element.id}>
        <img src={props.element.image} width="200px" alt={props.element.name} />
      </Link>
      <div>{props.element.name}</div>
      <div>{props.element.price}</div>
      <Button onClick={() =>addToCart(props.element)} >{t("add-to-cart")}</Button>
    </div>
  )
}

export default Product