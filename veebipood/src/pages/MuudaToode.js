import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";

function MuudaToode() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  const { index } = useParams();   // app.js sisse muuda/:index
  const leitudToode = tooted[index];

  const nimiViide = useRef();  // nimiRef

  const navigate = useNavigate();

  const muuda = () => {
    tooted[index] = nimiViide.current.value;
    // ["BMW", "Tesla", "Nobe"][1] = "Mercedes"
    // ["BMW", "Mercedes", "Nobe"]
    localStorage.setItem("tooted", JSON.stringify(tooted));
    navigate("/halda");
  }

  return ( 
    <div>
      <div>{index}</div>
      { leitudToode !== undefined && 
        <div>
          <div>{leitudToode}</div>
          <label>Toote nimi</label> <br />
          <input defaultValue={leitudToode} ref={nimiViide} type="text" /> <br />
          <button onClick={muuda}>Muuda</button> <br />
        </div>}
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default MuudaToode;