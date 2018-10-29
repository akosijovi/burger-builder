import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.2
}

const initialState = {
    ingredients: null,
    totalPrice: 4,
    error: false,
}

const addIngredients = (state, action) => {
    const addIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] + 1 };
    const updatedIngredient = updateObject( state.ingredients, addIngredient);
    const updatedState = {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject( state, updatedState );
}

const removeIngredients = (state, action) => {
    const removeIngredient = { [action.ingredientName]: state.ingredients[action.ingredientName] - 1 };
    const updatedIngredient = updateObject( state.ingredients, removeIngredient);
    const updatedState = {
        ingredients: updatedIngredient,
        totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    }

    return updateObject( state, updatedState );
}

const setIngredients = (state, action) => {
    const setIngredients = {
        salad: action.ingredients.salad,
        bacon: action.ingredients.bacon,
        cheese:action.ingredients.cheese,
        meat: action.ingredients.meat
    }
    const updatedState = {
        ingredients: setIngredients,
        totalPrice: initialState.totalPrice,
        error: false
    }

    return updateObject( state, updatedState );
}

const getIngredientsFailed = (state, action) => {
    return updateObject(state, {error: true});
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.ADD_INGREDIENT: 
            return addIngredients(state, action);
        
        case actionTypes.REMOVE_INGREDIENT:
            return removeIngredients(state, action);

        case actionTypes.SET_INGREDIENTS:
            return setIngredients(state, action);

        case actionTypes.GET_INGREDIENTS_FAILED:
            return getIngredientsFailed(state, action);

        default:
            return state;
    }
}

export default reducer;