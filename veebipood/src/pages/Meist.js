
// MUUDAN HTMLi:
// 1. Routinguga (URL vahetus)
// 2. useState

import { useState } from "react";

function Meist() {
  const [n2itaEmaili, muudaN2itaEmaili] = useState(false);
  const [telefon, uuendaTelefon] = useState(localStorage.getItem("telefon") || "Telefoni pole veel lisatud");

  const lisaSuunaKood = () => {
    uuendaTelefon("+372" + telefon);
  }

  return ( 
    <div>
      <div>Meie email: 
          { n2itaEmaili === true && <span>{localStorage.getItem("email") || "Emaili pole veel lisatud"}</span> }
          { n2itaEmaili === false && <button onClick={() => muudaN2itaEmaili(true)}>Näita e-maili</button> }
      </div>
      <div>Meie telefon: 
          <span>{ telefon }</span>
          { telefon.startsWith("+372") === false && <button onClick={lisaSuunaKood}>Lisa suunakood ette</button>}
      </div>
    </div> );
}

export default Meist;