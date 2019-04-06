import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { List } from 'immutable';
import ListElement from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import CaseIcon from '@material-ui/icons/InsertDriveFile';
import ReorderIcon from '@material-ui/icons/Reorder';
import {getCase, deleteCase} from '../redux/actions/casesActions';
import ExecutionRow from './../components/ExecutionRow';

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
      }
});

const defaultCaze = {title: "Unknown", steps: List(["govno", "dooo"])}

class Case extends Component {

    componentDidMount(){
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id){
        return this.props.getCase(id);
    }

    renderSteps(steps){
        const stepsElements = steps.map(s => (
            <ExecutionRow
                title={s}
                icon={<ReorderIcon />}
                to={''}
            />
        ));
        return(
            <ListElement>
                {stepsElements}
            </ListElement>
        )
    }

    render(){
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = defaultCaze || this.props.cases.get(id) || defaultCaze
        const title = caze.title
        const steps = caze.steps
        console.log("Shalalalalal")
        console.log(steps)

        return (
            <div className={classes.root}>
                <div className={classes.title}>
                    <CaseIcon className={classes.icon} />
                    <Typography
                    color="primary"
                    variant="h4"
                    inline
                    //   align="right"
                    >
                    {title}
                    </Typography>
                </div>
                {this.renderSteps(steps)}
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
        cases: state.cases.get('casesById')
    }
};


export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Case);
