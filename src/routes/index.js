import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom'
import {Switch, Route} from 'react-router-dom';
import Login from '../screens/Login';
import PrivateRoute from './privateRoute';
import App from '../App';

class Routes extends Component {

    render() {
        return (
            <BrowserRouter>
                <Switch>
                    {/*Public routes are defined here*/}
                    <Route path='/signin' exact component={Login}/>
                    {/*Private routes are defined in the App component*/}
                    <PrivateRoute path="/" component={App}/>
                </Switch>
            </BrowserRouter>
        );
    }
}

export default Routes;
