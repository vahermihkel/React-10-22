import { useEffect, useState } from "react";

function ParcelMachines() {
  const [parcelMachines, setParcelMachines] = useState([]);

  useEffect(() => { // useEffect tuleb panna siis, kui lehele tulles tehakse koheselt API päring fetch() abil
    fetch("https://www.omniva.ee/locations.json")   // API päring võtab aega 0.1s - 2s
      .then(res => res.json())
      .then(json => setParcelMachines(json));
  }, []);

  return (
    <select>
      { parcelMachines
        .filter(element => element.A0_NAME === "EE")
        .map(element => <option key={element.NAME}>{element.NAME}</option>) }
    </select>
  )
}

export default ParcelMachines