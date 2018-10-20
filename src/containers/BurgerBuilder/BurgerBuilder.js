import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';
import {connect} from 'react-redux';
import * as burgerBuilderActions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        spinner: false,
        error: false
    }

    componentDidMount () {
        console.log(this.props)
        // axios.get('https://react-my-burger-c5227.firebaseio.com/ingredients.json')
        //     .then( response => {
        //         this.setState({ingredients: response.data})
        //     })
        //     .catch ( error => {
        //         this.setState({error: true});
        //         console.log(1);
        //     });
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
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Error: The ingredients dropped on the way here from the grocery.</p> : <Spinner />;

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

        if(this.state.spinner) {
            ordersummary = <Spinner />
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
    ingredients: state.ingredients,
    totalPrice: state.totalPrice
});

const mapDispatchToProps = dispatch => ({
    addIngredientsHandler: (type) => dispatch(burgerBuilderActions.addIngredients(type)),
    removeIngredientsHandler: (type) => dispatch(burgerBuilderActions.removeIngredients(type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(axiosErrorHandler(BurgerBuilder, axios));
