import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Navbar.css';

function NavbarExample() {
  return (
    <>
      <Navbar expand="lg" bg="dark" variant="dark"  >
        <Container className='navleft'>
          <Navbar.Brand href="#home" className='nav-bigright'>Szoftverkereső</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home" className='navright'>Főmenü</Nav.Link>
              <Nav.Link href="#link" className='navright'>Összehasonlítás</Nav.Link>
              <NavDropdown title="Szoftverek" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Árak</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Valami
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Kérdőjel</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Valami
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <Form.Control type="search" placeholder="Keresés" className="custom-search-bar"/>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
    </>
  );
}

export default NavbarExample;
