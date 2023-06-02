import React, {useState} from "react";
import { useOutletContext } from "react-router-dom";
import ScheduleDay from "./ScheduleDay";
import {Button, Col, Row} from "react-bootstrap";
import {getWeekDayName, getMonthName} from "../../../util/DateUtils";

export default function Schedule() {
    const [days, setDays] = useState(7);

    const selectedCollection = useOutletContext();

    const handleLoadDays = () => {
        setDays(prevDays => {
            return prevDays + 7;
        });
    }

    const date = new Date();
    return (selectedCollection ? <Row className="g-3 m-2">
            {
                Array.from(Array(days).keys()).map((i) => {
                    const newDate = new Date();
                    newDate.setDate(date.getDate() + i);
                    return (
                        <Col lg={4} key={i}>
                            <ScheduleDay day={getWeekDayName(newDate.getDay())}
                                         date={newDate.getDate()}
                                         month={getMonthName(newDate.getMonth())}
                                         year={newDate.getFullYear()}
                                         collection={selectedCollection}/>
                        </Col>
                    );
                })
            }
            <Col lg={3}>
                <Button variant="secondary" className="w-100" onClick={handleLoadDays}>
                    Load More
                </Button>
            </Col>
        </Row> : <></>
    );
}
