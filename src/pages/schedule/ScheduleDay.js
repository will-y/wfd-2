import React from "react";
import "./Schedule.css";

class ScheduleDay extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="day-container">
                <div className="p-3">
                    <p>{this.props.day}</p>
                    <p>{this.props.month} {this.props.date}</p>
                </div>

            </div>
        );
    }
}

export default ScheduleDay;