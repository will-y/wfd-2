import React from "react";
import database from "../../firebase";
import {onValue, ref} from "firebase/database";
import "./Recipe.css"
import {Col, FormControl, Row} from "react-bootstrap";
import RecipeListEntry from "./RecipeListEntry";

const categoryOrder = {
    "main": 0,
    "drink": 1,
    "side": 2,
    "dessert": 3
}

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
        const recipeRef = ref(database, "test/recipes");

        onValue(recipeRef, (snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const dataList = [];

                for (const key in data) {
                    dataList.push({
                        ...data[key],
                        key: key
                    })
                }

                dataList.sort((a, b) => {
                    if (categoryOrder[a.type] < categoryOrder[b.type]) {
                        return -1;
                    } else if (categoryOrder[a.type] === categoryOrder[b.type]) {
                        return a.name.localeCompare(b.name);
                    } else {
                        return 1;
                    }
                });

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

    render() {
        return (
            <div className="m-2">
                <FormControl placeholder="Search" className="mb-1" onChange={this.handleSearchChanged}/>
                {this.state.filteredRecipes.map((recipe) => {
                    return (
                        <RecipeListEntry recipe={recipe}
                                         activeRecipes={this.state.activeRecipes}
                                         handleRecipeExpandClicked={this.handleRecipeExpandClicked}
                                         hideArrows={this.props.hideArrow}
                                         key={recipe.key}/>
                    );
                })}
            </div>
        );
    }
}

export default RecipeList;