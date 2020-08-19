import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import projects from './projects';
import users from './users';
import cases from './casesReducer';
import suites from './suitesReducer';
import runs from './runsReducer';
import tests from './testsReducer';
import errors from './errorsReducer';
import loaders from './loadingReducer';
import current_user from './currentUser';

const rootReducer = combineReducers({
  projects,
  cases,
  suites,
  users,
  runs,
  tests,
  current_user,
  errors,
  loaders,
  form: formReducer
});

export default rootReducer;
