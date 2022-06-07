import React from "react";
import {Button, Modal} from "react-bootstrap";
import AddRecipe from "./AddRecipe";

class AddRecipePopover extends React.Component {
    render() {
        return(
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title>
                        Edit Recipe
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddRecipe recipe={this.props.recipe} edit={true}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default AddRecipePopover;