import React, { Component } from 'react';
import { connect } from 'react-redux';

import Aux from '../../hoc/Auxilary/Auxilary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {

    state = {
        showSideDrawer: false,
    }

    openSideDrawerHandler = () => {
        this.setState({showSideDrawer: true});
    }

    closeSideDrawerHandler = () => {
        this.setState( (prevState) =>{
            return {showSideDrawer: !prevState.showSideDrawer}
        });
    }

    render () {
        return (
            <Aux>
                <SideDrawer 
                    isAuth={this.props.isAuthenticated}
                    show={this.state.showSideDrawer}
                    closed={this.closeSideDrawerHandler}
                />
                <Toolbar 
                    isAuth={this.props.isAuthenticated}
                    open={this.openSideDrawerHandler}
                />
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }   
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null,
    }
}

export default connect(mapStateToProps, null)(Layout);