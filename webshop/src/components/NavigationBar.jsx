import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useTranslation } from 'react-i18next';
import { useContext } from 'react';
import CartSumContext from "../store/CartSumContext";

function NavigationBar() {
  const { t, i18n } = useTranslation();
  const cartSumCtx = useContext(CartSumContext);

  const changeLang = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
  }

  return ( 
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand as={Link} to="/">Webshop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/admin">{t('admin')}</Nav.Link>
            <Nav.Link as={Link} to="/shops">{t('shops')}</Nav.Link>
            <Nav.Link as={Link} to="/contact">Võta meiega ühendust</Nav.Link>
            <Nav.Link as={Link} to="/cart">{t('cart')}</Nav.Link>
          </Nav>
          <div style={{"color": "white"}}>{cartSumCtx.cartSum} €</div>
          <img className="lang" src="/estonia.png" alt="" onClick={() => changeLang("ee")} />
          <img className="lang" src="/uk.png" alt="" onClick={() => changeLang("en")} />
        </Container>
      </Navbar>
   );
}

export default NavigationBar;