import React, {Component} from 'react';
import {connect} from 'react-redux';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    inputChangeHandler = (event, elementID) => {
        const updatedControls = {
            ...this.state.controls,
            [elementID]: {
                ...this.state.controls[elementID],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[elementID].validation),
                touched: true
            }
        }

        this.setState({controls: updatedControls})
    }

    checkValidity = (value, rules) => {
        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
            isValid = isValid && value.trim() !== '';
        }
        
        if (rules.minLength) {
            isValid = isValid && value.length >= rules.minLength
        }
        
        if (rules.maxLength) {
            isValid = isValid && value.length <= rules.maxLength
        }

        if (rules.isEmail) {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = isValid && re.test(String(value).toLowerCase());
        }

        return isValid;
    }

    submitHandler = (evt) => {
        evt.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState( prevState => {
            return {isSignup: !prevState.isSignup}
        })
    }

    render () {
        const formElementsArray = [];
        for(let key in this.state.controls){
            formElementsArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        const form = formElementsArray.map(el => (
            <Input 
                key={el.id}
                elementType={el.config.elementType}
                elementConfig={el.config.elementConfig}
                value={el.config.value}
                invalid={!el.config.valid}
                shouldValidate={el.config.validation}
                touched={el.config.touched}
                changed={(event) => this.inputChangeHandler(event, el.id)}
            />
        ) );

        return (
            <div className={classes.Auth}>
                <form onSubmit={ this.submitHandler }>
                    {form}
                    <Button btnType="Success">SUBMIT</Button>
                </form>
                <hr/>
                <Button 
                    clicked={this.switchAuthModeHandler}
                    btnType="Danger">SWITCH TO {this.state.isSignup? 'SIGNIN' : 'SIGNUP'}</Button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignup) => dispatch(actions.auth(email, password, isSignup))
    }
}

export default connect(null, mapDispatchToProps)(Auth);