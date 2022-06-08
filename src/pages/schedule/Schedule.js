import React from "react";
import ScheduleDay from "./ScheduleDay";
import {Button, Col, Row} from "react-bootstrap";
import {getWeekDayName, getMonthName} from "../../util/DateUtils";


class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            days: 7
        }
    }

    handleLoadDays = () => {
        this.setState(prevState => {
            return {
                days: prevState.days + 7
            };
        });
    }



    render() {
        const date = new Date();
        return (
            <Row className="g-1 m-2">
                {
                    Array.from(Array(this.state.days).keys()).map((i) => {
                        const newDate = new Date();
                        newDate.setDate(date.getDate() + i);
                        return (
                            <Col lg={4} key={i}>
                                <ScheduleDay day={getWeekDayName(newDate.getDay())}
                                             date={newDate.getDate()}
                                             month={getMonthName(newDate.getMonth())}
                                             year={newDate.getFullYear()}/>
                            </Col>
                        );
                    })
                }
                <Col lg={3}>
                    <Button variant="secondary" className="w-100" onClick={this.handleLoadDays}>
                        Load More
                    </Button>
                </Col>
            </Row>
        );
    }
}

export default Schedule;