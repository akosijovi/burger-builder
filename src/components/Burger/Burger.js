import React from 'react'; 
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    const dynamicIngredients = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map( (_, idx) => {
                return <BurgerIngredient key={igKey + idx} type={igKey} />
            })
        })

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {dynamicIngredients}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
};

export default burger;
