import * as actionTypes from '../actions/actionTypes';
import axios from '../../axios-orders';

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderID: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (errorMsg) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: errorMsg
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json', orderData)
            .then( response => {
                // this.setState({loading: false, purchasing: false});
                // this.props.history.push('/');
                dispatch( purchaseBurgerSuccess(response.data.name, orderData) )
            })
            .catch( error => {
                // this.setState({loading: false, purchasing: false})
                dispatch( purchaseBurgerFail(error) );
            })
    }
}