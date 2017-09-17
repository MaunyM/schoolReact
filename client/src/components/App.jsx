import React from 'react'
import {connect} from 'react-redux'

import {Route} from 'react-router'
import {push} from 'react-router-redux'

import Login from './user/Login';
import Signup from './user/Signup';
import Home from './Home';

import {me} from '../actions'

import './app.css'

class AppContainer extends React.Component {
    componentWillMount() {
        const {goTo, me} = this.props;
        const token = sessionStorage.getItem('jwtToken');
        if (token) {
            me(token)
        } else {
            goTo('/login')
        }
    }

    render() {
        return (
            <span>
                <Route exact path="/login" component={Login}/>
                <Route exact path="/signup" component={Signup}/>
                <Route path="/home" component={Home}/>
            </span>
        )
    }
}

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        },
        me: token => {
            dispatch(me(token))
        }
    })
)(AppContainer);