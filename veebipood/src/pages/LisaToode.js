import { useRef, useState } from "react";

function LisaToode() {
  const [sonum, muudaSonum] = useState("Lisa uus toode!");
  const nimiRef = useRef();
  // alati kui teen refi, panen ta kuhugi input sisse
  // ja alati kui teen inputi, panen Reactis talle ref sisse

  const lisaUusToode = () => {
    if (nimiRef.current.value === "") {
      muudaSonum("Toodet lisades peab nime sisestama!");
    } else { 
      muudaSonum("Lisasid uue toote " + nimiRef.current.value);
      // const tootedLS = JSON.parse(localStorage.getItem("tooted")) || [];
      // tootedLS.push(nimiRef.current.value);
      // localStorage.setItem("tooted", JSON.stringify(tootedLS) );

      let tooted = localStorage.getItem("tooted");  //  1.  "["Tesla", "Nobe"]"   2.  null
      tooted = JSON.parse(tooted) || [];            //  1.   ["Tesla", "Nobe"]    2.  []
      tooted.push(nimiRef.current.value);           //  1.["Tesla", "Nobe", "BMW"] 2. ["BMW"]
      tooted = JSON.stringify(tooted);            //  1."["Tesla", "Nobe", "BMW"]" 2. "["BMW"]"
      localStorage.setItem("tooted", tooted );    //   Key    |    Value
    }                                     //1.      "tooted"  |   "["Tesla", "Nobe", "BMW"]" 
  }                                       //2.      "tooted"  |   "["BMW"]" 

  // 1. võtan LocalStorage-st kõik varasemad väärtused ( .getItem("võti")  )
  // 2. võtan LocalStorage-st saadud väärtustest jutumärgid maha   (  JSON.parse()  )
  // 3. lisan ühe toote juurde   (   .push()   )
  // 4. panen jutumärgid tagasi (    JSON.stringify()    )
  // 5. panen tagasi LocalStorage-sse     (    setItem("võti", uus_väärtus)     )

  return ( 
    <div>
      <div>{sonum}</div>
      <label>Toote nimi</label> <br />
      <input ref={nimiRef} type="text" /> <br />
      <button onClick={() => lisaUusToode()}>Vajuta</button> <br />
    </div>
    );
}

export default LisaToode;