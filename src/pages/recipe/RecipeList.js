import React from "react";
import database from "../../firebase";
import {onValue, push, ref, set} from "firebase/database";
import "./Recipe.css"
import "../schedule/Schedule.css";
import {Col, FormControl, Row, Form} from "react-bootstrap";
import RecipeListEntry from "./RecipeListEntry";
import {Link} from "react-router-dom";
import {sortRecipes} from "../../util/RecipeUtils";

/**
 * Inputs:
 * - `location` (string): String to determine certain behavior or the recipe. ("list" or "schedule")
 *      - list: delete will delete from database
 *      - schedule: delete will just remove from that day on the schedule
 * - `edit` (boolean): If the delete button shows up for recipes in this list
 * - `editRecipe` (boolean): If the edit recipe button show up for recipes in this list
 * - `hideArrow` (boolean): If the recipes should show their expand arrow
 * - `date` (Date): Date of the recipe
 * - `onHide` (function): Function that is called when this closes when in schedule add recipe view
 */
class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            filteredRecipes: []
        }
    }

    componentDidMount() {
        const recipeRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes");

        onValue(recipeRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                let dataList = [];

                for (const key in data) {
                    dataList.push({
                        ...data[key],
                        key: key
                    });
                }

                dataList = sortRecipes(dataList);

                this.setState({
                    recipes: dataList,
                    filteredRecipes: JSON.parse(JSON.stringify(dataList)),
                    nameFilter: "",
                    typeFilter: ""
                });
            }
        });
    }

    handleFilterChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        }, () => {
            if (this.state.typeFilter === "" && this.state.nameFilter === "") {
                this.setState(prevState => {
                    return {
                        filteredRecipes: JSON.parse(JSON.stringify(prevState.recipes))
                    };
                });
            } else {
                this.setState(prevState => {
                    return {
                        filteredRecipes: prevState.recipes.filter(val => {
                            return val.name.toLowerCase().includes(prevState.nameFilter.toLowerCase()) &&
                                val.type.includes(prevState.typeFilter)
                        })
                    }
                });
            }
        });
    }

    handleAddRecipeToDay = (recipeId) => {
        // If it comes from a day, clicking can add
        if (this.props.date) {
            const date = this.props.date;
            const scheduleDayRef = ref(database, process.env.REACT_APP_DATABASE + "/schedule/" + date);

            const newEntryRef = push(scheduleDayRef);

            const obj = {
                id: recipeId,
                scaleFactor: 1
            };

            onValue(scheduleDayRef, snapshot => {
                if (snapshot.exists()) {
                    const value = snapshot.val();
                    if (!Object.values(value).find(value => {
                        return value.id === obj.id;
                    })) {
                        set(newEntryRef, obj).then(() => console.log("Schedule Written To Database"));
                    } else {
                        alert("This recipe is already in this day.")
                    }
                } else {
                    set(newEntryRef, obj).then(() => console.log("Schedule Written To Database"));
                }
            }, {onlyOnce: true});

            this.props.onHide();
        }
    }

    render() {
        return (
            <div className="m-2">
                <Row>
                    <Col lg={6}>
                        <FormControl placeholder="Search" className="mb-1" onChange={this.handleFilterChange} name="nameFilter"/>
                    </Col>
                    <Col lg={3}>
                        <Form.Select onChange={this.handleFilterChange} name="typeFilter">
                            <option value="">All Recipe Types</option>
                            <option className="main-option" value="main">Main</option>
                            <option className="drink-option" value="drink">Drink</option>
                            <option className="side-option" value="side">Side</option>
                            <option className="dessert-option" value="dessert">Dessert</option>
                        </Form.Select>
                    </Col>
                    <Col lg={3}>
                        {/*TODO: https://react-bootstrap.github.io/components/dropdowns/#custom-dropdown-components*/}
                    </Col>
                </Row>
                {this.state.filteredRecipes.map((recipe) => {
                    return (
                        <RecipeListEntry recipe={recipe}
                                         hideArrow={this.props.hideArrow}
                                         key={recipe.key}
                                         onClick={() => this.handleAddRecipeToDay(recipe.key)}
                                         location={this.props.location}
                                         edit={this.props.edit}
                                         editRecipe={this.props.editRecipe}/>
                    );
                })}
                {this.state.filteredRecipes.length === 0 ?
                    <div>No recipes for the selected filters</div> : <></>
                }
                {!this.props.hideAddButton ?
                    <Link to="/add"
                          role="button"
                          className="add-recipe-button btn btn-success global-add-recipe-button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                             className="bi bi-plus-lg link-svg" viewBox="0 0 16 16">
                            <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                        </svg>
                    </Link> : <></>
                }
            </div>
        );
    }
}

export default RecipeList;
