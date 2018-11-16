import React from 'react';
import NavigationItem from './NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationitems = (props) => {
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link="/burger-builder">Burger Builder</NavigationItem>
            { props.isAuth ? <NavigationItem link="/orders">Orders</NavigationItem> : null }
            { props.isAuth
                ? <NavigationItem link="/logout">Logout</NavigationItem>
                : <NavigationItem link="/auth">Login</NavigationItem>
            }
        </ul>
    )
}

export default navigationitems;