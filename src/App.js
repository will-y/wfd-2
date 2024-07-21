import './App.css';
import {Button, Container, Nav, Navbar} from "react-bootstrap";
import {Outlet} from "react-router-dom";
import {LinkContainer} from 'react-router-bootstrap';
import Form from 'react-bootstrap/Form';
import React, {useEffect, useState} from "react";
import {auth, database} from "./firebase";
import {get, onValue, ref} from "firebase/database";
import {AddCollection} from "./components/pages/other/AddCollection";

function App() {
    const [collections, setCollections] = useState([]);
    const [selectedCollection, setSelectedCollection] = useState('');
    const [addCollectionModal, setAddCollectionModal] = useState(false);
    // TODO: Duplicated logic with RequireAuth
    const [isAdmin, setAdmin] = useState(false);

    if (collections.length > 0 && selectedCollection === '') {
        setSelectedCollection(collections[0]);
    }

    useEffect(() => {
        auth.onAuthStateChanged(user => {
            if (auth.currentUser) {
                const collectionsRef = ref(database, process.env.REACT_APP_DATABASE + "/collections");

                onValue(collectionsRef, snapshot => {
                    if (snapshot.exists()) {
                        const collections = Object.keys(snapshot.val());

                        if (collections.length > 0) {
                            setCollections(Object.keys(snapshot.val()));
                        }
                    }
                });
            }

            // Set Role
            if (user !== null) {
                const userRef = ref(database, "/users/" + user.uid);

                get(userRef).then(snapshot => {
                    if (snapshot.exists()) {
                        setAdmin(snapshot.val() === 'admin');
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
                          {isAdmin ?
                              <LinkContainer to="/admin-controls">
                                  <Nav.Link>Admin Controls</Nav.Link>
                              </LinkContainer> :
                              <>/</>
                          }
                      </Nav>
                      <Form.Select aria-label="Default select example"
                                   className='collection-select'
                                   value={selectedCollection}
                                   onChange={e => setSelectedCollection(e.target.value)}>
                          {collections.map(collection => {
                              return <option name={collection} key={collection}>{collection}</option>
                          })}
                      </Form.Select>
                      <Button variant="success"
                              className="add-component-button"
                              onClick={() => setAddCollectionModal(true)}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                               className="bi bi-plus-lg" viewBox="0 0 16 16">
                              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                          </svg>
                      </Button>
                  </Navbar.Collapse>
              </Container>
          </Navbar>
          <Container>
              <Outlet context={selectedCollection}/>
          </Container>
          <AddCollection show={addCollectionModal} onHide={() => setAddCollectionModal(false)} />
      </div>
  );
}

export default App;
