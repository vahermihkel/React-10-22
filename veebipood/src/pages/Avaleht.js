import { useState } from "react";

// ffc
function Avaleht() {
  // let
  // var

  // []    <--- useState võrdusmärgist vasakul, vasakpoolne komast tähistab muutujat ja parempoolne funktsiooni
  //* []    <--- array - veel pole teinud
  // function()    <--- funktsioonide väljakutsumiseks, kollase sõna järel
  // if ()         <--- tõesuse kontroll
  // =         <--- väärtuse andmiseks
  // ===       <--- kontrollimiseks kas vasak ja parem pool on võrdsed        KUI ON VÕRDSED on TRUE
  // !==       <--- kontrollimiseks kas vasak ja parem pool ei ole võrdsed    KUI EI OLE VÕRDSED on TRUE
  // >      <--- suurem
  // >=     <--- suurem/võrdne
  // !true      <--- keerab väärtuse vastupidiseks      !true ----> false       !false ---> true
  // {}       <---   1. koodiblokkide eristamiseks      function nimetus() { <-- algus      lõpp -->}
  //      1. koodiblokkide eristamiseks      if() { <-- algus      lõpp -->} else { <-algus  lõpp->}
  // {}   2. HTML koodiblokis JS    (sealt seest tehakse viide JavaScriptile)   
  //                                                      1)  input ref={}   2) button onClick={}  
  //  2. HTML koodibloki dünaamika (seal sees teen kontrolli, kas näitan või mitte)    { true/false  && <div>  }
  //* {}    <---- objektide jaoks ehk väärtuste komplekti kokkusidumiseks
  // &&    <---  kui vasakul on tõde, siis näita parempoolset          true  && <div>Siis näitan</div>
  //* ||    <---  kui vasakul on tühjus, siis võta parempoolne          null  ||  "Võtab selle kui on tühjus"
  //* null  <---  JavaScriptis tühjus 
  // () => {}       <--   Funktsiooni tähis
  // ;              <--   Rea lõpetamise tähis (ei ole kohustuslik)

  const [laigitud, muudaLaigitud] = useState(false);

  // let kogus = 5;
  const [kogus, muudaKogus] = useState(5); // useState võimaldab muuta HTMLi
  const [sonum, muudaSonum] = useState("");

  function nulli() {
    muudaKogus(0);
    muudaSonum("Kogus nullitud");
  }

  function v2henda() {
    // kogus = kogus - 1;    ctrl + ä      edit ---> toggle line comment
    muudaKogus("dasdasdasd");  
    console.log(kogus);
    muudaSonum("Kogus vähendatud");
  }

  function suurenda() {
    muudaKogus(kogus + 1);
    muudaSonum("Kogus suurendatud");
  }

  // ! kui mul on kompileerimise vead, siis nad tulevad sinna, kus on npm start käima
  //        ning lehele ka - localhostis läheb taust halliks/mustaks - on kirjas, mis on katki

  // ! kui mul on run-time error, siis leht on valge
  //        ja need vead leian: hiirega parem klõps lehel -> inspect -> console

  return ( 
    <div>
      {/* <button hidden={kogus === 0} onClick={nulli}>Nulli tagasi</button> <br /> */}

      {/*  mul on 2 varianti:
      a)  onClick={funktsiooniNimi}
      b)  onClick={() => funktsiooniNimi(kaasasaadetu)} */}
      <button onClick={() => muudaLaigitud(!laigitud)}>Muuda laigitut</button>
      { laigitud === true && <img onClick={() => muudaLaigitud(false)} src="/liked.svg" alt="" />}
      { laigitud === false && <img onClick={() => muudaLaigitud(true)} src="/not-liked.svg" alt="" />}

      <div>{ sonum }</div>
      { kogus > 0 && <button onClick={nulli}>Nulli tagasi</button> } <br />
      <button disabled={kogus === 0} onClick={v2henda}>-</button>
      <div>{kogus}</div>
      <button onClick={suurenda}>+</button>

    </div> );
}

export default Avaleht;