import React from "react";
import database from "../../firebase";
import {onValue, push, ref, set} from "firebase/database";
import "./Recipe.css"
import "../schedule/Schedule.css";
import {FormControl} from "react-bootstrap";
import RecipeListEntry from "./RecipeListEntry";
import {Link} from "react-router-dom";
import {sortRecipes} from "../../util/RecipeUtils";

class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            filteredRecipes: [],
            activeRecipes: []
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
                    })
                }

                dataList = sortRecipes(dataList);

                this.setState({
                    recipes: dataList,
                    filteredRecipes: JSON.parse(JSON.stringify(dataList))
                });
            }
        });
    }

    handleRecipeExpandClicked = (id) => {
        this.setState(prevState => {
            const prevActive = JSON.parse(JSON.stringify(prevState.activeRecipes));
            if (prevActive.includes(id)) {
                const index = prevActive.indexOf(id);
                if (index !== -1) {
                    prevActive.splice(index, 1);
                }
            } else {
                prevActive.push(id);
            }

            return {
                activeRecipes: prevActive
            }
        });
    }

    handleSearchChanged = (event) => {
        const value = event.target.value;

        if (value === "") {
            this.setState(prevState => {
                return {
                    filteredRecipes: JSON.parse(JSON.stringify(prevState.recipes))
                };
            });
        } else {
            const filtered = this.state.recipes.filter(val => {
                return val.name.toLowerCase().includes(value.toLowerCase());
            });
            this.setState(prevState => {
                return {
                    filteredRecipes: filtered
                };
            });
        }
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
                <FormControl placeholder="Search" className="mb-1" onChange={this.handleSearchChanged}/>
                {this.state.filteredRecipes.map((recipe) => {
                    return (
                        <RecipeListEntry recipe={recipe}
                                         activeRecipes={this.state.activeRecipes}
                                         handleRecipeExpandClicked={this.handleRecipeExpandClicked}
                                         hideArrow={this.props.hideArrow}
                                         key={recipe.key}
                                         onClick={() => this.handleAddRecipeToDay(recipe.key)}
                                         location={this.props.location}
                                         edit={this.props.edit}/>
                    );
                })}
                <Link to="/add-recipe" role="button"
                        className="add-recipe-button btn btn-success">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-plus-lg link-svg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </Link>
            </div>
        );
    }
}

export default RecipeList;