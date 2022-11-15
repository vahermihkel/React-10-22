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
  const poodRef = useRef(); // nimiViide
  const aegRef = useRef(); // aegViide

  const sorteeriAZ = () => {
    // stringid: poed.sort((a,b) => a.localeCompare(b));
    // stringid: poed.sort();

    poed.sort((a,b) => a.nimi.localeCompare(b.nimi));

    // console.log(poed);
    uuendaPoed(poed.slice());
  }

  const sorteeriZA = () => {
    // stringid:  poed.sort((a,b) => b.localeCompare(a));
    // stringid: poed.sort();
    // + poed.reverse();

    poed.sort((a,b) => b.nimi.localeCompare(a.nimi));

    // poed.sort((a,b) => a.nimi.localeCompare(b.nimi));
    // poed.reverse();

    // poed.sort((a,b) => -1 * a.nimi.localeCompare(b.nimi));

    uuendaPoed(poed.slice());
  }

  const sorteeriTahtedeJargi = () => {
    poed.sort((a,b) => a.nimi.length - b.nimi.length);
    uuendaPoed(poed.slice()); // .slice() ---> koopia tegemiseks (uuendab iseennast iseendaga)
  }

  const filtreeriLopuJargi = () => {
    const tulem = poed.filter( pood => pood.nimi.endsWith("mäe") );
    uuendaPoed(tulem);
  }

  const filtreeriIJargi = () => {
    const tulem = poed.filter( pood => pood.nimi.includes("i") || pood.nimi.includes("I") || pood.nimi.includes("|") );
    uuendaPoed(tulem);
  }

  const originaalsedTagasi = () => {
    uuendaPoed([
      {"nimi": "Lasnamäe", "aeg": "9-22"}, 
      {"nimi": "Kesklinn", "aeg": "8-22"}, 
      {"nimi": "Mustamäe", "aeg": "9-23"}, 
      {"nimi": "Õismäe", "aeg": "9-21"}, 
      {"nimi": "Kristiine", "aeg": "10-22"}, 
      {"nimi": "Põhja-Tallinn", "aeg": "11-00"}, 
      {"nimi": "Kakumäe", "aeg": "10-17"}, 
      {"nimi": "Isaku", "aeg": "9-20"}
  ]);
  }

  const muudaIgaYht = () => {
                      //  "Lasnamäe" => "--" + "Lasnamäe"
                      //  "Kesklinn" => "--" + "Kesklinn"

                      // {"nimi": "Lasnamäe", "aeg": "9-22"}
                      // => {"nimi": "--Lasnamäe", "aeg": "9-22"}
    const tulem = poed.map(element => {return {"nimi": "--" + element.nimi, "aeg": element.aeg}});
    uuendaPoed(tulem);
  }

  const kustuta = (j2rjekorraNumber) => {
    poed.splice(j2rjekorraNumber, 1); // mitmendat kustutan ja mitu tk kustutan
    uuendaPoed(poed.slice());
  }

  const lisa = () => {
    poed.push({"nimi": poodRef.current.value, "aeg": aegRef.current.value});
    uuendaPoed(poed.slice());
  }

  return ( 
    <div>
      <label>Uue poe nimi</label> <br />
      <input ref={poodRef} type="text" /> <br />
      <label>Uue poe lahtiolekuaeg</label> <br />
      <input ref={aegRef} type="text" /> <br />
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
          {pood.nimi} - {pood.aeg}
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