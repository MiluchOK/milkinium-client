import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import NavBar from './containers/NavBar';
import PageNotFound from './screens/PageNotFound';
import NavBarRoutes from './routes/navBarRoutes';
import Profile from './screens/Profile';
import Case from './screens/Case';
import { getProjects } from './redux/actions/projectsActions';
import { getCurrentUser} from './redux/actions/usersActions';


import './App.css';

class App extends Component {

    componentWillMount(){
        this.props.getCurrentUser();
        this.props.getProjects();
    }

    render() {

        return (
            <div className="App">
                <NavBar>
                    <Switch>
                        {NavBarRoutes.map((route) => (
                            <Route key={route.path} path={route.path} exact component={route.component} />
                        ))}
                        <Route path="/cases/:caseId" exact component={Case} />
                        <Route path="/profile" exact component={Profile}/>
                        {/*TODO Fix 404 rendering with NavBar*/}
                        <Route component={PageNotFound}/>
                    </Switch>
                </NavBar>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getCurrentUser: getCurrentUser,
        getProjects: getProjects
    }, dispatch)
}

//TODO remove
const mapStateToProps = (state) => {
    const pbid = state.projects.get('projectsById');
    const currentProject = state.projects.get('currentProject');
    return {
        allProjects: pbid
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
