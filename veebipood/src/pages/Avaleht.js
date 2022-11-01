import { useState } from "react";

// ffc
function Avaleht() {
  // let
  // var

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
    muudaKogus(kogus - 1);  
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

// 16.00-19.00