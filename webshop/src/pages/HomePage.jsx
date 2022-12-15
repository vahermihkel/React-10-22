import config from "../data/config.json";
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";
import CartSumContext from "../store/CartSumContext";

function HomePage() {
  const { t } = useTranslation();
  const [products, changeProducts] = useState([]); // mida näidatakse välja
  const [dbProducts, setDbProducts] = useState([]); // originaalsed andmebaasi tooted, mida ma ei muuda kunagi
  const cartSumCtx = useContext(CartSumContext);

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        changeProducts(json);
        setDbProducts(json);
      });
  }, []);


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

  const sortAZ = () => {
    products.sort((b,a) => b.name.localeCompare(a.name));
    changeProducts(products.slice());
  }
  
  const sortZA = () => {
    products.sort((a,b) => b.name.localeCompare(a.name));
    changeProducts(products.slice());
  }

  const sortPriceAsc = () => {
    products.sort((a,b) => a.price - b.price);
    changeProducts(products.slice());
  }

  const sortPriceDesc = () => {
    products.sort((a,b) => b.price - a.price);
    changeProducts(products.slice());
  }

  const filterByCategory = (categoryClicked) => {
    const outcome = dbProducts.filter(element => element.category === categoryClicked);

    // const outcome = productsFromFile.filter(element => element.category.match (categoryClicked));
    // const outcome = productsFromFile.filter(element => element.category.includes (categoryClicked));
    changeProducts(outcome);
    // return
    setSelectedCategory(categoryClicked);
  };

  const categories = [...new Set (dbProducts.map(element => element.category))];

  const [selectedCategory, setSelectedCategory] = useState("");

  return ( 
    <div>
      <button onClick={sortAZ}>{t("sort-az")}</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
      <div>{products.length}</div>
      {/* kategooriad peavad siia tulema dünaamiliselt (.map() abil) */}
      { categories.map((element, i) => 
          <button className={ element === selectedCategory ? "selected" : undefined} key={i} onClick={() => filterByCategory (element)} >
            {t(element)}
          </button>
        ) }
      {/* <button>motorcycles</button>
      <button>motors</button> */}
      {products.map(element => 
        <div key={element.id}>
          <Link to={"/product/" + element.id}>
            <img src={element.image} width="200px" alt={element.name} />
          </Link>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button onClick={() =>addToCart(element)} >{t("add-to-cart")}</Button>
        </div>)}
      <ToastContainer />
    </div> );
}

export default HomePage;

// Email saatmine++++++
// Dark-mode+++++

// Neljapäev:
// Kaardirakendus, kus on kõik poed peal
// ID unikaalsuse kontroll
// Pakiautomaadid Ostukorvi vaatesse -> API päringud

// Teisipäev:
// Firebase-i üles + andmebaas -> API päringud

// Neljapäev:
// Kategooriad üles Firebase-i ja Poed Firebase-i
// Makse -> API päringud

// 13.12 Teisipäev:
// Dünaamiline CSS        className={ true ? "see-class-true-korral" : "false-korral-css" }
// Props -> väljatõstmised
// Globaalne muutuja: ülemises menüüs Ostukorvi kogusumma

// 15.12 Neljapäev
// Globaalne muutuja: sisselogimine/registreerumine
// Sisselogimine/Registreerumine + URL-de kaitsmised

// 23.12 Reede  10.00-13.15 
// Nortali proovitöö (katab koos tehtud teemasid)
// Piltide üleslaadimine (praegu on URL-na) - Firebase-i
// Karusell-galerii

// Ei tee:
// Wordpress backendina ja React frontendina
// Kujundus???

// 06.01   13.00-15.15    2ak/h ---> 3ak/h
// Lõpuprojekt: Nõue, et oleks tehtud Reactis.
// Võib olla täiesti tavaline HTML ja CSS Reactis (nt enda portfoolio leht)
// Võib olla ka Youtube-st või Udemyst mõne õpetuse järgi tehtud projekt

// 45min: kujundus, otsing ka ID järgi või kirjelduse seest