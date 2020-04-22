import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import NavBar from './containers/NavBar';
import PageNotFound from './screens/PageNotFound';
import GlobalError from './screens/GlobalError';
import log from 'loglevel';
import NavBarRoutes from './routes/navBarRoutes';
import Profile from './screens/Profile';
import Case from './screens/Case';
import Suite from './screens/Suite';
import Execution from './screens/Execution';
import NewProjectScreen from './screens/NewProjectScreen';
import _ from 'lodash';
import { getProjects } from './redux/actions/projectsActions';
import { getCurrentUser} from './redux/actions/usersActions';


import './App.css';

class App extends Component {

    componentWillMount(){
        this.props.getCurrentUser();
        this.props.getProjects();
    }

    render() {
      log.enableAll();
      let appScreen = (
         <div className="App">
            <NavBar>
                <Switch>
                    {NavBarRoutes.map((route) => (
                        <Route key={route.path} path={route.path} exact component={route.component} />
                    ))}
                    <Route path="/cases/:caseId" exact component={Case} />
                    <Route path="/suites/:suiteId" exact component={Suite} />
                    <Route path="/executions/:executionId" exact component={Execution} />
                    <Route path="/projects/new" exact component={NewProjectScreen} />
                    <Route path="/profile" exact component={Profile}/>
                    {/*TODO Fix 404 rendering with NavBar*/}
                    <Route component={PageNotFound}/>
                </Switch>
            </NavBar>
        </div>
      )

      if (_.isEmpty(this.props.allProjects)) {
        appScreen = (
          <div>
            <NewProjectScreen /> 
          </div>
        )
      }

      // Show global error if there is more that one critical error
      if (this.props.errors.filter(e => e.critical).size > 0){
          appScreen = <GlobalError />
      }

      return (appScreen);
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        getCurrentUser: getCurrentUser,
        getProjects: getProjects
    }, dispatch)
}

const mapStateToProps = (state) => {
    const allProjects = state.projects.projectsById;
    const errors = state.errors;
    const currentProject = state.projects.currentProject;
    return {
        allProjects: allProjects,
        errors: errors
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(App);
