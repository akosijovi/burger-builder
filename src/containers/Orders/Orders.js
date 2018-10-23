import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';

class Orders extends Component {
    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
        .then( response => {
            const fetchedOrder = [];
            for (let key in response.data ){
                fetchedOrder.push({
                    ...response.data[key],
                    id: key
                });
            }
            console.log(fetchedOrder)
            this.setState({loading: false, orders: fetchedOrder});
        })
        .catch( err => {
            this.setState({loading: false});
        });
    }
    render() {
        return (
            <div>
                {this.state.orders.map(order => (
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

export default axiosErrorHandler(Orders, axios);
