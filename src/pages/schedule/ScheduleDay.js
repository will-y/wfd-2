import React from "react";
import "./Schedule.css";
import {Col, Row} from "react-bootstrap";

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

            </div>
        );
    }
}

export default ScheduleDay;