import {Button, Col, Form, Row} from "react-bootstrap";
import React from "react";

const units = ["#", "cups", "grams", "ounces", "fl ounces", "tsp", "tbsp"];

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            servings: 0,
            type: "main",
            source: "",
            ingredients: [{name: "", quantity: "", unit: "#"}]
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
                        <option value="desert">Desert</option>
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
                                    <Form.Select onChange={(event) => this.handleInputChangeIngredient(event, index)}>
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

                <Button variant="secondary" onClick={() => {
                    this.setState((prevState) => {
                        const ingredients = JSON.parse(JSON.stringify(prevState.ingredients));
                        ingredients.push({name: "", quantity: "", unit: "#"});
                        return {
                            ingredients: ingredients
                        };
                    });
                }}>
                    Add Ingredient
                </Button>

                <Button variant="primary" onClick={() => console.log(this.state)}>
                    Add Recipe
                </Button>
            </Form>
        );
    }
}

export default AddRecipe;