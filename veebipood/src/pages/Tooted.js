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
        <div key={index}>
          <Link to={"/toode/" + index}>
            {/* Objects are not valid as a React child (found: object with keys {nimi, hind, pilt, aktiivne}) */}
            <img src={element.pilt} alt="" />
            <div>{element.nimi}</div>
            <div>{element.hind}</div>
            <div>{element.aktiivne}</div>
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default Tooted;