import React from "react";
import database from "../../firebase";
import {onValue, ref} from "firebase/database";
import "./Recipe.css"
import {Col, FormControl, Row} from "react-bootstrap";

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
                    const data = recipe;
                    return (
                        <div key={recipe.key} className={`recipe-list-instance mb-1 p-2 ${data.type}`}>
                            <Row>
                                <Col xs={6}>
                                    <p className="mb-0">{data.name}</p>
                                </Col>
                                <Col xs={6}>
                                    <p className="text-end mb-0">{data.servings} Servings</p>
                                </Col>
                            </Row>
                            {this.state.activeRecipes.includes(recipe.key) ?
                                <div>
                                    {data.source ?
                                        <p>Source: {(data.source.includes("https://") || data.source.includes("http://")) ? <a href={data.source} target="_blank">{data.source}</a> : <>{data.source}</>}</p> : <></>
                                    }

                                    <p>Ingredients</p>
                                    <ul>
                                        {
                                            data.ingredients.map((ing, index) => {
                                                const unit = ing.unit === "#" ? "" : " " + ing.unit;
                                                return (
                                                    <li key={`${recipe.key}-${index}`}>{`${ing.name} (${ing.quantity}${unit})`}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <p>Steps</p>
                                    <ol>
                                        {
                                            data.steps.map((step, index) => {
                                                return (
                                                    <li key={`${recipe.key}-${index}`}>{step}</li>
                                                )
                                            })
                                        }
                                    </ol>
                                </div> : <div></div>
                            }
                            {!this.props.hideArrow ?
                                <Row onClick={() => this.handleRecipeExpandClicked(recipe.key)}>
                                    {this.state.activeRecipes.includes(recipe.key) ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-chevron-up" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                        </svg> :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                             className="bi bi-chevron-down" viewBox="0 0 16 16">
                                            <path fillRule="evenodd"
                                                  d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                        </svg>
                                    }
                                </Row> : <></>
                            }
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RecipeList;