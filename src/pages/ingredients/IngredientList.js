import React from "react";
import {Col, Row, Form, Table} from "react-bootstrap";
import {datepickerStringToDateObject, getDateStringsBetween} from "../../util/DateUtils";
import {ref, onValue} from "firebase/database";
import database from "../../firebase";

class IngredientList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            startDate: "",
            endDate: "",
            ingredientList: []
        };
    }

    handleDateChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        this.setState({
            [name]: value,
            ingredientList: []
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
                    const recipesRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes");
                    onValue(recipesRef, snapshot => {
                        if (snapshot.exists()) {
                            const recipeObjects = snapshot.val();
                            const ingredientList = Object.entries(recipes).map(([key, value]) => {
                                // key: recipe id
                                // value: scale
                                const ingredients = recipeObjects[key].ingredients;
                                if (ingredients) {
                                    for (const i in ingredients) {
                                        ingredients[i].quantity = ingredients[i].quantity * value;
                                    }
                                    return ingredients;
                                } else {
                                    return [];
                                }

                            }).flat();
                            console.log(ingredientList);
                            this.setState({
                                ingredientList: ingredientList
                            });
                        }
                    });
                }
            }, {onlyOnce: true});

            // console.log(dates);
        }

    }

    validDates = () => {
        if (this.state.startDate === "" || this.state.endDate === "") return false;

        const startDate = datepickerStringToDateObject(this.state.startDate);
        const endDate = datepickerStringToDateObject(this.state.endDate);

        return startDate <= endDate;
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
                <Row className="mt-2">
                    <Col>
                        <Table striped bordered hover className={this.state.ingredientList.length > 0 ? "" : "d-none"}>
                            <thead>
                            <tr>
                                <th>Ingredient</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                            </tr>

                            </thead>
                            <tbody>
                            {
                                this.state.ingredientList.map((ingredient, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{ingredient.name}</td>
                                            <td>{ingredient.quantity}</td>
                                            <td>{ingredient.unit}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </Table>
                    </Col>

                </Row>
            </>
        );
    }
}

export default IngredientList;