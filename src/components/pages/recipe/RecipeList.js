import React from "react";
import {database} from "../../../firebase";
import {onValue, push, ref, set} from "firebase/database";
import "./Recipe.css"
import "../schedule/Schedule.css";
import {Col, FormControl, Row, Form} from "react-bootstrap";
import RecipeListEntry from "./RecipeListEntry";
import {Link} from "react-router-dom";
import {getRecipeColor, sortRecipes} from "../../../util/RecipeUtils";
import KeywordInput from "./keyword/KeywordInput";
import withOutletContextWrapper from "../../wrappers/withOutletContextWrapper";
import {getRecipeTypes} from "../../../service/AdminServices";

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
            filteredRecipes: [],
            keywords: [],
            recipeTypes: []
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

                // TODO: This is bad, maybe make recipe types and units global with contexts?
                getRecipeTypes((newRecipeTypes) => {
                    const sortedRecipes = sortRecipes(dataList, newRecipeTypes);

                    this.setState({
                        recipes: sortedRecipes,
                        filteredRecipes: JSON.parse(JSON.stringify(sortedRecipes)),
                        nameFilter: "",
                        typeFilter: "",
                        recipeTypes: newRecipeTypes
                    });
                });
            }
        });
    }

    handleFilterChange = (event) => {
        const target = event.target;
        const name = target.name;
        this.setState({
            [name]: target.value
        }, this.applyFilters);
    }

    updateKeywords = (keywords) => {
        this.setState({keywords: keywords}, this.applyFilters)
    }

    applyFilters = () => {
        if (this.state.typeFilter === "" && this.state.nameFilter === "" && this.state.keywords.length === 0) {
            this.setState(prevState => {
                return {
                    filteredRecipes: JSON.parse(JSON.stringify(prevState.recipes))
                };
            });
        } else {
            this.setState(prevState => {
                return {
                    filteredRecipes: prevState.recipes.filter(recipe => {
                        return recipe.name.toLowerCase().includes(prevState.nameFilter.toLowerCase()) &&
                            recipe.type.includes(prevState.typeFilter) &&
                            this.keywordsFilter(recipe, prevState.keywords);
                    })
                }
            });
        }
    }

    keywordsFilter = (recipe, keywords) => {
        if (keywords.length === 0) {
           return true;
        }

        if (!recipe.keywords) {
            return false;
        }

        if (this.state.keywords === []) {
            return true;
        } else {
            for (const keyword of this.state.keywords) {
                if (!recipe.keywords.includes(keyword)) {
                    return false;
                }
            }
        }

        return true;
    }

    handleAddRecipeToDay = (recipeId) => {
        // If it comes from a day, clicking can add
        if (this.props.date) {
            const date = this.props.date;
            const scheduleDayRef = ref(database, `${process.env.REACT_APP_DATABASE}/collections/${this.props.collection}/schedule/${date}`);

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
                <Row className="mb-2">
                    <Col lg={6} className="d-flex flex-column justify-content-end">
                        <FormControl placeholder="Search" className="mt-1" onChange={this.handleFilterChange} name="nameFilter"/>
                    </Col>
                    <Col lg={3} className="d-flex flex-column justify-content-end">
                        <Form.Select onChange={this.handleFilterChange} name="typeFilter" className="mt-1">
                            <option value="">All Recipe Types</option>
                            {this.state.recipeTypes.map(recipeType =>
                                <option key={recipeType.key} value={recipeType.key} style={{backgroundColor: recipeType.color}}>
                                    {recipeType.name}
                                </option>)}
                        </Form.Select>
                    </Col>
                    <Col lg={3}>
                        <KeywordInput removePadding={true} placeholder="Keyword Filter" updateKeywords={this.updateKeywords}></KeywordInput>
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
                                         editRecipe={this.props.editRecipe}
                                         collection={this.props.collection}
                                         color={getRecipeColor(this.state.recipeTypes, recipe.type)}/>
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

export default withOutletContextWrapper(RecipeList);
