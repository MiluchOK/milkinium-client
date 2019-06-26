import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { List } from 'immutable';
import ListElement from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EditIcon from '@material-ui/icons/Edit';
import Button from '@material-ui/core/Button';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import { Link } from 'react-router-dom';
import CaseIcon from '@material-ui/icons/InsertDriveFile';
import ReorderIcon from '@material-ui/icons/Reorder';
import {getCase, deleteCase} from '../redux/actions/casesActions';
import ExecutionRow from './../components/ExecutionRow';
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

const defaultCaze = Map({title: "Unknown", steps: List(["govno", "dooo"])})

class Case extends Component {

    renderLink = itemProps => <Link style={{ textDecoration: 'none' }} {...itemProps} />

    componentDidMount() {
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id) {
        return this.props.getCase(id);
    }

    editCase() {
        console.log("Edit")
    }

    renderSteps(steps) {
        const stepsElements = steps.map(s => (
            <ExecutionRow
                title={s}
                icon={<ReorderIcon />}
                to={''}
                handleDelete={() => {console.log("Deleting step")}}
            />
        ));
        return(
            <ListElement>
                {stepsElements}
            </ListElement>
        )
    }

    render() {
        console.log("Rendering case")
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = this.props.cases.get(id) || defaultCaze
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
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCase: getCase
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


