import React, { Component } from 'react';
import Aux from '../../hoc/Auxilary';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

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
                    show={this.state.showSideDrawer}
                    closed={this.closeSideDrawerHandler}
                />
                <Toolbar open={this.openSideDrawerHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }   
}

export default Layout;