import * as actionTypes from './actionTypes';

export const addIngredient = igType =>{
    return{
        type: actionTypes.ADD_INGREDIENT,
        payLoad: igType,
    }
}

export const removeIngredient = igType =>{
    return{
        type: actionTypes.REMOVE_INGREDIENT,
        payLoad: igType,
    }
}

export const updatePurchasable = igType =>{
    return{
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}