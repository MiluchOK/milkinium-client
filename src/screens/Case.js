import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import CaseIcon from '@material-ui/icons/InsertDriveFile';
import {getCase, deleteCase} from '../redux/actions/casesActions';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 60,
      },
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }
});

const defaultCaze = {title: "Unknown"}

class Case extends Component {

    componentDidMount(){
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id){
        return this.props.getCase(id);
    }

    render(){
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = this.props.cases.get(id) || defaultCaze
        const title = caze.title

        return (
            <div className={classes.root}>
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
