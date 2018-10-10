import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary/Auxilary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import axiosErrorHandler from '../../hoc/axiosErrorHandler/axiosErrorHandler';

const INGREDIENT_PRICES = {
    salad: 0.5,
    bacon: 0.7,
    cheese: 0.4,
    meat: 1.2
}

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        spinner: false,
        error: false
    }

    componentDidMount () {
        axios.get('https://react-my-burger-c5227.firebaseio.com/ingredients.json')
            .then( response => {
                this.setState({ingredients: response.data})
            })
            .catch ( error => {
                this.setState({error: true});
                console.log(1);
            });
    }

    updateIngredientsHandler = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map( key => {
                return ingredients[key];
            })
            .reduce( (sum, el) => {
                return sum + el;
            }, 0);
            this.setState( {purchasable: sum > 0} );
    }

    addIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updateIngredientsHandler(updatedIngredients);
    }

    removeIngredientsHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {
            ...this.state.ingredients
        };
        updatedIngredients[type] = updatedCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredients})
        this.updateIngredientsHandler(updatedIngredients);
    }

    showModalHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCanceledHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        // alert("Purchased!");
        // const resetState = {
        //     ingredients: {
        //         salad: 0,
        //         bacon: 0,
        //         cheese: 0,
        //         meat: 0,
        //     },
        //     totalPrice: 4,
        //     purchasable: false,
        //     purchasing: false,
        // }
        // this.setState({...resetState});


            // this.setState({spinner: true});
            // const order = {
            //     ingredients: this.state.ingredients,
            //     totalPrice: this.state.totalPrice,
            //     customer: {
            //         name: 'Jovi',
            //         address: {
            //             street: 'Test123',
            //             zipCode: '1234',
            //             country: 'Philippines'
            //         }
            //     }
            // }
            // axios.post('/orders.json', order)
            //     .then( response => {
            //         this.setState({spinner: false, purchasing: false})
            //     })
            //     .catch( error => {
            //         this.setState({spinner: false, purchasing: false})
            //     })

            // this.props.history.push({
            //     pathname: '/checkout',
            //     search: Object.keys(this.state.ingredients)
            //     .map(key => {
            //         return key + '=' + this.state.ingredients[key]
            //     }).join('&')
            // });

            const queryParams = [];
            for( let i in this.state.ingredients){
                if(this.state.ingredients[i] > 0)
                    queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
            }

            const queryString = queryParams.join('&');

            this.props.history.push({
                pathname: '/checkout',
                search: queryString
            });
    }

    render() {
        const disabledInfo = {
            ...this.state.ingredients
        }

        for( let key in disabledInfo ){
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        
        let ordersummary = null;
        let burger = this.state.error ? <p style={{textAlign: 'center'}}>Error: The ingredients dropped on the way here from the grocery.</p> : <Spinner />;

        if(this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls 
                        ingredientAdded={this.addIngredientsHandler}
                        ingredientRemoved={this.removeIngredientsHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        showModal={this.showModalHandler}
                        purchasable={this.state.purchasable}
                    />
                </Aux>
            );
            ordersummary = <OrderSummary 
                    canceled={this.purchaseCanceledHandler}
                    continued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
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

export default axiosErrorHandler(BurgerBuilder, axios);
