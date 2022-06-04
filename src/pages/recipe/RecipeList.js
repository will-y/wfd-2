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
                            <p>{data.servings}</p>
                            <ul>
                                {
                                    data.ingredients.map((ing, index) => {
                                        return (
                                            <li key={`${id}-${index}`}>{`${ing.name} (${ing.quantity} ${ing.unit})`}</li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                    );
                })}
            </div>
        );
    }
}

export default RecipeList;