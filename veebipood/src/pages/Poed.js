import { useRef } from "react";
import { useState } from "react";
import poedFailist from "../poed.json";

// hall-tume taust koos tekstiga on viga seal kus npm start
// kui on valge taust, siis parem klõps -> inpsect -> console

function Poed() {
  // array - list - massiiv
  //const poed = ["Lasnamäe", "Kesklinn", "Mustamäe", "Õismäe", "Kristiine", "Põhja-Tallinn", "Kakumäe"];
  const [poed, uuendaPoed] = useState(
      poedFailist
    );

  const sorteeriAZ = () => {
    // poed.sort((a,b) => a.localeCompare(b));
    poed.sort();
    // console.log(poed);
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
        // poed.sort((a,b) => b.localeCompare(a));
    poed.sort();
    poed.reverse();
    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeJargi = () => {
    poed.sort((a,b) => a.length - b.length);
    uuendaPoed(poed.slice()); // .slice() ---> koopia tegemiseks (uuendab iseennast iseendaga)
  }

  const filtreeriLopuJargi = () => {
    const tulem = poed.filter( pood => pood.endsWith("mäe") );
    uuendaPoed(tulem);
  }

  const filtreeriIJargi = () => {
    const tulem = poed.filter( pood => pood.includes("i") || pood.includes("I") || pood.includes("|") );
    uuendaPoed(tulem);
  }

  const originaalsedTagasi = () => {
    uuendaPoed(["Lasnamäe", "Kesklinn", "Mustamäe", 
    "Õismäe", "Kristiine", "Põhja-Tallinn", "Kakumäe", "Isaku"]);
  }

  const muudaIgaYht = () => {
    const tulem = poed.map(element => "--" + element);
    uuendaPoed(tulem);
  }

  const kustuta = (j2rjekorraNumber) => {
    poed.splice(j2rjekorraNumber, 1); // mitmendat kustutan ja mitu tk kustutan
    uuendaPoed(poed.slice());
  }

  const poodRef = useRef();

  const lisa = () => {
    poed.push(poodRef.current.value);
    uuendaPoed(poed.slice());
  }

  return ( 
    <div>
      <label>Uue poe nimi</label>
      <input ref={poodRef} type="text" />
      <button onClick={lisa}>Lisa uus</button> 
      <br />
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriTahtedeJargi}>Sorteeri tähtede järjekorras</button>
      <button onClick={filtreeriLopuJargi}>Jäta alles kellel lõpus 'mäe'</button>
      <button onClick={filtreeriIJargi}>Jäta alles kellel on 'i' täht nimes</button>
      <button onClick={originaalsedTagasi}>Pane tagasi</button>
      <button onClick={muudaIgaYht}>Pane igaühele -- ette</button>
      {poed.map( (pood,index) => 
        <div key={index}>
          {pood}
          <button onClick={() => kustuta(index)}>x</button>
        </div> )}
      <div>-------------------------------</div>
      <div>Lasnamäe</div>
      <div>Kesklinn</div>
      <div>Mustamäe</div>
      <div>Õismäe</div>
      <div>Kristiine</div>
      <div>Põhja-Tallinn</div>
      <div>Kakumäe</div>

      {["BMW", "Nobe", "Tesla"].map( (auto, j2rjekorraNumber) => <div key={j2rjekorraNumber}>{auto}</div>)}
    </div> );
}

export default Poed;