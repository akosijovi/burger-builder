import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const addIngredients = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredients = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name
    }
}

export const setIngredients = (data) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: data
    }
}

export const getIngredientsFailed = () => {
    return {
        type: actionTypes.GET_INGREDIENTS_FAILED
    }
}

export const initIngredients = () => {
    return dispatch => {
        axios.get('https://react-my-burger-c5227.firebaseio.com/ingredients.json')
            .then( response => {
                dispatch(setIngredients(response.data));
            })
            .catch ( error => {
                dispatch(getIngredientsFailed());
            });
    }
}