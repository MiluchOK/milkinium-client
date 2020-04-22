import React, { Component } from 'react';
import { runValidate } from "./validators";
import _ from 'lodash';
import withStyles from '@material-ui/core/styles/withStyles';
import WithCheckbox from "../WithCheckbox";
import { renderTextField } from '../TextField';
import { Field, reduxForm } from 'redux-form';
import Button from '../Button';
import List from "@material-ui/core/List";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {createCase, deleteCase, getCases} from "../../redux/actions/casesActions";
import EntityRow from "../EntityRow";
import NoResults from "../NoResults";

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    },
    submitContainer: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center'
    }
});


class RunForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCaseIds: []
        };
        this.myCustomFunction = this.myCustomFunction.bind(this);
    }

    renderCases(cases) {
        if (cases.size === 0) {
            return <NoResults/>
        }

        return _.map(cases, (c => {
            let EnhancedExecutionRow = WithCheckbox(EntityRow);
            return <EnhancedExecutionRow
                checked={this.state.selectedCaseIds.includes(c.id)}
                handleChange={(event) => {
                    console.log(`Checking to: ${event.target.checked}`);
                    let isChecked = event.target.checked;
                    if ( isChecked ) {
                        this.setState({selectedCaseIds: [...this.state.selectedCaseIds, c.id]})
                    } else {
                        this.setState({selectedCaseIds: this.state.selectedCaseIds.filter(id => id !== c.id)})
                    }
                }}
                title={c.title}
                key={c.id}
                id={c.id}
            />
        }))
    };

    fetchCases(){
        if(this.props.currentProject){
            this.props.getCases(this.props.currentProject);
        }
    }

    componentDidMount() {
        this.fetchCases()
    }

    myCustomFunction(dataFromReduxForm) {
        this.props.submitAction(Object.assign({selectedCaseIds: this.state.selectedCaseIds}, dataFromReduxForm))
    }

    render(){
        const { error, classes, cases } = this.props;
        // const submitAction = this.props.submitAction; // this is supplied from top component

        return (
            <form className={classes.form} onSubmit={this.props.handleSubmit(this.myCustomFunction)}>
                <Field
                    name="title"
                    label="Title"
                    component={renderTextField}
                    type='text'
                    editState={false}
                    onClick={() => {console.log('sdf')}}
                />
                {error && <strong style={{color:'red'}}>{error}</strong>}
                <List component="nav">
                    { this.renderCases(cases) }
                </List>
                <div className={classes.submitContainer}>
                    <Button className={classes.submit} type="submit" color="primary" variant="contained">
                        Save
                    </Button>
                </div>
            </form>
        )
    }
};


RunForm = reduxForm({
    // a unique name for the form
    form: 'run',
    runValidate,
    enableReinitialize: true,
})(RunForm);

const mapStateToProps = (state) => {
    return {
        cases: state.cases,
        currentProject: state.projects.currentProject
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCases: getCases,
        createCase: createCase,
        deleteCase: deleteCase,
    }, dispatch)
}

RunForm = connect(mapStateToProps, matchDispatchToProps)(RunForm);
export default withStyles(styles)(RunForm);
