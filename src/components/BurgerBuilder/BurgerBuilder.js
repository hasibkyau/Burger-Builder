import React, { Component } from 'react';
import Burger from './Burger/Burger';
import Controls from './Controls/Controls';

const INGREDIENT_PRICES = {
    salad : 20,
    cheese: 40,
    meat: 90,
}
export default class BurgerBuilder extends Component {
    state = {
        ingredients: [
            { type: 'salad', amount: 0 },
            { type: 'cheese', amount: 0 },
            { type: 'meat', amount: 0 },
        ],
        totalPrice: 80,
    }

    addIngredientHandle = type =>{
        const ingredients = [...this.state.ingredients];
        let newPrice;
        for(let item of ingredients){
            if(item.type === type){ 
                if(item.amount < 5) {
                    item.amount++;
                    this.state.totalPrice = this.state.totalPrice + INGREDIENT_PRICES[type];
                }
            };
        }
        this.setState({
            ingredients: ingredients,
            //totalPrice : newPrice
        });
    }

    removeIngredientHandle = type =>{
        const ingredients = [...this.state.ingredients];
        let newPrice;
     
        for(let item of ingredients){
            if(item.type === type) {
                if(item.amount != 0){
                    item.amount--;
                    this.state.totalPrice = this.state.totalPrice - INGREDIENT_PRICES[type];
                }
            }
        }
        this.setState({
            ingredients: ingredients,
            //totalPrice: newPrice
        });   
    }

    render() {
        return (
            <div className="d-flex flex-md-row flex-column">
                <Burger ingredients={this.state.ingredients} />
                <Controls
                 ingredientAdded = {this.addIngredientHandle}
                 ingredientRemove = {this.removeIngredientHandle}
                 totalPrice = {this.state.totalPrice}
                />
            </div>
        )
    }
}