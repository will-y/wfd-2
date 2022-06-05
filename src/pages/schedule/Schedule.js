import React from "react";
import ScheduleDay from "./ScheduleDay";
import {Col, Row} from "react-bootstrap";

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

class Schedule extends React.Component {

    render() {
        const date = new Date();
        return (
            <Row className="g-1 m-2">
                {
                    Array.from(Array(7).keys()).map((i) => {
                        const newDate = new Date();
                        newDate.setDate(date.getDate() + i);
                        return (
                            <Col lg={3} key={i}>
                                <ScheduleDay day={weekday[newDate.getDay()]}
                                             date={newDate.getDate()}
                                             month={monthNames[newDate.getMonth()]}
                                             year={newDate.getFullYear()}/>
                            </Col>
                        );
                    })
                }
            </Row>
        );
    }
}

export default Schedule;