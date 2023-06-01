import React from "react";
import {Modal} from "react-bootstrap";
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
                    <AddRecipe recipe={this.props.recipe} edit={true} hideModal={this.props.onHide}/>
                </Modal.Body>
            </Modal>
        );
    }
}

export default AddRecipePopover;
