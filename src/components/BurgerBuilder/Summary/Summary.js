import React from "react";

const Summary = (props) => {
    const ingredientSummary = props.ingredients.map(item => {
        return (
            <div className="container" key={item.type}>
                <li >
                    <span style={{ textTransform: "capitalize" }}>{item.type}</span> : {item.amount}
                </li>
            </div>
        )
    })
    return (
        <div>
            {ingredientSummary}
        </div>
    );
}

export default Summary;