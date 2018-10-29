import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    order: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
}

const purchaseBurgerStart = ( state, action ) => {
    return updateObject(state, { loading: true });
}

const purchaseBurgerSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData,{ id: action.orderID });
    const updatedState = {
        loading: false,
        purchased: true,
        order: state.order.concat(newOrder)
    }
    return updateObject(state, updatedState);
}

const purchaseBurgerFail = (state, action ) =>{
    return updateObject(state, { loading: false });
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
}

const fetchOrderSuccess = (state, action) => {
    const updatedState = {
        loading: false,
        order: action.order
    }
    return updateObject(state, updatedState); 
}

const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false });
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return purchaseInit(state, action);

        case actionTypes.PURCHASE_BURGER_START:
            return purchaseBurgerStart(state, action);

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return purchaseBurgerFail(state, action);

        case actionTypes.FETCH_ORDER_START:
            return fetchOrderStart(state, action);

        case actionTypes.FETCH_ORDER_SUCCESS:
            return fetchOrderSuccess(state, action);

        case actionTypes.FETCH_ORDER_FAIL:
            return fetchOrderFail(state, action);

        default: return state
    }
}

export default reducer