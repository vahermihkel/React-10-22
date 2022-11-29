import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function EditProduct() {
  const { id } = useParams();                     //    35422021   ===   35422021
  const productFound = productsFromFile.find(element => element.id === Number(id));
  const index = productsFromFile.indexOf(productFound);
  const navigate = useNavigate(); 

  const idRef = useRef();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const categoryRef = useRef();
  const descriptionRef = useRef();
  const activeRef = useRef();

  const changeProduct = () => {
    const updatedProduct = {
      "id": Number(idRef.current.value), //  1312312312
      "name": nameRef.current.value, // "dasdsadasd"
      "price": Number(priceRef.current.value), // 3123123
      "image": imageRef.current.value, // "dadasda"
      "category": categoryRef.current.value, // "asdasda"
      "description": descriptionRef.current.value, // "adasfasd"
      "active": activeRef.current.checked,  // false
    }
    productsFromFile[index] = updatedProduct;
    navigate("/admin/maintain-products");
  }

  return ( 
  <div>
    { productFound !== undefined && <div>
      <label>ID</label> <br />
      <input ref={idRef} defaultValue={productFound.id} type="number" /> <br />
      <label>Nimi</label> <br />
      <input ref={nameRef} defaultValue={productFound.name} type="text" /> <br />
      <label>Hind</label> <br />
      <input ref={priceRef} defaultValue={productFound.price} type="number" /> <br />
      <label>Pilt</label> <br />
      <input ref={imageRef} defaultValue={productFound.image} type="text" /> <br />
      <label>Kategooria</label> <br />
      <input ref={categoryRef} defaultValue={productFound.category} type="text" /> <br />
      <label>Kirjeldus</label> <br />
      <input ref={descriptionRef} defaultValue={productFound.description} type="text" /> <br />
      <label>Aktiivne</label> <br />
      <input ref={activeRef} defaultChecked={productFound.active} type="checkbox" /> <br />
      <button onClick={changeProduct}>Muuda</button>
    </div>}
    { productFound === undefined && <div>
      Toodet ei leitud
    </div>}
  </div> );
}

export default EditProduct;

// SingleProduct <---- kodus
// 1. App.js failis peab olema URLi taga kooloniga muutuja
// 2. Koht kust ma satun sinna lehele, seal peab olema <Link> ja saadetud
//      URLi, kooloni koha peale mingi muutuja (toote ID)
// 3. Failis kus tahan toodet kätte saada, seal useParams() (ka import)
// hooki abil võtan selle URLi muutuja kätte
// 4. Võtan kõik tooted (productsFromFile)
// 5. Otsin üles õige toote toodete seast .find() abil ja teisenda numbriks URL-st saadud ID
// 6. Kuva välja HTMLs
// 7. Tee dünaamiline väljakuvamine, kui ei leitud (  ütle "toodet ei leitud",
//        kui on leitud toode tühi  )

// AddProduct <---- kodus
// 8. 7x teen useRef()   ( ka import )    id, name, price, image, category, description, active
// 9. 7x teen label + input
// 10. 7x panen ref-i iga inputi sisse
// 11. Teen nupu ja seon ta mingi funktsiooniga
// 12. Seon ref-i kõik current.value-d kokku ühe muutuja sisse

// 13. AddProductis: teen productsFromFile.push()

// 14. EditProductis: teen 7x defaultValue
// 15. Otsin üles järjekorranumbri (ainult jr nr alusel muudan)
// 16. Muudan productsFromFile[j2rjekorraNumber] = seotud_ref_muutuja;