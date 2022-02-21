import *as actionTypes from './actionTypes';

const INGREDIENT_PRICES = {
    salad: 20,
    cheese: 40,
    meat: 90,
}

const INITIAL_STATE = {
    ingredients: [
        { type: 'salad', amount: 0 },
        { type: 'cheese', amount: 0 },
        { type: 'meat', amount: 0 },
    ],
    totalPrice: 80,
    purchasable: false,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];
    let igPrice;
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payLoad) {
                    if(item.amount < 5){
                        item.amount++;
                        state.totalPrice = state.totalPrice + INGREDIENT_PRICES[action.payLoad];
                    }
                }
            }
            return {
                ...state,
                ingredients: ingredients,
            }

        case actionTypes.REMOVE_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payLoad) {
                    if (item.amount != 0) {
                        item.amount--;
                        state.totalPrice = state.totalPrice - INGREDIENT_PRICES[action.payLoad];
                    } 
                }
            }
            return{
                ...state,
                ingredients: ingredients,        
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, Element)=>{
                return sum + Element.amount;
            },0)
            return{
                ...state,
                purchasable: sum > 0,
            }
        default:
            return state;
    }
}