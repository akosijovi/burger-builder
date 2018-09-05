import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

class NavigationItem extends Component {
    render () {
        return (
            <li className={classes.NavigationItem}>
                <NavLink 
                    to={this.props.link}
                    activeClassName={classes.active}
                    >{this.props.children}</NavLink>
            </li>
        )
    }
}
NavigationItem.propTypes = {
    link: PropTypes.string,
}

export default NavigationItem;