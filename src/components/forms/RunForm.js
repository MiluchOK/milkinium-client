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
            selectedCaseIds: [],
            something: 'lskfnds'
        };
        this.myCustomFunction = this.myCustomFunction.bind(this);
    }

    // renderCases(cases) {
    //     if (cases.size === 0) {
    //         return <NoResults/>
    //     }
    //
    //     return _.map(cases, (c => {
    //         let EnhancedExecutionRow = WithCheckbox(EntityRow);
    //         return <EnhancedExecutionRow
    //             checked={this.state.selectedCaseIds.includes(c.id)}
    //             handleChange={(event) => {
    //                 console.log(`Checking to: ${event.target.checked}`);
    //                 let isChecked = event.target.checked;
    //                 if ( isChecked ) {
    //                     this.setState({selectedCaseIds: [...this.state.selectedCaseIds, c.id]})
    //                 } else {
    //                     this.setState({selectedCaseIds: this.state.selectedCaseIds.filter(id => id !== c.id)})
    //                 }
    //             }}
    //             title={c.title}
    //             key={c.id}
    //             id={c.id}
    //         />
    //     }))
    // };

    toggleCase(caze) {
        console.log({caze: caze})
        if (this.state.selectedCaseIds.includes(caze.id)) {
            console.log("Removing")
            this.setState({selectedCaseIds: this.state.selectedCaseIds.filter(id => id !== caze.id)})
        } else {
            console.log("Adding")
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

    myCustomFunction(dataFromReduxForm) {
        this.props.submitAction(Object.assign({selectedCaseIds: this.state.selectedCaseIds}, dataFromReduxForm))
    }

    render(){
        const { error, classes, cases } = this.props;
        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

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
