import React from "react";
import database from "../../firebase";
import {onValue, ref} from "firebase/database";
import "./Recipe.css"

class RecipeList extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: {}
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
                        <div key={id} className="recipe-list-instance mb-1 p-2">
                            <p>{data.name}</p>
                            <p>{data.source}</p>
                            <p>{data.servings}</p>
                            <p>{data.type}</p>
                            <ul>
                                {
                                    data.ingredients.map((ing, index) => {
                                        console.log(ing)
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