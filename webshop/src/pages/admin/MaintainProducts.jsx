import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import config from "../../data/config.json";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProducts() {
  const [products, setProducts] = useState([]);
  const searchedProduct = useRef();
  const [dbProducts, setDbProducts] = useState([]); // originaalsed andmebaasi tooted, mida ma ei muuda kunagi

  useEffect(() => {
    fetch(config.productsDbUrl)
      .then(res => res.json())
      .then(json => {
        setProducts(json);
        setDbProducts(json);
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
    const result = dbProducts.filter(element => element.name.includes(searchedProduct.current.value));
    setProducts(result);
  }

  return ( 
    <div>
      <input ref={searchedProduct} onChange={searchFromProducts} type="text" />
      <div>{products.length} tk</div>
      {products.map((element, index) => 
        <div key={element.id}>
          <img src={element.image} alt="" />
          <div>{element.id}</div>
          <div>{element.name}</div>
          <div>{element.price}</div>
          <div>{element.image}</div>
          <div>{element.category}</div>
          <div>{element.description}</div>
          <div>{element.active}</div>
          <button onClick={() => deleteProduct(element)}>x</button>
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button>
          </Link>
        </div>)}
        <ToastContainer />
    </div> );
}

export default MaintainProducts;