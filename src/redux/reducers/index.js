import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import projects from './projects';
import users from './users';
import cases from './casesReducer';
import suites from './suitesReducer';
import runs from './runsReducer';
import errors from './errorsReducer';
import current_user from './currentUser';

const rootReducer = combineReducers({
  projects,
  cases,
  suites,
  users,
  runs,
  current_user,
  errors,
  form: formReducer
});

export default rootReducer;
