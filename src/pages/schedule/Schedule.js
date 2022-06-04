import React from "react";
import ScheduleDay from "./ScheduleDay";
import {Col, Row} from "react-bootstrap";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Schedule extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        const date = new Date();
        return (
            <Row className="g-1 m-2">
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
                <Col md>
                    <ScheduleDay day={weekday[date.getDay()]} date={date.getDate()} month={monthNames[date.getMonth()]}/>
                </Col>
            </Row>
        );
    }
}

export default Schedule;