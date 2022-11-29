import { useState } from "react";
import { Link } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function MaintainProducts() {
  const [products, setProducts] = useState(productsFromFile);

  const deleteProduct = (i) => {
    productsFromFile.splice(i,1);
    setProducts(productsFromFile.slice());
  }

  return ( 
    <div>
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
          <button onClick={() => deleteProduct(index)}>x</button>
          <Link to={"/admin/edit-product/" + element.id}>
            <button>Muuda</button>
          </Link>
        </div>)}
    </div> );
}

export default MaintainProducts;