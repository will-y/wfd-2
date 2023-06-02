import {useOutletContext} from "react-router-dom";
import React from "react";

const withOutletContextWrapper = (Component) => {
    return (props) => {
        const context = useOutletContext();

        return <Component collection={context} {...props} />;
    }
}

export default withOutletContextWrapper;
