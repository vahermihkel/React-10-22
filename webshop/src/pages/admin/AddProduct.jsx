import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
// import productsFromFile from '../../data/products.json';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

function AddProduct() {
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const activeRef = useRef();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const [idUnique, setIdUnique] = useState(true);

    const [dbProducts, setDbProducts] = useState([]);
    const dbUrl = "https://react-mihkel-webshop-10-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";
  
    useEffect(() => {
      fetch(dbUrl)
        .then(res => res.json())
        .then(json => setDbProducts(json));
    }, []);

    const addNewProduct = () => {
        if (idRef.current.value === "") {
          toast.error("Id ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        if (nameRef.current.value === "") {
          toast.error("Nimi ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        if (priceRef.current.value === "") {
          toast.error("Hind ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        if (imageRef.current.value === "") {
          toast.error("Pilt ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        if (/^\S*$/.test(imageRef.current.value) === false) {
          toast.error("Pildi aadressile ei saa sisestada tühikuid");
          return; // funktsioonist ära enam edasi mine
        }
        if (categoryRef.current.value === "") {
          toast.error("Kategooria ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        if (descriptionRef.current.value === "") {
          toast.error("Kirjeldus ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }

        const newProduct = {
            "id": Number(idRef.current.value),
            "name": nameRef.current.value,
            "price": Number(priceRef.current.value),
            "image": imageRef.current.value,
            "category": categoryRef.current.value,
            "description": descriptionRef.current.value,
            "active": activeRef.current.checked
        }

        toast.success(t("added_new_product"), {
            "position": "bottom-right",
            "theme": "dark"
        });

        dbProducts.push(newProduct);
        fetch(dbUrl, 
          {
            "method": "PUT", 
            "body": JSON.stringify(dbProducts)
          }
          ).then(() => navigate("/admin/maintain-products"));
    }

  const checkIdUniqueness = () => {
    const found = dbProducts.find(element => element.id === Number(idRef.current.value) );
    if (found === undefined) {
      setIdUnique(true);
    } else {
      setIdUnique(false);
    }
  }

    return ( 
        <div>
            { idUnique === false  && <div>Sisestatud ID on mõne teisega tootega sama!</div>}
            <label>{t("product_id")}</label><br />
            <input ref={idRef} onChange={checkIdUniqueness} type="number" />
            <br /><br />
            <label>{t("product_name")}</label><br />
            <input ref={nameRef} type="text" />
            <br /><br />
            <label>{t("product_price")}</label><br />
            <input ref={priceRef} type="number" />
            <br /><br />
            <label>{t("product_image")}</label><br />
            <input ref={imageRef} type="text" />
            <br /><br />
            <label>{t("product_category")}</label><br />
            <input ref={categoryRef} type="text" />
            <br /><br />
            <label>{t("product_description")}</label><br />
            <input ref={descriptionRef} type="text" />
            <br /><br />
            <label>{t("product_active")}</label><br />
            <input ref={activeRef} type="checkbox" />
            <br /><br />
            <Button disabled={ idUnique === false } onClick={addNewProduct}>{t("add_new_product")}</Button>
            <ToastContainer />
        </div>
    );
}

export default AddProduct;

// Väikekaupmehele/iseendale portaali: Wordpress. Kulu 2500 eurot. 1-2nädalat.

// Keskmine custom-made: 10 000-50 000 eelarve. 6 kuud. React frontend, NodeJS / Next.js backend

// Suur custom-made: 100 000+. vähemalt 1 aasta. 3.8miljonit/5aastat 5inimest. React frontend / Java backend
