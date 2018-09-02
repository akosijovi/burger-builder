import React, {Component} from 'react';
import PropTypes from 'prop-types';
import classes from './NavigationItem.css';

class NavigationItem extends Component {
    render () {
        return (
            <li className={classes.NavigationItem}>
                <a 
                    href={this.props.link}
                    className={this.props.active ? classes.active : null}>{this.props.children}</a>
            </li>
        )
    }
}
NavigationItem.propTypes = {
    link: PropTypes.string,
    active: PropTypes.bool,
}

export default NavigationItem;