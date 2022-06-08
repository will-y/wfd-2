import React from "react";
import {Col, Row, Form} from "react-bootstrap";
import {datepickerStringToDateObject, getDateStringsBetween} from "../../util/DateUtils";
import {ref, onValue} from "firebase/database";
import database from "../../firebase";

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

            const scheduleRef = ref(database, process.env.REACT_APP_DATABASE + "/schedule/");

            onValue(scheduleRef, snapshot => {
                if (snapshot.exists()) {
                    const data = snapshot.val();

                    const filteredData = Object.fromEntries(Object.entries(data).filter(([key, _]) => {
                        return dates.includes(key);
                    }));

                    let recipes = {};
                    for (const key in filteredData) {
                        const dataEntry = filteredData[key];

                        const vals = Object.values(dataEntry);
                        for (const i in vals) {
                            const val = vals[i];
                            const recipe = val.id;
                            const amount = val.scaleFactor;

                            if (Object.keys(recipes).includes(recipe)) {
                                recipes[recipe] += amount;
                            } else {
                                recipes = {
                                    ...recipes,
                                    [recipe]: amount
                                }
                            }
                        }
                    }

                    console.log(recipes);
                    // map of recipeID to scale
                    // TODO: get ingredients for all of these recipes, then scale by scale
                }
            }, {onlyOnce: true});

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
                    <p>Ingredients needed for {this.state.startDate} to {this.state.endDate}:</p>
                </Row>
                <Row>

                </Row>
            </>
        );
    }
}

export default IngredientList;