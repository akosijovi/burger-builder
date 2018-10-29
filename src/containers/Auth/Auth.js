import React, {Component} from 'react';

import classes from './Auth.css';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';

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
        }
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
            const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = isValid && re.test(String(value).toLowerCase());
        }

        return isValid;
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
                <form>
                    {form}
                    <Button btnType="Success" >SUBMIT</Button>
                </form>
            </div>
        );
    }
}

export default Auth;