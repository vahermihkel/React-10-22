import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from "react-bootstrap/Button";
import config from '../../data/config.json';
import { ToastContainer, toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';
import FileUpload from "../../components/FileUpload";
import ToggleButton from 'react-bootstrap/ToggleButton';
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';

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
    const [categories, setCategories] = useState([]);
  
    useEffect(() => {
      fetch(config.categoriesDbUrl)
        .then(res => res.json())
        .then(json => setCategories(json));

      fetch(config.productsDbUrl)
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
        if (/^[A-ZÜÕÖÄ].*/.test(nameRef.current.value) === false) {
          toast.error("Nimi ei hakka suure algustähega");
          return; // funktsioonist ära enam edasi mine
        }
        if (priceRef.current.value === "") {
          toast.error("Hind ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }
        // if (imageRef.current.value === "") {
        //   toast.error("Pilt ei ole täidetud");
        //   return; // funktsioonist ära enam edasi mine
        // }
        // if (/^\S*$/.test(imageRef.current.value) === false) {
        //   toast.error("Pildi aadressile ei saa sisestada tühikuid");
        //   return; // funktsioonist ära enam edasi mine
        // }
        if (descriptionRef.current.value === "") {
          toast.error("Kirjeldus ei ole täidetud");
          return; // funktsioonist ära enam edasi mine
        }

        const newProduct = {
            "id": Number(idRef.current.value),
            "name": nameRef.current.value,
            "price": Number(priceRef.current.value),
            "image": isUrlSelected === true ? imageRef.current.value : imageUrl,
            "category": categoryRef.current.value,
            "description": descriptionRef.current.value,
            "active": activeRef.current.checked
        }

        toast.success(t("added_new_product"), {
            "position": "bottom-right",
            "theme": "dark"
        });

        dbProducts.push(newProduct);
        fetch(config.productsDbUrl, 
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

  const [imageUrl, setImageUrl] = useState("");
  const [isUrlSelected, setUrlSelected] = useState(true);

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
            <ToggleButtonGroup type="radio" name="options" defaultValue={1}>
              <ToggleButton id="tbg-radio-1" onClick={() => setUrlSelected(true)} value={1}>
                URL
              </ToggleButton>
              <ToggleButton id="tbg-radio-2" onClick={() => setUrlSelected(false)} value={2}>
                File
              </ToggleButton>
            </ToggleButtonGroup>
            <br />
            <label>{t("product_image")}</label><br />
            {isUrlSelected === true && <input ref={imageRef} type="text" />}
            {isUrlSelected === false && <FileUpload onSendPictureUrl={setImageUrl} />}
            <br /><br />
            <label>{t("product_category")}</label><br />
            {/* <input ref={categoryRef} type="text" /> */}
            <select ref={categoryRef}>
              {categories.map(element => <option key={element.name}>{element.name}</option>)}
            </select>
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
