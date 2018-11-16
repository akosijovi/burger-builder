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

export const purchaseBurger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json?auth=' + token, orderData)
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

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    }
}

export const fetchOrderSuccess = (fetchedOrder) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        order: fetchedOrder
    }
}

export const fetchOrderFail = (err) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        error: err
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrder = (token) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        axios.get('/orders.json?auth=' + token)
        .then( response => {
            const fetchedOrder = [];
            for (let key in response.data ){
                fetchedOrder.push({
                    ...response.data[key],
                    id: key
                });
            }
            dispatch(fetchOrderSuccess(fetchedOrder))
        })
        .catch( err => {
            dispatch(fetchOrderFail(err))
        });
    }
}
