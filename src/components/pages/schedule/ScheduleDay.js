import React from "react";
import "./Schedule.css";
import {Button, Col, FormCheck, Row} from "react-bootstrap";
import RecipeListPopover from "../recipe/RecipeListPopover";
import {onValue, ref, get} from "firebase/database";
import RecipeListEntry from "../recipe/RecipeListEntry";
import {sortRecipes} from "../../../util/RecipeUtils";
import {database} from "../../../firebase";

class ScheduleDay extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            dateString: `${this.props.month}-${this.props.date}-${this.props.year}`,
            recipes: [],
            activeRecipes: [],
            edit: false
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props !== prevProps) {
            this.updateSchedule();
        }
    }

    componentDidMount() {
        this.updateSchedule();

    }

    updateSchedule() {
        const scheduleRef = ref(database, `${process.env.REACT_APP_DATABASE}/collections/${this.props.collection}/schedule/${this.state.dateString}`);
        const recipesRef = ref(database, process.env.REACT_APP_DATABASE + "/recipes");

        get(recipesRef).then((snapshot) => {
            if (snapshot.exists()) {
                const recipes = snapshot.val();

                onValue(scheduleRef, (snapshot2) => {
                    if (snapshot2.exists()) {
                        const schedule = snapshot2.val();
                        this.setState({
                            recipes: sortRecipes(this.getRecipes(recipes, schedule))
                        });
                    } else {
                        this.setState({
                            recipes: []
                        });
                    }
                });
            }
        });
    }

    handleSwitchToggled = (event) => {
        this.setState({
            edit: event.target.checked
        });
    }

    getRecipes(recipes, schedule) {
        return Object.values(schedule).map(scheduleEntry => {
            const recipe = this.scaleRecipe(recipes[scheduleEntry.id], scheduleEntry.scaleFactor);
            recipe.key = scheduleEntry.id;
            return recipe;
        });
    }

    scaleRecipe(recipe, scaleFactor) {
        // TODO
        return recipe;
    }

    render() {
        return (
            <div className="day-container app-card">
                <div className="p-3">
                    <p className="mb-0 fw-bold">{this.props.day}</p>
                    <p className="fw-semibold">{this.props.month} {this.props.date}</p>
                    <Row className="mb-5">
                        <Col>
                            {
                                this.state.recipes.map(recipe => {
                                    return (<RecipeListEntry recipe={recipe}
                                                             key={recipe.key}
                                                             activeRecipes={this.state.activeRecipes}
                                                             edit={this.state.edit}
                                                             location="schedule"
                                                             date={this.state.dateString}
                                                             collection={this.props.collection}/>);
                                })
                            }
                        </Col>
                    </Row>
                </div>
                <RecipeListPopover show={this.state.modalShow}
                                   onHide={() => this.setState({modalShow: false})}
                                   date={this.state.dateString}
                                   location="schedule-add"
                                   collection={this.props.collection}/>
                <Button variant="success"
                        className="add-recipe-button"
                        onClick={() => this.setState({modalShow: true})}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                         className="bi bi-plus-lg" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z"/>
                    </svg>
                </Button>
                <FormCheck type="switch" label="Edit" className={"schedule-day-edit " + (this.state.recipes.length === 0 ? "d-none" : "")} value={this.state.edit} onChange={this.handleSwitchToggled} />
            </div>
        );
    }
}

export default ScheduleDay;
