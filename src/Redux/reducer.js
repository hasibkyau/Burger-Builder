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
    orders: [],
    orderLoading: true,
    orderErr: false,
    totalPrice: 80,
    purchasable: false,
    token: null,
    userId: null,
}

export const reducer = (state = INITIAL_STATE, action) => {
    const ingredients = [...state.ingredients];
    let igPrice;
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            for (let item of ingredients) {
                if (item.type === action.payLoad) {
                    if (item.amount < 5) {
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
            return {
                ...state,
                ingredients: ingredients,
            }
        case actionTypes.UPDATE_PURCHASABLE:
            const sum = state.ingredients.reduce((sum, Element) => {
                return sum + Element.amount;
            }, 0)
            return {
                ...state,
                purchasable: sum > 0,
            }
        case actionTypes.RESET_INGREDIENTS:
            return {
                ...state,
                ingredients: [
                    { type: 'salad', amount: 0 },
                    { type: 'cheese', amount: 0 },
                    { type: 'meat', amount: 0 },
                ],
                totalPrice: 80,
                purchasable: false,
            }
        case actionTypes.LOAD_ORDERS:
            let orders = [];
            for (let key in action.payLoad) {
                orders.push({
                    ...action.payLoad[key],
                    id: key,
                })
            }
            return {
                ...state,
                orders: orders,
                orderLoading: false,
            }
        case actionTypes.ORDER_LOAD_FAILED:
            return {
                ...state,
                orderErr: true,
                orderLoading: false,
            }
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payLoad.token,
                userId: action.payLoad.userId
            }
        default:
            return state;
    }
}