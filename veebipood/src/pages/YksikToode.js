import { useParams } from "react-router-dom";

function YksikToode() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];
  // tooted[2] = "Fisker";

  /*
  const urlParameetrid = useParams();
  const leitudToode = tooted[urlParameetrid.j2rjekorraNumber];
  */

  // toode/:j2rjekorraNumber
  const { j2rjekorraNumber } = useParams();
  const leitudToode = tooted[j2rjekorraNumber];

  // ["Saab", "Volvo", "BMW"][2] ---> "BMW"
  // "["Saab", "Volvo", "BMW"]"[2] ---> "S"

  //   tooted[0] = "Opel";

  return ( 
    <div>
      <div>{tooted}</div>
      <div>{j2rjekorraNumber}</div>
      { leitudToode !== undefined && <div>{leitudToode}</div>}
      { leitudToode === undefined && <div>Toodet ei leitud</div>}
    </div> );
}

export default YksikToode;