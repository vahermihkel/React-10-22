import config from "../data/config.json";
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { ToastContainer } from 'react-toastify';
import CarouselGallery from "../components/home/CarouselGallery";
import SortButtons from "../components/home/SortButtons";
import Product from "../components/home/Product";

function HomePage() {
  const { t } = useTranslation();
  const [products, changeProducts] = useState([]); // mida näidatakse välja
  const [dbProducts, setDbProducts] = useState([]); // originaalsed andmebaasi tooted, mida ma ei muuda kunagi
  const categories = [...new Set (dbProducts.map(element => element.category))];
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        changeProducts(json);
        setDbProducts(json);
      });
  }, []);

  const filterByCategory = (categoryClicked) => {
    const outcome = dbProducts.filter(element => element.category === categoryClicked);

    // const outcome = productsFromFile.filter(element => element.category.match (categoryClicked));
    // const outcome = productsFromFile.filter(element => element.category.includes (categoryClicked));
    changeProducts(outcome);
    // return
    setSelectedCategory(categoryClicked);
  };

  return ( 
    <div>
      <CarouselGallery />

      <SortButtons 
        products={products} 
        changeProducts={changeProducts} />

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
          <Product key={element.id} element={element} />
        )}
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
// Karusell-galerii
// CSS moodulid
// Propsid -> väljatõstmine
// Piltide üleslaadimine (praegu on URL-na) - Firebase-i

// Ei tee:
// Wordpress backendina ja React frontendina
// Kujundus???

// 06.01    2ak/h ---> 3ak/h       11.30-13.45      14.00-15.00
// Lõpuprojekt: Nõue, et oleks tehtud Reactis.
// Võib olla täiesti tavaline HTML ja CSS Reactis (nt enda portfoolio leht)
// Võib olla ka Youtube-st või Udemyst mõne õpetuse järgi tehtud projekt
// Firebase-i ülesse

// 45min: kujundus, otsing ka ID järgi või kirjelduse seest, andmebaasi karusell-galerii, shopid?