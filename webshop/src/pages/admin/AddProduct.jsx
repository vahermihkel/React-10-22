import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import productsFromFile from '../../data/products.json';
import { toast } from 'react-toastify';
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

    const addNewProduct = () => {
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

        productsFromFile.push(newProduct);
        navigate("/admin/maintain-products");
    }

  const checkIdUniqueness = () => {
    const found = productsFromFile.find(element => element.id === Number(idRef.current.value) );
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
        </div>
    );
}

export default AddProduct;

// Väikekaupmehele/iseendale portaali: Wordpress. Kulu 2500 eurot. 1-2nädalat.

// Keskmine custom-made: 10 000-50 000 eelarve. 6 kuud. React frontend, NodeJS / Next.js backend

// Suur custom-made: 100 000+. vähemalt 1 aasta. 3.8miljonit/5aastat 5inimest. React frontend / Java backend
