import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const { index } = useParams();   // app.js sisse muuda/:index
  const leitudToode = tooted[index];

  const nimiViide = useRef();  // nimiRef
  const hindViide = useRef(); // priceRef
  const piltViide = useRef();
  const aktiivneViide = useRef();

  const navigate = useNavigate();

  const muuda = () => {
    const uusToode = {
      "nimi": nimiViide.current.value,
      "hind": Number(hindViide.current.value),
      "pilt": piltViide.current.value,
      "aktiivne": aktiivneViide.current.checked,
      "lisamiseAeg": leitudToode.lisamiseAeg
    }
    tooted[index] = uusToode;
    // ["BMW", "Tesla", "Nobe"][1] = "Mercedes"
    // ["BMW", "Mercedes", "Nobe"]
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda");
  }

  return ( 
    <div>
      {/* <div>{index}</div> */}
      { leitudToode !== undefined && 
        <div>
          <img src={leitudToode.pilt} alt="" />
          <div>{leitudToode.nimi}</div>
          <div>{leitudToode.hind}</div>
          <div>{leitudToode.aktiivne}</div>
          <br />
            <label>Toote nimi</label> <br />
            <input defaultValue={leitudToode.nimi} ref={nimiViide} type="text" /> <br />
            <label>Toote pilt</label> <br />
            <input defaultValue={leitudToode.pilt} ref={piltViide} type="text" /> <br />
            <label>Toote hind</label> <br />
          <input defaultValue={leitudToode.hind} ref={hindViide} type="number" /> <br />
          <label>Toote aktiivne</label> <br />
          <input defaultChecked={leitudToode.aktiivne} ref={aktiivneViide} type="checkbox" /> <br />
          <button onClick={muuda}>Muuda</button> <br />
        </div>}
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default MuudaToode;