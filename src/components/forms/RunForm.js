import React, { Component } from 'react';
import { runValidate } from "./validators";
import withStyles from '@material-ui/core/styles/withStyles';
import Checkbox from '@material-ui/core/Checkbox';
import { renderTextField } from '../TextField';
import { Field, reduxForm } from 'redux-form';
import Button from '../Button';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {createCase, deleteCase, getCases} from "../../redux/actions/casesActions";
import WithDefaultForEmptiness from "../../containers/WithDefaultForEmptiness";
import EntityList from "../../containers/EntityList";

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
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    toggleCase(caze) {
        if (this.state.selectedCaseIds.includes(caze.id)) {
            this.setState({selectedCaseIds: this.state.selectedCaseIds.filter(id => id !== caze.id)})
        } else {
            this.setState({selectedCaseIds: [...this.state.selectedCaseIds, caze.id]})
        }
    }

    fetchCases(){
        if(this.props.currentProject){
            this.props.getCases(this.props.currentProject);
        }
    }

    componentDidMount() {
        this.fetchCases()
    }

    handleSubmit(dataFromReduxForm) {
        this.props.submitAction(Object.assign({selectedCaseIds: this.state.selectedCaseIds}, dataFromReduxForm))
    }

    render(){
        const { error, classes, cases } = this.props;
        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

        return (
            <form className={classes.form} onSubmit={this.props.handleSubmit(this.handleSubmit)}>
                <Field
                    name="title"
                    label="Title"
                    component={renderTextField}
                    type='text'
                    editState={false}
                    onClick={() => {console.log('sdf')}}
                />
                {error && <strong style={{color:'red'}}>{error}</strong>}
                <EnhancedEntityList
                    entities={ cases }
                    title={ caze => caze.title }
                    id={ caze => caze.id }
                    clickHandler={ caze => this.toggleCase(caze) }
                    mainItemRenderer={ caze => <Checkbox checked={ this.state.selectedCaseIds.includes(caze.id) } /> }
                    secondaryActionRenderer={ caze => null }
                />
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
