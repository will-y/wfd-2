import React, {useState} from "react";
import Keyword from "./Keyword";
import {FormControl} from "react-bootstrap";
import "./Keyword.css";

export default function KeywordInput(props) {
    const [keyword, setKeyword] = useState('');
    const [keywords, setKeywords] = useState(props.initialKeywords ? [...props.initialKeywords] : []);

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            // Don't submit form
            event.stopPropagation();
            event.preventDefault();

            // Handle enter press
            if (keyword !== "" && !keywords.includes(keyword)) {
                const newKeywords = [...keywords];
                newKeywords.push(keyword);
                setKeywords(newKeywords);
                setKeyword('');
                props.updateKeywords(newKeywords);
            }
        }
    }

    const deleteKeyword = (name) => {
        setKeywords(prevKeywords => {
            const copy = [...prevKeywords];
            const index = copy.indexOf(name);

            if (index >= 0) {
                copy.splice(index, 1);
                props.updateKeywords(copy);
            }

            return copy;
        });
    }

    return (
        <>
            <div className="keywords-container">
                {keywords.map((keyword, index) =>
                    <Keyword name={keyword} key={index} onDeletePressed={deleteKeyword}></Keyword>
                )}
            </div>
            <FormControl
                className="mt-2"
                placeholder="Add Keywords"
                value={keyword}
                onChange={event => setKeyword(event.target.value)}
                onKeyDown={handleKeyDown}/>
        </>
    );
}