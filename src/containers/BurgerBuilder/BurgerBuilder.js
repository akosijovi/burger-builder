import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-orders';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
    }

    componentDidMount () {
        console.log(this.props)
        this.props.initIngredientsHandler();
    }

    updateIngredientsHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map( key => {
                return ingredients[key];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
            return sum > 0;
    }

    showModalHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        }

        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let ordersummary = null;
        let burger = this.props.error ? <p style={{textAlign: 'center'}}>Error: The ingredients dropped on the way here from the grocery.</p> : <Spinner />;

        if(this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.props.addIngredientsHandler}
                        ingredientRemoved={this.props.removeIngredientsHandler}
                        disabledInfo={disabledInfo}
                        price={this.props.totalPrice}
                        showModal={this.showModalHandler}
                        purchasable={this.updateIngredientsHandler(this.props.ingredients)}
                    />
                </Aux>
            );
            ordersummary = <OrderSummary 
                    canceled={this.purchaseCanceledHandler}
                    continued={this.purchaseContinueHandler}
                    ingredients={this.props.ingredients}
                    price={this.props.totalPrice}
                />
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} removeModal={this.purchaseCanceledHandler}>
                    {ordersummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = state => ({
    ingredients: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error
});

const mapDispatchToProps = dispatch => ({
    addIngredientsHandler: (type) => dispatch(actions.addIngredients(type)),
    removeIngredientsHandler: (type) => dispatch(actions.removeIngredients(type)),
    initIngredientsHandler: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit())
});

export default connect(mapStateToProps, mapDispatchToProps)(axiosErrorHandler(BurgerBuilder, axios));
