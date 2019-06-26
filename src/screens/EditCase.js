import React, { Component } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import TextField from '@material-ui/core/TextField';
import {withStyles} from '@material-ui/core/styles';
import compose from 'recompose/compose';
import { List, Map } from 'immutable';

function saveCase() {
    console.log("Saving case")
}

const styles = theme => ({

});

const defaultCaze = Map({title: "Unknown", steps: List(["govno", "dooo"])})

class EditCase extends Component {

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.caseId
        const caze = this.props.cases.get(id)|| defaultCaze
        const title = caze.get("title")
        const steps = caze.get("steps")

        return(
            <div>
                <form className={classes.container} noValidate autoComplete="off">
                <TextField
                    id="standard-name"
                    label="First thing"
                    className={classes.textField}
                    value={'Foo'}
                    onChange={()=> console.log("Change")}
                    margin="normal"
                />
                </form>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        saveCase: saveCase
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
)(EditCase);

