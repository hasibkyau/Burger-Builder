import * as actionTypes from './actionTypes';
import axios from 'axios';

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

export const resetIngredients = () =>{
    return{
        type: actionTypes.RESET_INGREDIENTS,
    }
}

export const loadOrders = orders =>{
    return{
        type: actionTypes.LOAD_ORDERS,
        payLoad: orders,
    }
}


export const orderLoadFailed = () =>{
    return{
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}


export const fetchOrders = () => dispatch => {

        axios.get("https://burger-builder-723e2-default-rtdb.firebaseio.com/orders.json")
        .then(response =>{
            dispatch(loadOrders(response.data));
        })
        .catch(err=>{
            dispatch(orderLoadFailed());
        })
    
}