import {Button, Col, Container, FloatingLabel, Form, Row, Table} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import {
    addRecipeType,
    addUnit,
    deleteRecipeType,
    getRecipeTypes,
    getUnits,
    updateRecipeType
} from "../../../service/AdminServices";

export function AdminControls(props) {
    // Unit states
    const [unit, setUnit] = useState('');
    const [units, setUnits] = useState([]);

    // Recipe type things:
    const [recipeTypes, setRecipeTypes] = useState([]);
    const [editingRecipeType, setEditingRecipeType] = useState(null);

    useEffect(() => {
        getUnits(setUnits);
        getRecipeTypes(setRecipeTypes);
    }, []);

    const handleAddUnit = () => {
        addUnit(unit);
        setUnit('');
    }

    const getFormControl = (recipeType, name) => {
        if (editingRecipeType === null || editingRecipeType.id !== recipeType.id) {
            return <span>{recipeType[name]}</span>;
        }

        return (
            <Form.Control type="text"
                          placeholder={name}
                          onChange={event => {
                              setEditingRecipeType((prevState) => {
                                  return {
                                      ...prevState,
                                      [name]: event.target.value
                                  }
                              });
                          }}
                          value={editingRecipeType[name]} />
        );
    }

    return (
        <Container>
            <h2>Admin Controls</h2>
            <h3>Units</h3>
            <ul>
                {units.map(unit => <li key={unit.id}>{unit.name}</li>)}
            </ul>
            <Row>
                <Col md={10}>
                    <FloatingLabel label={'Add Unit'}>
                        <Form.Control type="text"
                                      placeholder="Add Unit"
                                      onChange={event => setUnit(event.target.value)}
                                      value={unit}/>
                    </FloatingLabel>
                </Col>
                <Col md={2}>
                    <Button variant="success" className="h-100" onClick={() => handleAddUnit()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
            <h3 className="mt-2">Recipe Types</h3>
            <Row>
                <Col>
                    <Table>
                        <thead>
                        <tr>
                            <td>Name</td>
                            <td>Key</td>
                            <td>Order</td>
                            <td>Color</td>
                            <td></td>
                        </tr>
                        </thead>
                        <tbody>
                        {recipeTypes.map(recipeType => {
                            return (
                                <tr key={recipeType.id} style={{backgroundColor: recipeType.color}}>
                                    <td>{getFormControl(recipeType, "name")}</td>
                                    <td>{getFormControl(recipeType, "key")}</td>
                                    <td>{getFormControl(recipeType, "order")}</td>
                                    <td>{getFormControl(recipeType, "color")}</td>
                                    <td className="d-flex justify-content-end">
                                        {editingRecipeType !== null && editingRecipeType.id === recipeType.id ?
                                            <>
                                                <div className={`icon-container me-2`}
                                                     onClick={() => {
                                                         updateRecipeType(recipeType.id, editingRecipeType.name, editingRecipeType.key, editingRecipeType.order, editingRecipeType.color);
                                                         setEditingRecipeType(null);
                                                     }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px"
                                                         viewBox="0 -960 960 960" width="16px" fill="currentColor">
                                                        <path
                                                            d="m381-240 424-424-57-56-368 367-169-170-57 57 227 226Zm0 113L42-466l169-170 170 170 366-367 172 168-538 538Z"/>
                                                    </svg>
                                                </div>
                                                <div className={`icon-container me-2`}
                                                     onClick={() => setEditingRecipeType(null)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" height="16px"
                                                         viewBox="0 -960 960 960" width="16px" fill="currentColor">
                                                        <path
                                                            d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/>
                                                    </svg>
                                                </div>
                                            </> :
                                            <>
                                                <div className={`icon-container me-2`}
                                                     onClick={() => {
                                                         if (editingRecipeType !== null && editingRecipeType.id === recipeType.id) {
                                                             setEditingRecipeType(null);
                                                         } else {
                                                             setEditingRecipeType(recipeType)
                                                         }
                                                     }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor"
                                                         className="bi bi-pencil" viewBox="0 0 16 16">
                                                        <path
                                                            d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                                    </svg>
                                                </div>
                                                <div className={`icon-container me-2`}
                                                     onClick={() => deleteRecipeType(recipeType.id)}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                                         fill="currentColor"
                                                         className="bi bi-trash3" viewBox="0 0 16 16">
                                                        <path
                                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                                    </svg>
                                                </div>
                                            </>
                                        }
                                    </td>
                                </tr>
                            );
                        })}
                        </tbody>
                    </Table>
                    <Button variant="success" className="w-100" onClick={() => {
                        addRecipeType("New Recipe Type", "", recipeTypes.length, "#FFFFFF")
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-plus-lg" viewBox="0 0 16 16">
                            <path fillRule="evenodd"
                                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Button>
                </Col>
            </Row>
        </Container>
    );
}