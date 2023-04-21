import React from "react";
import {Badge} from "react-bootstrap";
import "./Keyword.css";

class Keyword extends React.Component {
    render = () => {
        return (
            <Badge pill bg="primary" className="me-1">
                <span>{this.props.name}</span>
                <span className="keyword-x" onClick={() => this.props.onDeletePressed(this.props.name)}>
                    <i className="bi bi-x-circle"></i>
                </span>
            </Badge>
        )
    }
}

export default Keyword;