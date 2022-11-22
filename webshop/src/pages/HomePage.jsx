import productsFromFile from "../data/products.json";
import Button from "react-bootstrap/Button";
import { useTranslation } from 'react-i18next';

function HomePage() {
  const { t } = useTranslation();

  const addToCart = () => {
      // pange localStorage-sse nagu eesti keelsel
      let cartLS = localStorage.getItem("cart");
  }

  const sortAZ = () => {
    // vaja teha: useState, mis võtab algväärtuse productsFromFile-st
    // järgmiseks sorteerida
    // ja siis useState funktsiooni abil väärtusi siin lehel muuta

    // tavaline sort ei tööta, peab kasutama (a,b) =>
  }
  
  const sortZA = () => {}

  const sortPriceAsc = () => {}

  const sortPriceDesc = () => {}

  const filterByCategory = () => {}

  return ( 
    <div>
      <button onClick={sortAZ}>{t("sort-az")}</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
      <div>{productsFromFile.length}</div>
      {/* kategooriad peavad siia tulema dünaamiliselt (.map() abil) */}
      <button>motorcycles</button>
      <button>motors</button>
      {productsFromFile.map(element => 
        <div>
          <img src={element.image} alt="" />
          <div>{element.name}</div>
          <div>{element.price}</div>
          <Button>{t("add-cart-button")}</Button>
        </div>)}
    </div> );
}

export default HomePage;