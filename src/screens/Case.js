import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { List } from 'immutable';
import ListElement from '@material-ui/core/List';
import log from 'loglevel';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import CaseIcon from '@material-ui/icons/InsertDriveFile';
import ReorderIcon from '@material-ui/icons/Reorder';
import {getCase, deleteCase, editCase} from '../redux/actions/casesActions';
import ExecutionRow from './../components/ExecutionRow';
import LoadingIndicator from './../components/LoadingIndicator';
import { fromJS, Map } from 'immutable';

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

class Case extends Component {

    renderLink = itemProps => <Link style={{ textDecoration: 'none' }} {...itemProps} />

    componentDidMount() {
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id) {
        return this.props.getCase(id);
    }

    deleteStep(caseId, stepId) {
        // Remove step from the case
        const cazeData = this.props.cases.get(this.props.match.params.caseId)
        let newSteps = [];
        cazeData.get("steps").map(s => {
            if(s.get("id") != stepId){
                s = s.get("id")
                newSteps.push(s)
            }
        })
        newSteps = fromJS(newSteps)
        const data = cazeData.set('steps', newSteps)
        this.props.editCase(caseId, data)
    }

    renderSteps(steps) {
        const caseId = this.props.cases.get(this.props.match.params.caseId).get("id")
        const stepsElements = steps.map(s => {
            return(
                <ExecutionRow
                    title={s.get("body")}
                    icon={<ReorderIcon />}
                    to={''}
                    handleDelete={() => {this.deleteStep(caseId, s.get("id"))}}
                />
            )
        });
        return(
            <ListElement>
                {stepsElements}
            </ListElement>
        )
    }

    stepsLoaded(caze) {
        if(caze.get('steps') == null) {
            log.debug('No steps for case found.')
            return false
        }
        log.debug(typeof caze.get("steps").get(0))
        const stepsAreNotEmpty = caze.get("steps").size != 0
        const stepsAreNotStrings = typeof caze.get("steps").get(0) == "string"
        if(stepsAreNotEmpty && stepsAreNotStrings) {
            log.debug("Steps are not empty. ", stepsAreNotEmpty)
            log.debug("Steps are not strings. ", stepsAreNotStrings)
            log.debug("Steps type is: ", typeof caze.get("steps").get(0))
            return false
        }
        return true
    }

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = this.props.cases.get(id)

        if(caze && this.stepsLoaded(caze)) {
            const title = caze.get("title")
            const steps = caze.get("steps")

            return (
                <div className={classes.root}>
                    <Paper className={classes.root}>
                        <div className={classes.title}>
                            <CaseIcon className={classes.icon} />
                            <Typography
                            color="primary"
                            variant="h4"
                            inline
                            >
                            {title}
                            </Typography>
                        </div>
                        <div>
                            {this.renderSteps(steps)}
                        </div>
                        <Button variant="fab"
                                onClick={this.editCase}
                                component={this.renderLink}
                                to={`/cases/${id}/edit`}
                                color="primary"
                                aria-label="add"
                                className={classes.fab}>
                            <EditIcon />
                        </Button>
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


