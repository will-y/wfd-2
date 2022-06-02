import {Button, Form} from "react-bootstrap";
import React from "react";

class AddRecipe extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            servings: 0,
            type: "main",
            source: "",
            ingredients: []
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

    render = () => {
        return (
            <Form>
                <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Name" name="name" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Source</Form.Label>
                    <Form.Control type="text" placeholder="Recipe Source" name="source" onChange={this.handleInputChange}/>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Select name="type" onChange={this.handleInputChange}>
                        <option value="main">Main Course</option>
                        <option value="side">Side Item</option>
                        <option value="desert">Desert</option>
                        <option value="drink">Drink</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Servings</Form.Label>
                    <Form.Control type="number" placeholder="Recipe Servings" name="servings" onChange={this.handleInputChange}/>
                </Form.Group>

                <Button variant="primary">
                    Add Recipe
                </Button>
            </Form>
        );
    }
}

export default AddRecipe;