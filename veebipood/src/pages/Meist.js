
// MUUDAN HTMLi:
// 1. Routinguga (URL vahetus)
// 2. useState

import { useState } from "react";

function Meist() {
  const [n2itaEmaili, muudaN2itaEmaili] = useState(false);

  return ( 
    <div>
      <div>Meie email: 
          { n2itaEmaili === true && <span>{localStorage.getItem("email") || "Emaili pole veel lisatud"}</span> }
          { n2itaEmaili === false && <button onClick={() => muudaN2itaEmaili(true)}>Näita e-maili</button> }
      </div>
      <div>Meie telefon: { localStorage.getItem("telefon") || "Telefoni pole veel lisatud" }</div>
    </div> );
}

export default Meist;