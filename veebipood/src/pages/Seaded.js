import { useRef, useState } from "react";

function Seaded() {              // null  ehk seda võtit ei eksisteeri localStorage
  const [keel, uuendaKeel] = useState(localStorage.getItem("keel") || "est");
        // .getItem võtab viimase .setItem-i   -> 
        // kui pole kunagi tehtud .setItem, siis .getItem annab null-i ehk tühjuse
  const emailViide = useRef(); // emailRef
  const telefonViide = useRef(); // phoneRef

  const uuendaEmaili = () => {
    localStorage.setItem("email", emailViide.current.value);
  }

  const uuendaTelefoni = () => {
    localStorage.setItem("telefon", telefonViide.current.value);
  }
   
  // const muudaKeelEE = () => {    // function muudaKeel() {}
  //   uuendaKeel("est");
  //   localStorage.setItem("keel", "est");
  // }         
  
  // const muudaKeelEN = () => {
  //   uuendaKeel("eng");
  //   localStorage.setItem("keel", "eng");
  // }
  
  // const muudaKeelRU = () => {
  //   uuendaKeel("rus");
  //   localStorage.setItem("keel", "rus");
  // }

  const muudaKeel = (uusKeel) => {
    uuendaKeel(uusKeel);
    localStorage.setItem("keel", uusKeel);
  }
  
  return ( 
    <div>
      <label>Meie e-mail</label>
      <input defaultValue={localStorage.getItem("email")} ref={emailViide} type="text" />
      <button onClick={uuendaEmaili}>Sisesta</button>
      <br />
      <label>Meie telefon</label>
      <input defaultValue={localStorage.getItem("telefon")} ref={telefonViide} type="text" />
      <button onClick={uuendaTelefoni}>Sisesta</button>
      <br />

      <div>-------------------------------</div>
      <button onClick={() => muudaKeel("est")}>EE</button>
      <button onClick={() => muudaKeel("eng")}>EN</button>
      <button onClick={() => muudaKeel("rus")}>RU</button>
      { keel === "est" && <div>Vaatad eesti keelset veebisaiti</div> }
      { keel === "eng" && <div>Vaatad inglise keelset veebisaiti</div> }
      { keel === "rus" && <div>Vaatad vene keelset veebisaiti</div> }
    </div> );
}

export default Seaded;