import {Button, Form} from "react-bootstrap";

function AddRecipe() {
    return (
        <Form>
            <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Recipe Name"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Source</Form.Label>
                <Form.Control type="text" placeholder="Recipe Source"/>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Select>
                    <option value="main">Main Course</option>
                    <option value="side">Side Item</option>
                    <option value="desert">Desert</option>
                    <option value="drink">Drink</option>
                </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3">
                <Form.Label>Servings</Form.Label>
                <Form.Control type="number" placeholder="Recipe Servings"/>
            </Form.Group>

            <Button variant="primary">
                Add Recipe
            </Button>
        </Form>
    );
}

export default AddRecipe;