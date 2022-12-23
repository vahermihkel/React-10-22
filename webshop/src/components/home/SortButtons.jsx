import { useTranslation } from 'react-i18next';

function SortButtons(props) {
  const { t } = useTranslation();

  const sortAZ = () => {
    props.products.sort((b,a) => b.name.localeCompare(a.name));
    props.changeProducts(props.products.slice());
  }
  
  const sortZA = () => {
    props.products.sort((a,b) => b.name.localeCompare(a.name));
    props.changeProducts(props.products.slice());
  }

  const sortPriceAsc = () => {
    props.products.sort((a,b) => a.price - b.price);
    props.changeProducts(props.products.slice());
  }

  const sortPriceDesc = () => {
    props.products.sort((a,b) => b.price - a.price);
    props.changeProducts(props.products.slice());
  }

  return (
    <div>
      <button onClick={sortAZ}>{t("sort-az")}</button>
      <button onClick={sortZA}>Sorteeri Z-A</button>
      <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
      <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
    </div>
  )
}

export default SortButtons