import React from "react";
import {Col, Row, Form} from "react-bootstrap";
import {datepickerStringToDateObject, getDateStringsBetween} from "../../util/DateUtils";

class IngredientList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: "",
            endDate: ""
        };
    }

    handleDateChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value
        }, () => this.getIngredients());
    }

    getIngredients = () => {
        if (this.validDates()) {
            const dates = getDateStringsBetween(this.state.startDate, this.state.endDate);

            console.log(dates);
        }

    }

    validDates = () => {
        if (this.state.startDate === "" || this.state.endDate === "") return false;

        const startDate = datepickerStringToDateObject(this.state.startDate);
        const endDate = datepickerStringToDateObject(this.state.endDate);

        return startDate < endDate;
    }


    render() {
        return (
            <>
                <Row>
                    <Col xs={6}>
                        <Form.Control type="date" value={this.state.startDate} onChange={this.handleDateChange} name="startDate"/>
                    </Col>
                    <Col xs={6}>
                        <Form.Control type="date" value={this.state.endDate} onChange={this.handleDateChange} name="endDate"/>
                    </Col>
                </Row>
                <Row>
                    <p>Ingredients needed for {this.state.startDate} to {this.state.endDate}</p>
                </Row>
                <Row>

                </Row>
            </>
        );
    }
}

export default IngredientList;