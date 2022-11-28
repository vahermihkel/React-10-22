import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';
import { useState } from "react";

function HomePage() {
  const { t } = useTranslation();
  const [products, changeProducts] = useState(productsFromFile) || [];

  const addToCart = (product) => {
    let cartLS = sessionStorage.getItem("cart");
    cartLS = JSON.parse(cartLS) || [];
    cartLS.push(product);
    cartLS = JSON.stringify(cartLS);
    sessionStorage.setItem("cart", cartLS);
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
    const outcome = productsFromFile.filter(element => element.category === i);

    // const outcome = productsFromFile.filter(element => element.category.match (i));
    // const outcome = productsFromFile.filter(element => element.category.includes (i));
    changeProducts(outcome);
    // return
  };

  const categories = [...new Set (productsFromFile.map(element => element.category))];

  return ( 
    <div>
      <button onClick={sortAZ}>{t("sort-az")}</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
      <div>{productsFromFile.length}</div>
      {/* kategooriad peavad siia tulema dünaamiliselt (.map() abil) */}
      { categories.map((element, i) => <button key={i} onClick={() => filterByCategory (element)} >{element}</button>) }
      {/* <button>motorcycles</button>
      <button>motors</button> */}
      {productsFromFile.map(element => 
        <div>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button onClick={() =>addToCart(element)} >{t("add-to-cart")}</Button>
        </div>)}
    </div> );
}

export default HomePage;