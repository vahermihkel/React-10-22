import { useState } from "react";
import { Link } from "react-router-dom";

function Tooted() {
  const [tooted, muudaTooted] = useState(JSON.parse(localStorage.getItem("tooted")) || []);

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

  const sorteeriAZ = () => {
    tooted.sort((a,b) => a.nimi.localeCompare(b.nimi));
    muudaTooted(tooted.slice());
  }

  const sorteeriZA = () => {
    tooted.sort((a,b) => b.nimi.localeCompare(a.nimi));
    // tooted.sort((a,b) => a.nimi.localeCompare(b.nimi));
    // tooted.reverse();

    // tooted.sort((a,b) => -1 * a.nimi.localeCompare(b.nimi));
    muudaTooted(tooted.slice());
  }

  const sorteeriHindKasvavalt = () => {
    tooted.sort((a,b) => a.hind - b.hind);
    muudaTooted(tooted.slice());
  }

  const sorteeriHindKahanevalt = () => {
    tooted.sort((a,b) => b.hind - a.hind);
    muudaTooted(tooted.slice());
  }

  const sorteeriUuedEes = () => {
    tooted.sort((a,b) => a.lisamiseAeg.localeCompare(b.lisamiseAeg));
    muudaTooted(tooted.slice());
  }

  const sorteeriUuedTaga = () => {
    tooted.sort((a,b) => b.lisamiseAeg.localeCompare(a.lisamiseAeg));
    muudaTooted(tooted.slice());
  }

  const sorteeriNimiKasvavalt = () => {
    tooted.sort((a,b) => a.nimi.length - b.nimi.length);
    muudaTooted(tooted.slice());
  }

  const sorteeriNimiKahanevalt = () => {
    tooted.sort((a,b) => b.nimi.length - a.nimi.length);
    muudaTooted(tooted.slice());
  }

  const tootedAndmebaasist = (JSON.parse(localStorage.getItem("tooted")) || [])
    .filter(element => element.aktiivne === true);

  const filtreeri = (algusT2ht) => {
    const tulem = tootedAndmebaasist.filter(element => element.nimi.startsWith(algusT2ht));
    muudaTooted(tulem);
  }

  const eesnimeT2hed = [...new Set(tootedAndmebaasist.map(element => element.nimi.charAt(0)))];

  return ( 
    <div>
      {/* toodete eesnimede tähed-> teeme sellise arenduse, kus selle nupu peale vajutades,
      ta näitab vaid selle algustähega tooteid */}
      {/* <button onClick={() => filtreeri("V")}>V</button>
      <button onClick={() => filtreeri("P")}>P</button>
      <button onClick={() => filtreeri("H")}>H</button> */}
      { eesnimeT2hed.map((element, i) => <button key={i} onClick={() => filtreeri(element)}>{element}</button>) }
      <div>{tooted.length} tk</div>
      <button onClick={sorteeriAZ}>Sorteeri A-Z</button>
      <button onClick={sorteeriZA}>Sorteeri Z-A</button>
      <button onClick={sorteeriHindKasvavalt}>Sorteeri hind kasvavalt</button>
      <button onClick={sorteeriHindKahanevalt}>Sorteeri hind kahanevalt</button>
      <button onClick={sorteeriUuedEes}>Sorteeri uued ees</button>
      <button onClick={sorteeriUuedTaga}>Sorteeri vanad ees</button>
      <button onClick={sorteeriNimiKasvavalt}>Sorteeri lühemad nimed ees</button>
      <button onClick={sorteeriNimiKahanevalt}>Sorteeri pikemad nimed ees</button>
      {tooted.filter(element => element.aktiivne === true).map((element, index) => 
        <div key={index}>
          <Link to={"/toode/" + index}>
            {/* Objects are not valid as a React child (found: object with keys {nimi, hind, pilt, aktiivne}) */}
            <img src={element.pilt} alt="" />
            <div>{element.nimi}</div>
            <div>{element.hind}</div>
          </Link>
          <button onClick={() => lisaOstukorvi(element)}>Lisa ostukorvi</button>
        </div>)}
    </div> );
}

export default Tooted;