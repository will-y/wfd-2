import React from "react";
import {Col, Row} from "react-bootstrap";

class RecipeListEntry extends React.Component {
    render() {
        const recipe = this.props.recipe;
        return (
            <div key={recipe.key} className={`recipe-list-instance mb-1 p-2 ${recipe.type}`}>
                <Row>
                    <Col xs={6}>
                        <p className="mb-0">{recipe.name}</p>
                    </Col>
                    <Col xs={6}>
                        <p className="text-end mb-0">{recipe.servings} Servings</p>
                    </Col>
                </Row>
                {this.props.activeRecipes.includes(recipe.key) ?
                    <div>
                        {recipe.source ?
                            <p>Source: {(recipe.source.includes("https://") || recipe.source.includes("http://")) ? <a href={recipe.source} target="_blank">{recipe.source}</a> : <>{recipe.source}</>}</p> : <></>
                        }

                        <p>Ingredients</p>
                        <ul>
                            {
                                recipe.ingredients.map((ing, index) => {
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
                                recipe.steps.map((step, index) => {
                                    return (
                                        <li key={`${recipe.key}-${index}`}>{step}</li>
                                    )
                                })
                            }
                        </ol>
                    </div> : <div></div>
                }
                {!this.props.hideArrow ?
                    <Row onClick={() => this.props.handleRecipeExpandClicked(recipe.key)}>
                        {this.props.activeRecipes.includes(recipe.key) ?
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
    }
}

export default RecipeListEntry;