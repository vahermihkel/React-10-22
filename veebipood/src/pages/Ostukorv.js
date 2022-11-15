import { useState } from "react";

function Ostukorv() {
  const [ostukorv, uuendaOstukorvi] = useState(JSON.parse(localStorage.getItem("ostukorv")) || []);

  const kustuta = (j2rjekorraNumber) => {
    ostukorv.splice(j2rjekorraNumber, 1);
    uuendaOstukorvi(ostukorv.slice()); // HTML uuenduseks
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv)); // Salvestuseks
  }

  const lisa = (klikitudToode) => {
    ostukorv.push(klikitudToode);
    uuendaOstukorvi(ostukorv.slice());
    localStorage.setItem("ostukorv", JSON.stringify(ostukorv));
  }

  const tyhjenda = () => {
    uuendaOstukorvi([]);
    //localStorage.setItem("ostukorv", "[]");
    localStorage.setItem("ostukorv", JSON.stringify([]));
  }

  return ( 
    <div>
      <button onClick={tyhjenda}>Tühjenda</button>
      <div>Kokku on {ostukorv.length} eset ostukorvis</div>
      {ostukorv.map((element,index) => 
        <div key={index}>
          <div>{element.nimi}</div>
          <div>{element.hind}</div>
          <div>{element.pilt}</div>
          <div>{element.aktiivne}</div>
          <button onClick={() => kustuta(index)}>x</button>
          <button onClick={() => lisa(element)}>+</button>
        </div>
      )}
    </div> );
}

export default Ostukorv;