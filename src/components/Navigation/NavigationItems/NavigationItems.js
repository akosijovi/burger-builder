import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationitems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
            <NavigationItem link="/orders">Orders</NavigationItem>
            { !props.isAuth
                ? <NavigationItem link="/auth">Authenticate</NavigationItem>
                : <NavigationItem link="/logout">Logout</NavigationItem>
            }
        </ul>
    )
}

export default navigationitems;