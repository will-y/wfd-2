import React from "react";
import {Button, Col, Row} from "react-bootstrap";

class RecipeListEntry extends React.Component {
    render() {
        const recipe = this.props.recipe;
        return (
            <div className={`recipe-list-instance mb-1 p-2 ${recipe.type}`} onClick={this.props.onClick}>
                <Row>
                    <Col xs={6}>
                        <p className="mb-0">{recipe.name}</p>
                    </Col>
                    <Col xs>
                        <p className="text-end mb-0">{recipe.servings} Servings</p>
                    </Col>
                    <Col xs={1} className={this.props.edit ? "": "d-none"}>
                        <div className="trashcan-container">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                 className="bi bi-trash3" viewBox="0 0 16 16">
                                <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                            </svg>
                        </div>

                    </Col>
                </Row>
                {this.props.activeRecipes.includes(recipe.key) ?
                    <div>
                        {recipe.source ?
                            <p>Source: {(recipe.source.includes("https://") || recipe.source.includes("http://")) ? <a href={recipe.source} target="_blank" rel="noreferrer">{recipe.source}</a> : <>{recipe.source}</>}</p> : <></>
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