import { useEffect, useRef, useState } from "react";
import config from "../../data/config.json";

function MaintainCategories() {
  // kategooriate lisamine, kuvamine, kustutamine -> Firebase
  const [categories, setCategories] = useState([]);
  const categoryRef = useRef();

  useEffect(() => {
    fetch(config.categoriesDbUrl)
      .then(res => res.json())
      .then(json => setCategories(json || []));
  }, []);

  const addCategory = () => {
    categories.push({"name": categoryRef.current.value});
    fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)});
    categoryRef.current.value = "";
    setCategories(categories.slice()); // HTML uuendus
  }

  const deleteCategory = (index) => {
    categories.splice(index,1);
    fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)});
    setCategories(categories.slice()); // HTML uuendus
  }

  return ( 
    <div>
      <label>Kategooria nimi</label> <br />
      <input ref={categoryRef} type="text" /> <br />
      <button onClick={addCategory}>Sisesta</button>
      {categories.map((element,i) => 
        <div key={i}>
          {element.name} 
          <button onClick={() => deleteCategory(i)}>x</button> 
        </div>)}
    </div>
   );
}

export default MaintainCategories;