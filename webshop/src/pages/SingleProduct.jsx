import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import productsFromFile from '../data/products.json';
import { useTranslation } from 'react-i18next';

function SingleProduct() {
    const [dbProducts, setDbProducts] = useState([]);
    const { id } = useParams();
    const productClicked = dbProducts.find(element => element.id === Number(id));
    const { t } = useTranslation();

    const dbUrl = "https://react-mihkel-webshop-10-22-default-rtdb.europe-west1.firebasedatabase.app/products.json";

    useEffect(() => {
        fetch(dbUrl)
        .then(res => res.json())
        .then(json => setDbProducts(json));
    }, []);

    return ( 
        <div>
            {productClicked !== undefined && <div>
                <img src={productClicked.image} alt="" />
                <div>{t("product_name")}: {productClicked.name}</div>
                <div>{t("product_price")}: {productClicked.price}</div>
                <div>{t("product_category")}: {productClicked.category}</div>
                <div>{t("product_description")}: {productClicked.description}</div>
            </div>}
            {productClicked === undefined && <div>
                {t("product_not_found")}
            </div>}
        </div>
    );
}

export default SingleProduct;