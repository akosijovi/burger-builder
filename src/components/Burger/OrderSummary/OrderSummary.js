import React from 'react';
import Aux from '../../../hoc/Auxilary';

const ordersummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients)
        .map( keys => {
            return (
                <li key={keys}><span style={{textTransform: 'capitalize'}}>{keys}</span>: {props.ingredients[keys]}</li>
            );
        } )

    return (
        <Aux>
            <h1>Your Order</h1>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    );
};

export default ordersummary;
