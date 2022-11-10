import { Link } from "react-router-dom";

function Tooted() {
  const tooted = JSON.parse(localStorage.getItem("tooted")) || [];

  const lisaOstukorvi = (klikitudToode) => {
    let ostukorvLS = localStorage.getItem("ostukorv");
    ostukorvLS = JSON.parse(ostukorvLS) || [];
    ostukorvLS.push(klikitudToode);
    ostukorvLS = JSON.stringify(ostukorvLS);
    localStorage.setItem("ostukorv", ostukorvLS);
  // 1. võtan LocalStorage-st kõik varasemad väärtused ( .getItem("võti")  )
  // 2. võtan LocalStorage-st saadud väärtustest jutumärgid maha   (  JSON.parse()  ) VÕI tühi array
  // 3. lisan ühe toote juurde   (   .push()   )
  // 4. panen jutumärgid tagasi (    JSON.stringify()    )
  // 5. panen tagasi LocalStorage-sse     (    setItem("võti", uus_väärtus)     )
  }

  return ( 
    <div>
      {tooted.map((element, index) => 
        <div key={element}>
          <Link to={"/toode/" + index}>
            {element}
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default Tooted;