import { useState } from "react";

// ffc
function Avaleht() {
  // let
  // var
  let [kogus, muudaKogus] = useState(5); // useState võimaldab muuta HTMLi

  function v2henda() {
    // kogus = kogus - 1;    ctrl + ä      edit ---> toggle line comment
    muudaKogus(kogus - 1);  
    console.log(kogus);
  }

  return ( 
    <div>
      <button onClick={v2henda}>-</button>
      <div>{kogus}</div>
      <button>+</button>

    </div> );
}

export default Avaleht;

// 16.00-19.00