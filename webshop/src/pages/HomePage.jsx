// import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function HomePage() {
  const { t } = useTranslation();
  const [products, changeProducts] = useState([]); // mida näidatakse välja
  const [dbProducts, setDbProducts] = useState([]); // originaalsed andmebaasi tooted, mida ma ei muuda kunagi
  const dbUrl = "https://react-mihkel-webshop-10-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

  useEffect(() => {
    fetch(dbUrl)
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

  const filterByCategory = (i) => {
    const outcome = dbProducts.filter(element => element.category === i);

    // const outcome = productsFromFile.filter(element => element.category.match (i));
    // const outcome = productsFromFile.filter(element => element.category.includes (i));
    changeProducts(outcome);
    // return
  };

  const categories = [...new Set (dbProducts.map(element => element.category))];

  return ( 
    <div>
      <button onClick={sortAZ}>{t("sort-az")}</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
      <div>{products.length}</div>
      {/* kategooriad peavad siia tulema dünaamiliselt (.map() abil) */}
      { categories.map((element, i) => <button key={i} onClick={() => filterByCategory (element)} >{t(element)}</button>) }
      {/* <button>motorcycles</button>
      <button>motors</button> */}
      {products.map(element => 
        <div>
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

// Neljapäev:
// Kaardirakendus, kus on kõik poed peal
// ID unikaalsuse kontroll
// Pakiautomaadid Ostukorvi vaatesse -> API päringud

// Teisipäev:
// Firebase-i üles + andmebaas -> API päringud

// Neljapäev:
// Kategooriad üles Firebase-i ja Poed Firebase-i
// Dünaamiline CSS        className={ true ? "see-class-true-korral" : "false-korral-css" }
// Makse -> API päringud

// Dark-mode

// Props -> väljatõstmised

// Globaalne muutuja: ülemises menüüs Ostukorvi kogusumma
// Globaalne muutuja: sisselogimine/registreerumine

// Nortali proovitöö (katab koos tehtud teemasid)

// Piltide üleslaadimine (praegu on URL-na) - Firebase-i
// Karusell-galerii
// Wordpress backendina ja React frontendina
// Kujundus???

// Lõpuprojekt: Nõue, et oleks tehtud Reactis.
// Võib olla täiesti tavaline HTML ja CSS Reactis (nt enda portfoolio leht)
// Võib olla ka Youtube-st või Udemyst mõne õpetuse järgi tehtud projekt