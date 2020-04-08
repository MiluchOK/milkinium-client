import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import log from 'loglevel';
import Paper from '@material-ui/core/Paper';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import {getCase, deleteCase, editCase} from '../redux/actions/casesActions';
import LoadingIndicator from './../components/LoadingIndicator';
import CaseForm from '../components/forms/CaseForm';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 60,
      },
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        padding: '24px'
      },
      title: {
          width: '100%',
          flexBasis: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '50px'
      },
      fab: {
        position: 'fixed',
        zIndex: 10000,
        bottom: 30,
        right: 20,
    },
});


const validate = values => {
    const errors = {}
    const requiredFields = [
      'email',
      'password'
    ]
    requiredFields.forEach(field => {
      if (!values[field]) {
        errors[field] = 'Required'
      }
    })
    if (
      values.email &&
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = 'Invalid email address'
    }
    return errors
  }

class Case extends Component {

    constructor(props) {
        super(props)
        this.editCase = this.editCase.bind(this);
    }

    renderLink = itemProps => <Link style={{ textDecoration: 'none' }} {...itemProps} />

    componentDidMount() {
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id) {
        return this.props.getCase(id);
    }

    editCase(values){
        const caseId = this.props.match.params.caseId
        log.debug("Submitting with caseID: " + caseId + " and data: ", values)
        this.props.editCase(caseId, values)
    }

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = this.props.cases.get(id)

        if(caze) {
            return (
                <div className={classes.root}>
                    <Paper className={classes.root}>
                        <CaseForm 
                            initialValues={caze.toJS()}
                            submitAction={this.editCase}
                        />
                    </Paper>
                </div>
            )
        }
        else {
            return(<LoadingIndicator />)
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCase: getCase,
        editCase: editCase
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        cases: state.cases
    }
};

export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Case);


