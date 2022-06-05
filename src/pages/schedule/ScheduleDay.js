import React from "react";
import "./Schedule.css";
import {Button, Col, Row} from "react-bootstrap";

class ScheduleDay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="day-container">
                <div className="p-3">
                    <p>{this.props.day}</p>
                    <p>{this.props.month} {this.props.date}</p>
                    <Row>
                        <Col>
                            <Row className="day-recipe mb-2">
                                <Col sm={8}>Test Recipe Name</Col>
                                <Col sm={4}>Servings: 10</Col>
                            </Row>
                            <Row className="day-recipe mb-2">
                                <Col sm={8}>Test Recipe Name</Col>
                                <Col sm={4}>Servings: 10</Col>
                            </Row>
                            <Row className="day-recipe mb-2">
                                <Col sm={8}>Test Recipe Name</Col>
                                <Col sm={4}>Servings: 10</Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
                <Button variant="success" className="add-recipe-button" onClick={() => this.setState({modalShow: true})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </Button>
            </div>
        );
    }
}

export default ScheduleDay;