import React from 'react';
import classes from './Logo.css';
import imageLogo from '../../assets/images/burger-logo.png'; 

const logo = () => (
    <div className={classes.Logo}>
        <img src={imageLogo} alt="Burger Logo" />
    </div>
);

export default logo;