import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import withErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.fetchOrders();
    }

    render() {
        return (
            <div>
                {this.props.order.map(order => (
                    <Order 
                        key={order.id} 
                        ingredients={order.ingredients}
                        orderData={order.orderData}
                        price={order.totalPrice}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = state => ({
    order: state.order.order
});

const mapDispatchToProps = dispatch => ({
    fetchOrders: () => dispatch(actions.fetchOrder())
});

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
