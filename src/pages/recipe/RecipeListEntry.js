import React from "react";
import {Col, Collapse, Row} from "react-bootstrap";
import {get, ref, remove} from "firebase/database";
import database from "../../firebase";
import AddRecipePopover from "./AddRecipePopover";

/**
 * Inputs:
 * - `recipe` (Recipe): Recipe data
 * - `activeRecipes` (RecipeKey[]): List of active recipes to see if this recipe needs to be expanded or not
 * - `hideArrow` (boolean): Hide the expand arrow (blocks the recipe from being expanded) // TODO: rename
 * - `key` (RecipeKey): Unique key of the recipe
 * - `onClick` (function): Function that is called when entire recipe hedaer is clicked
 * - `location` (string): String to determine certain behavior or the recipe. ("list" or "schedule")
 *      - list: delete will delete from database
 *      - schedule: delete will just remove from that day on the schedule
 * - `edit` (boolean): If the delete button shows up?
 * - `editRecipe (boolean): If the edit recipe button shows up
 */
class RecipeListEntry extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            expanded: false
        }
    }

    handleDeleteRecipe = () => {
        const recipesRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes");
        // All schedules
        const schedulesRef = ref(database, process.env.REACT_APP_DATABASE + "/schedule");

        if (this.props.location === "list") {
            // This is to remove recipes overall
            get(recipesRef).then((snapshot) => {
                snapshot.forEach(childSnapshot => {
                    if (childSnapshot.key === this.props.recipe.key) {
                        const toRemoveRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes/" + childSnapshot.key);
                        remove(toRemoveRef).then(() => console.log("Recipe Removed"));
                        return true;
                    }
                });
            });

            get(schedulesRef).then(snapshot => {
                snapshot.forEach(daySnapshot => {
                    daySnapshot.forEach(dayRecipeSnapshot => {
                        if (dayRecipeSnapshot.val().id === this.props.recipe.key) {
                            remove(dayRecipeSnapshot.ref).then(() => {});
                            return true;
                        }
                    });
                });
            });
        } else if (this.props.location === "schedule") {
            const scheduleRef = ref(database, process.env.REACT_APP_DATABASE + "/schedule/" + this.props.date);

            get(scheduleRef).then(snapshot => {
                snapshot.forEach(childSnapshot => {
                    const data = childSnapshot.val();
                    if (data.id === this.props.recipe.key) {
                        remove(childSnapshot.ref).then(() => console.log("Recipe Removed From Day"));
                        return true;
                    }
                });
            });
        }
    }

    toggleExpansion = () => {
        this.setState(prevState => {
            return {
                expanded :!prevState.expanded
            }
        });
    }

    render() {
        const recipe = this.props.recipe;

        return (
            <>
                <div className={`recipe-list-instance mb-1 p-2 ${recipe.type}`} onClick={this.props.onClick}>
                    <Row>
                        <Col xs={5}>
                            <p className="mb-0 fw-bold">{recipe.name}</p>
                        </Col>
                        <Col xs>
                            <p className="text-end mb-0 fw-bold">{recipe.servings} Servings</p>
                        </Col>
                        <Col xs={1} className={this.props.editRecipe ? "" : "d-none"}>
                            <div className="icon-container" onClick={() => this.setState({modalShow: true})}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-pencil" viewBox="0 0 16 16">
                                    <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
                                </svg>
                            </div>
                        </Col>
                        <Col xs={2} md={1} lg={2} className={this.props.edit ? "": "d-none"}>
                            <div className="icon-container" onClick={this.handleDeleteRecipe}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-trash3" viewBox="0 0 16 16">
                                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5ZM11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H2.506a.58.58 0 0 0-.01 0H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1h-.995a.59.59 0 0 0-.01 0H11Zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5h9.916Zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47ZM8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5Z"/>
                                </svg>
                            </div>

                        </Col>
                    </Row>
                    <Collapse in={this.state.expanded}>
                        <div>
                            {recipe.source ?
                                <p className="recipe-section">Source: {(recipe.source.includes("https://") || recipe.source.includes("http://")) ? <a href={recipe.source} target="_blank" rel="noreferrer">{recipe.source}</a> : <>{recipe.source}</>}</p> : <></>
                            }
                            {recipe.ingredients ?
                                <div className="recipe-section">
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
                                </div> : <></>
                            }
                            {recipe.steps ?
                                <div className="recipe-section">
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
                                </div> : <></>
                            }
                            {recipe.notes ?
                                <div className="recipe-section">
                                    <p>Notes</p>
                                    <p className="ms-2">{recipe.notes}</p>
                                </div> : <></>
                            }
                        </div>
                    </Collapse>
                    {!this.props.hideArrow ?
                        <Row onClick={this.toggleExpansion}>
                            {this.state.expanded ?
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
                <AddRecipePopover show={this.state.modalShow}
                                  onHide={() => this.setState({modalShow: false})}
                                  recipe={recipe}/>
            </>
        );
    }
}

export default RecipeListEntry;
