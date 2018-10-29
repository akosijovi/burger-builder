import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
    order: [],
    loading: false,
    purchased: false
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

const fetchOrderSuccess = (state, action) => {
    const updatedState = {
        loading: false,
        order: action.order
    }
    return updateObject(state, updatedState); 
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.PURCHASE_INIT:
            return updateObject(state, { purchased: false });

        case actionTypes.PURCHASE_BURGER_START:
            return updateObject(state, { loading: true });

        case actionTypes.PURCHASE_BURGER_SUCCESS:
            return purchaseBurgerSuccess(state, action);

        case actionTypes.PURCHASE_BURGER_FAIL:
            return updateObject(state, { loading: false });

        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, { loading: true });

        case actionTypes.FETCH_ORDER_SUCCESS:
            return fetchOrderSuccess(state, action);

        case actionTypes.FETCH_ORDER_FAIL:
            return updateObject(state, { loading: false });
            
        default: return state
    }
}

export default reducer