import { Link, Route, Routes } from 'react-router-dom';
import './App.css';
import Avaleht from './pages/Avaleht';
import LisaToode from './pages/LisaToode';
import Meist from './pages/Meist';
import Ostukorv from './pages/Ostukorv';
import Poed from './pages/Poed';
import Seaded from './pages/Seaded';
import Tooted from './pages/Tooted';
import HaldaTooteid from './pages/HaldaTooteid';
import MuudaToode from './pages/MuudaToode';
import YksikToode from './pages/YksikToode';

function App() {
  return (
    <div className="App">
      <Link to="/">
        <img className="main-pilt" src="https://estonia.ee/wp-content/uploads/nobe_netist_4.jpg" alt="" />
      </Link>
      <Link to="/tooted">
        <button className="nupp">Tooted</button>
      </Link>
      <Link to="/ostukorv">
        <button className="nupp">Ostukorvi</button>
      </Link>
      <Link to="/lisa-toode">
        <button className="nupp">Lisa toode</button>
      </Link>
      <Link to="/seaded">
        <button className="nupp">Seaded</button>
      </Link>
      <Link to="/meist">
        <button className="nupp">Meist</button>
      </Link>
      <Link to="/poed">
        <button className="nupp">Poed</button>
      </Link>
      <Link to="/halda">
        <button className="nupp">Halda tooteid</button>
      </Link>

      <Routes>
        <Route path="" element={ <Avaleht /> } />
        <Route path="tooted" element={ <Tooted /> } />
        <Route path="ostukorv" element={ <Ostukorv /> } />
        <Route path="lisa-toode" element={ <LisaToode /> } />
        <Route path="seaded" element={ <Seaded /> } />
        <Route path="meist" element={ <Meist /> } />
        <Route path="poed" element={ <Poed /> } />
        <Route path="halda" element={ <HaldaTooteid /> } />
        <Route path="muuda" element={ <MuudaToode /> } />
        <Route path="toode/:j2rjekorraNumber" element={ <YksikToode /> } />
      </Routes>


    </div>
  );
}

export default App;
