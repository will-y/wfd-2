import './App.css';
import {Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import {useEffect, useState} from "react";
import {auth, database} from "./firebase";
import {get, ref} from "firebase/database";

function App() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (auth.currentUser) {
                const collectionsRef = ref(database, process.env.REACT_APP_DATABASE + "/collections");

                get(collectionsRef).then(snapshot => {
                    if (snapshot.exists()) {
                        const collections = Object.keys(snapshot.val());
                        if (collections.length > 0) {
                            setCollections(Object.keys(snapshot.val()));
                            setSelectedCollection(collections[0]);
                        }

                    }
                });
            }
        });
    }, []);

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
                          <LinkContainer to="/">
                              <Nav.Link>Schedule</Nav.Link>
                          </LinkContainer>
                          <LinkContainer to="/recipes">
                              <Nav.Link>Recipes</Nav.Link>
                          </LinkContainer>
                          <LinkContainer to="/add">
                              <Nav.Link>Add Recipe</Nav.Link>
                          </LinkContainer>
                          <LinkContainer to="/ingredient-list">
                              <Nav.Link>Ingredient List</Nav.Link>
                          </LinkContainer>
                      </Nav>
                      <Form.Select aria-label="Default select example"
                                   className='collection-select'
                                   value={selectedCollection}
                                   onChange={e => setSelectedCollection(e.target.value)}>
                          {collections.map(collection => {
                              return <option name={collection} key={collection}>{collection}</option>
                          })}
                      </Form.Select>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <Container>
              <Outlet context={selectedCollection}/>
          </Container>
      </div>
  );
}

export default App;
