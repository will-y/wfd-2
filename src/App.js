import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';

function App() {
  return (
      <div>
          <Navbar bg="light" expand="lg">
              <Container fluid>
                  <LinkContainer to="/">
                      <Navbar.Brand>What's For Dinner</Navbar.Brand>
                  </LinkContainer>
                  <Navbar.Toggle aria-controls="basic-navbar-nav" />
                  <Navbar.Collapse id="basic-navbar-nav">
                      <Nav className="me-auto">
                          <LinkContainer to="/recipes">
                              <Nav.Link>Recipes</Nav.Link>
                          </LinkContainer>
                          <LinkContainer to="/add-recipe">
                              <Nav.Link>Add Recipe</Nav.Link>
                          </LinkContainer>
                      </Nav>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <Container>
              <Outlet />
          </Container>
      </div>
  );
}

export default App;
