import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';
import "../../css/MaintainProducts.css";
// ilus oleks moodulina, sest praegu on MaintainProducts.css
//  kehtiv kõikides failides
// import styles from "../../css/MaintainProducts.css";

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const searchedProduct = useRef();
  const [dbProducts, setDbProducts] = useState([]); // originaalsed andmebaasi tooted, mida ma ei muuda kunagi

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json.slice()); // json mälukoht anti nii productsile kui dbProductsile
        setDbProducts(json.slice()); // .slice() teeb koopia ehk annab uue mälukoha
      });
  }, []);

  const deleteProduct = (product) => {
    const dbIndex = dbProducts.findIndex(element => element.id === product.id);
    dbProducts.splice(dbIndex,1); // 120 toodet  0,1,2,3,4,5,6,7,8,9,.....,110,111,...119
    const index = products.findIndex(element => element.id === product.id);
    products.splice(index,1); // 10 toodet 0,1,2,3,4,5,6,7,8,9
    setProducts(products.slice());
    fetch(config.productsDbUrl, 
      {
        "method": "PUT", 
        "body": JSON.stringify(dbProducts)
      }
      ).then(() => 
        toast.success("Edukalt toode kustutatud", {
          "position": "bottom-right",
          "theme": "dark"
        })
        );
  }

  const searchFromProducts = () => {
    const result = dbProducts.filter(element => 
      element.name.toLowerCase().includes(searchedProduct.current.value.toLowerCase())
      );
    setProducts(result);
  }

  const changeActive = (productClicked) => {
    const index = products.findIndex(element => element.id === productClicked.id);
    products[index].active = !products[index].active;    
    setProducts(products.slice());
    fetch(config.productsDbUrl, 
      {
        "method": "PUT", 
        "body": JSON.stringify(dbProducts)
      })
  }

  return ( 
    <div>
      <input ref={searchedProduct} onChange={searchFromProducts} type="text" />
      <div>{products.length} tk</div>
      {products.map((element) => 
        <div className={element.active === true ? "active" : "inactive"} key={element.id}>
          <div onClick={() => changeActive(element)}>
            <img src={element.image} alt="" />
            <div>{element.id}</div>
            <div>{element.name}</div>
            <div>{element.price}</div>
            <div>{element.image}</div>
            <div>{element.category}</div>
            <div>{element.description}</div>
            <div>{element.active}</div>
          </div>
          <button onClick={() => deleteProduct(element)}>x</button>
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button>
          </Link>
        </div>)}
        <ToastContainer />
    </div> );
}

export default MaintainProducts;