import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import database from "../../firebase";
import { ref, push, set } from "firebase/database";
import {useNavigate} from "react-router-dom";

const units = ["#", "cups", "grams", "ounces", "fl ounces", "tsp", "tbsp"];

class AddRecipeClass extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            servings: 0,
            type: "main",
            source: "",
            ingredients: [{name: "", quantity: "", unit: "#"}],
            steps: [""],
            validated: false
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.setState({
            [name]: value
        });
    }

    handleInputChangeIngredient = (event, id) => {
        const target = event.target;
        const value = target.value;
        const type = target.name;

        this.setState((prevState) => {
            const ingredients = JSON.parse(JSON.stringify(prevState.ingredients));
            const ingredient = ingredients[id];
            ingredient[type] = value;
            return {
                ingredients: ingredients
            };
        });
    }

    handleInputChangeStep = (event, index) => {
        const target = event.target;
        const value = target.value;

        this.setState((prevState) => {
            const steps = JSON.parse(JSON.stringify(prevState.steps));
            steps[index] = value;
            return {
                steps: steps
            };
        });
    }

    handleAddRecipe = (event) => {
        const form = event.currentTarget;

        this.setState({
            validated: true
        });
        // don't do submit things let me do it
        event.preventDefault();
        event.stopPropagation();

        if (form.checkValidity()) {
            const recipesRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes");

            const newRecipeRef = push(recipesRef);

            const obj = {
                name: this.state.name,
                servings: this.state.servings,
                type: this.state.type,
                source: this.state.source,
                ingredients: this.state.ingredients,
                steps: this.state.steps
            }

            set(newRecipeRef, obj).then(() => {
                console.log("Recipe Written To Database");
                this.props.navigate("/recipes");
            });
        }
    }

    render = () => {
        return (
            <Form noValidate validated={this.state.validated} onSubmit={this.handleAddRecipe}>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Recipe Name"
                                  name="name"
                                  onChange={this.handleInputChange}
                                  value={this.state.name} required/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Source</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Recipe Source"
                                  name="source"
                                  onChange={this.handleInputChange}
                                  value={this.state.source}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select name="type" onChange={this.handleInputChange} value={this.state.type} required>
                        <option value="main">Main Course</option>
                        <option value="side">Side Item</option>
                        <option value="dessert">Dessert</option>
                        <option value="drink">Drink</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Servings</Form.Label>
                    <Form.Control type="number"
                                  placeholder="Recipe Servings"
                                  name="servings"
                                  onChange={this.handleInputChange}
                                  value={this.state.servings} required/>
                </Form.Group>

                <Form.Label>Ingredients</Form.Label>

                {
                    this.state.ingredients.map((ingredientObj, index) =>
                        <Form.Group key={index}>
                            <Row className="g-1 mt-1">
                                <Col xs={7}>
                                    <Form.Control type="text"
                                                  placeholder={`Ingredient ${index + 1}`}
                                                  name="name"
                                                  onChange={(event) => this.handleInputChangeIngredient(event, index)}
                                                  value={this.state.ingredients[index].name} required/>
                                </Col>
                                <Col xs={2}>
                                    <Form.Control type="number"
                                                  placeholder={'Qty'}
                                                  name="quantity"
                                                  onChange={(event) => this.handleInputChangeIngredient(event, index)}
                                                  value={this.state.ingredients[index].quantity} required/>
                                </Col>
                                <Col xs={2}>
                                    <Form.Select name="unit" onChange={(event) => this.handleInputChangeIngredient(event, index)} required>
                                        {
                                            units.map((unit) =>
                                                <option key={`${index}-${unit}`} value={unit}>{unit}</option>
                                            )
                                        }
                                    </Form.Select>
                                </Col>
                                <Col xs={1}>
                                    <Button variant="secondary" className="w-100" onClick={() => {
                                        this.setState((prevState) => {
                                            const ingredients = JSON.parse(JSON.stringify(prevState.ingredients));
                                            ingredients.splice(index, 1);
                                            return {
                                                ingredients: ingredients
                                            };
                                        });
                                    }}>
                                        X
                                    </Button>
                                </Col>
                            </Row>
                        </Form.Group>
                    )
                }
                <Row className="g-1 mt-1">
                    <Button variant="secondary" className="mb-2" onClick={() => {
                        this.setState((prevState) => {
                            const ingredients = JSON.parse(JSON.stringify(prevState.ingredients));
                            ingredients.push({name: "", quantity: "", unit: "#"});
                            return {
                                ingredients: ingredients
                            };
                        });
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Button>
                </Row>

                <Form.Label>Steps</Form.Label>

                {
                    this.state.steps.map((step, index) =>
                        <Row key={index} className="g-1 mt-1">
                            <Col xs={11}>
                                <Form.Group>
                                    <Row className="g-1">
                                        <Form.Control type="text"
                                                      placeholder={`Step ${index + 1}`}
                                                      onChange={(event) => this.handleInputChangeStep(event, index)}
                                                      value={this.state.steps[index]} required/>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col xs={1}>
                                <Button variant="secondary" className="w-100" onClick={() => {
                                    this.setState((prevState) => {
                                        const steps = JSON.parse(JSON.stringify(prevState.steps));
                                        steps.splice(index, 1);
                                        return {
                                            steps: steps
                                        };
                                    });
                                }}>
                                    X
                                </Button>
                            </Col>
                        </Row>
                    )
                }
                <Row className="g-1 mt-1">
                    <Button variant="secondary" className="mb-2" onClick={() => {
                        this.setState((prevState) => {
                            const steps = JSON.parse(JSON.stringify(prevState.steps));
                            steps.push("");
                            return {
                                steps: steps
                            };
                        });
                    }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                             className="bi bi-plus-circle" viewBox="0 0 16 16">
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                        </svg>
                    </Button>
                </Row>

                <Button variant="primary" type="submit">
                    Add Recipe
                </Button>
            </Form>
        );
    }
}

const AddRecipe = props => {
    const nav = useNavigate();

    return <AddRecipeClass navigate={nav} {...props} />
}

export default AddRecipe;