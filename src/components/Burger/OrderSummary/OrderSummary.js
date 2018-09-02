import React from 'react';
import Aux from '../../../hoc/Auxilary/Auxilary';
import Button from '../../UI/Button/Button';

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
            <p><strong>Total Price: {props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.canceled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.continued}>CONTINUE</Button>
        </Aux>
    );
};

export default ordersummary;
