import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";
import database from "../../firebase";
import { ref, push, set } from "firebase/database";

const units = ["#", "cups", "grams", "ounces", "fl ounces", "tsp", "tbsp"];

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            servings: 0,
            type: "main",
            source: "",
            ingredients: [{name: "", quantity: "", unit: "#"}],
            steps: [""]
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

    handleAddRecipe = () => {
        const recipesRef = ref(database, "test/recipes");

        const newRecipeRef = push(recipesRef);

        const obj = {
            name: this.state.name,
            servings: this.state.servings,
            type: this.state.type,
            source: this.state.source,
            ingredients: this.state.ingredients,
            steps: this.state.steps
        }

        set(newRecipeRef, obj).then(() => console.log("Recipe Written To Database"));
    }

    render = () => {
        return (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text"
                                  placeholder="Recipe Name"
                                  name="name"
                                  onChange={this.handleInputChange}
                                  value={this.state.name}/>
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
                    <Form.Select name="type" onChange={this.handleInputChange} value={this.state.type}>
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
                                  value={this.state.servings}/>
                </Form.Group>

                <Form.Label>Ingredients</Form.Label>

                {
                    this.state.ingredients.map((ingredientObj, index) =>
                        <Form.Group key={index}>
                            <Row className="g-1">
                                <Col xs={8}>
                                    <Form.Control type="text"
                                                  placeholder={`Ingredient ${index + 1}`}
                                                  name="name"
                                                  onChange={(event) => this.handleInputChangeIngredient(event, index)}
                                                  value={this.state.ingredients[index].name}/>
                                </Col>
                                <Col xs={2}>
                                    <Form.Control type="number"
                                                  placeholder={'Qty'}
                                                  name="quantity"
                                                  onChange={(event) => this.handleInputChangeIngredient(event, index)}
                                                  value={this.state.ingredients[index].quantity}/>
                                </Col>
                                <Col xs={2}>
                                    <Form.Select name="unit" onChange={(event) => this.handleInputChangeIngredient(event, index)}>
                                        {
                                            units.map((unit) =>
                                                <option key={`${index}-${unit}`} value={unit}>{unit}</option>
                                            )
                                        }
                                    </Form.Select>
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
                        <Form.Group key={index}>
                            <Row className="g-1">
                                <Form.Control type="text"
                                              placeholder={`Step ${index + 1}`}
                                              onChange={(event) => this.handleInputChangeStep(event, index)}
                                              value={this.state.steps[index]}/>
                            </Row>
                        </Form.Group>
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

                <Button variant="primary" onClick={() => this.handleAddRecipe()}>
                    Add Recipe
                </Button>
            </Form>
        );
    }
}

export default AddRecipe;