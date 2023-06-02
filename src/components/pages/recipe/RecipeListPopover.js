import React from "react";
import {Button, Modal} from "react-bootstrap";
import "./Recipe.css";
import RecipeList from "./RecipeList";

class RecipeListPopover extends React.Component {

    render() {
        return (
            <Modal
                {...this.props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered dialogClassName="modal-90w">
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Add Recipe to {this.props.date.replace(/-/g, ' ')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <RecipeList hideArrow={true}
                                date={this.props.date}
                                onHide={this.props.onHide}
                                location={this.props.location}
                                hideAddButton={true}
                                collection={this.props.collection}/>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={this.props.onHide}>Cancel</Button>
                </Modal.Footer>
            </Modal>
        );
    }
}

export default  RecipeListPopover;
