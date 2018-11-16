import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders( this.props.idToken );
    }

    render() {

        let order = this.props.order.map(order => (
            <Order 
                key={order.id} 
                ingredients={order.ingredients}
                orderData={order.orderData}
                price={order.totalPrice}
            />
        ));

        if(this.props.loading) {
            order = <Spinner />
        }

        return (
            <div>
                {order}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order.order,
    loading: state.order.loading,
    idToken: state.auth.token
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: (token) => dispatch(actions.fetchOrder(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
