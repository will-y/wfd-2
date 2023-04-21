import React from "react";
import {Badge} from "react-bootstrap";
import "./Keyword.css";

class Keyword extends React.Component {
    render = () => {
        return (
            <Badge pill bg="primary">
                <span>{this.props.name}</span>
                <span className="keyword-x">
                    <i className="bi bi-x-circle"></i>
                </span>
            </Badge>
        )
    }
}

export default Keyword;