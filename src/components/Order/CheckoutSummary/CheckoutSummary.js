import React from 'react';
import { withRouter } from 'react-router-dom';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';
import Aux from '../../../hoc/Auxilary/Auxilary';

const checkoutSummary = (props) => {
    let burger = <h1>Please create a burger first.</h1>;
    console.log(props)
    if (props.ingredients) {
        burger = (<Aux>
            <h1>That burger looks delicious!</h1>
            <Burger ingredients={props.ingredients} />
        </Aux>);
    }
    return (
        <div
            className={classes.CheckoutSummary}
            style={{
                width: '100%',
            }}>
            {burger}
            <div>
                <Button
                    btnType="Danger"
                    clicked={props.checkoutCancelled}>
                    Go back
                </Button>
                <Button
                    btnType="Success"
                    clicked={props.checkoutContinued}>
                    Continue
                </Button>
            </div>
        </div>
    )

}

export default withRouter(checkoutSummary);
