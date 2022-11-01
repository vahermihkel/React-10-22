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
    }
  }

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