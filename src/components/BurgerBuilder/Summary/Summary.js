import React from "react";

const Summary = (props) =>{
    const ingredientSummary = props.ingredients.map(item =>{
        return(
            <li key={item.type}>
                <span style={{textTransform: "capitalize"}}>{item.type}</span> : {item.amount}
            </li>
        )
    })
    return(
        <div className="container">
            {ingredientSummary}
        </div>
    );
}

export default Summary;