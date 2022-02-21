import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },
        ]
    }

    addIngredientHandle = type =>{
        const ingredients = [...this.state.ingredients];
        for(let item of ingredients){
            if(item.type === type){ 
                if(item.amount < 5) item.amount++
            };
        }
        this.setState({ingredients: ingredients});
        //console.log(type);
    }

    removeIngredientHandle = type =>{
        const ingredients = [...this.state.ingredients];
        for(let item of ingredients){
            if(item.type === type) {
                if(item.amount != 0)item.amount--;
            }
        }
        this.setState({ingredients: ingredients});
        //console.log(type);
    }
    render() {
        return (
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls
                 ingredientAdded = {this.addIngredientHandle}
                 ingredientRemove = {this.removeIngredientHandle}
                />
            </div>
        )
    }
}