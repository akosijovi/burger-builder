import React, { Component } from 'react';

import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';
import classes from './CheckoutSummary.css';

class CheckoutSummary extends Component {

    state = {
        ingredients: {
            bacon: 1,
            salad: 1,
            cheese: 1,
            meat: 1,
        }
    }

    render() {
        return (
            <div
                className={classes.CheckoutSummary}
                style={{
                    width: '100%',
                }}>
                <h1>That burger looks delicious!</h1>
                <Burger ingredients={this.state.ingredients} />
                <div>
                    <Button
                        clicked
                        btnType="Danger">
                            Cancel
                    </Button>
                    <Button
                        clicked
                        btnType="Success">
                            Continue
                    </Button>
                </div>
            </div>
        )
    }
}

export default CheckoutSummary;
