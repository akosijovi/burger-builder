import React, { Component } from 'react';
import Aux from '../Auxilary/Auxilary';
import Modal from '../../components/UI/Modal/Modal';

const axiosErrorHandler = (WrappedComponent, Axios) => {
    return class extends Component {

        state = {
            errors: null
        }

        componentWillMount () {
            this.reqInterceptor = Axios.interceptors.request.use(req => {
                this.setState({errors: null});
                return req;
            })
            this.resInterceptor = Axios.interceptors.response.use(null, error => {
                this.setState({errors: error})
            })
        }

        componentWillUnmount () {
            Axios.interceptors.request.eject(this.reqInterceptor);
            Axios.interceptors.response.eject(this.resInterceptor);
        }

        clickHandler = () => {
            this.setState({errors: null})
        }

        render () {
            return (
                <Aux>
                    <Modal 
                        show={this.state.errors}
                        removeModal={this.clickHandler}>
                        {this.state.errors ? this.state.errors.message : null}
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
            );
        }
    }
}

export default axiosErrorHandler;
