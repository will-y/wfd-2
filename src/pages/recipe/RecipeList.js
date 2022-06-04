import React from "react";
import database from "../../firebase";
import {onValue, ref} from "firebase/database";
import "./Recipe.css"
import {Col, Row} from "react-bootstrap";

class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: {},
            activeRecipes: []
        }
    }

    componentDidMount() {
        const recipeRef = ref(database, "test/recipes");

        onValue(recipeRef, (snapshot) => {
            if (snapshot.exists()) {
                this.setState({
                    recipes: snapshot.val()
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

    render() {
        return (
            <div className="m-2">
                {Object.keys(this.state.recipes).map((id) => {
                    const data = this.state.recipes[id];
                    return (
                        <div key={id} className={`recipe-list-instance mb-1 p-2 ${data.type}`}>
                            <Row>
                                <Col xs={6}>
                                    <p>{data.name}</p>
                                </Col>
                                <Col xs={6}>
                                    <p className="text-end">{data.servings} Servings</p>
                                </Col>
                            </Row>
                            {this.state.activeRecipes.includes(id) ?
                                <div>
                                    <p>Ingredients</p>
                                    <ul>
                                        {
                                            data.ingredients.map((ing, index) => {
                                                return (
                                                    <li key={`${id}-${index}`}>{`${ing.name} (${ing.quantity} ${ing.unit})`}</li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div> : <div></div>
                            }
                            <Row onClick={() => this.handleRecipeExpandClicked(id)}>
                                {this.state.activeRecipes.includes(id) ?
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-chevron-up" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
                                    </svg> :
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-chevron-down" viewBox="0 0 16 16">
                                        <path fillRule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
                                    </svg>
                                }
                            </Row>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RecipeList;