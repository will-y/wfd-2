import {Button, Modal} from "react-bootstrap";
import React, {useState} from "react";
import Form from "react-bootstrap/Form";
import {ref, set} from "firebase/database";
import {database} from "../../../firebase";

export function AddCollection(props) {
    const [collectionName, setCollectionName] = useState('');
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered dialogClassName="modal-90w">
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Add Collection
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form.Group>
                    <Form.Label>Collection Name</Form.Label>
                    <Form.Control type='text'
                                  value={collectionName} isInvalid={!validCollection(collectionName)}
                                  onChange={event => setCollectionName(event.target.value)} />
                    <Form.Control.Feedback type='invalid'>Invalid Collection Name</Form.Control.Feedback>
                </Form.Group>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide} variant='dark'>Cancel</Button>
                <Button variant='primary' onClick={() => addCollection(collectionName, props)}>Add</Button>
            </Modal.Footer>
        </Modal>
    );
}

function addCollection(name, props) {
    const collectionsRef = ref(database, process.env.REACT_APP_DATABASE + "/collections/" + name);

    set(collectionsRef, 'temp').then(() => props.onHide());
}

function validCollection(collectionName) {
    return collectionName !== '' && /^[a-zA-Z0-9-_]+$/.test(collectionName);
}
