import { useState } from "react";

function Seaded() {
  const [keel, uuendaKeel] = useState("est");

  return ( 
    <div>
      <button onClick={() => uuendaKeel("est")}>EE</button>
      <button onClick={() => uuendaKeel("eng")}>EN</button>
      <button onClick={() => uuendaKeel("rus")}>RU</button>
      { keel === "est" && <div>Vaatad eesti keelset veebisaiti</div> }
      { keel === "eng" && <div>Vaatad inglise keelset veebisaiti</div> }
      { keel === "rus" && <div>Vaatad vene keelset veebisaiti</div> }
    </div> );
}

export default Seaded;