import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import actionTypes from '../redux/actions/actionTypes';
import { bindActionCreators } from 'redux';
import { getCases, createCase, deleteCase } from '../redux/actions/casesActions';
import Creator from "../containers/Creator";
import CaseForm from "../components/forms/CaseForm";
import EntityTable from "../containers/tables/EntityTable";
import WithDefaultForEmptiness from '../containers/WithDefaultForEmptiness';
import {withStyles} from "@material-ui/core/styles";

let EnhancedEntityTable = WithDefaultForEmptiness(EntityTable);


const styles = theme => ({
    newCaseButton: {
        display: 'flex',
        flexGrow: 1,
        justifyContent: 'flex-end',
        margin: theme.spacing.unit
    },
    main: {
        flexGrow: 1
    }
});


class Cases extends Component {

    state = {
        creatorOpen: false
    }

    constructor(props) {
        super(props);
        this.handleCaseDeletion = this.handleCaseDeletion.bind(this);
        this.handleNewCaseCreation = this.handleNewCaseCreation.bind(this);
        this.toggleCreator = this.toggleCreator.bind(this);
    }

    fetchCases(){
        //TODO Not sure if it is any good
        if(this.props.currentProject){
            this.props.getCases(this.props.currentProject);
        }
    }

    componentDidMount() {
        this.fetchCases()
    }

    componentDidUpdate(prevProps) {
        if(prevProps.currentProject !== this.props.currentProject){
            this.fetchCases();
        }
    }

    handleNewCaseCreation(data){
        const projectId = this.props.currentProject;
        this.props.createCase(projectId, data)
        .then(() => {
            this.fetchCases();
        })
        this.toggleCreator()
    }

    handleCaseDeletion(caseId){
        this.props.deleteCase(caseId)
        .then(() => {
            this.fetchCases();
        })
    }

    toggleCreator(){
        this.setState({creatorOpen: !this.state.creatorOpen})
    }

    isCreatorOpen(){
        return this.state.creatorOpen
    }

    render() {

        const { classes } = this.props;
        const tableData = _.map(this.props.cases, caze => ({...caze, ...{stepsCount: caze.steps.length}}))

        return (
            <div className={classes.main}>
                <Creator
                    open={this.isCreatorOpen()}
                    title={'New Entity'}
                    handleClose={this.toggleCreator}
                >
                    <CaseForm
                        submitAction={(data) => { this.handleNewCaseCreation(data) }}
                    />
                </Creator>

                <EnhancedEntityTable
                    loading={this.props.casesLoading}
                    entities={tableData}
                    title={'Test Cases'}
                    addButtonTitle={'New Test Case'}
                    addNew={() => this.toggleCreator()}
                    handleDelete={(element_ids) => {
                        element_ids.forEach(element_id => {
                            this.handleCaseDeletion(element_id)
                        })
                    }}
                    columns={[
                        {key: 'id', label: 'ID', numeric: false},
                        {key: 'title', label: 'Title', numeric: false},
                        {key: 'stepsCount', label: 'Steps Count', numeric: true}
                    ]}
                />
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCases: getCases,
        createCase: createCase,
        deleteCase: deleteCase,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        cases: state.cases,
        currentProject: state.projects.currentProject,
        casesLoading: state.loaders[actionTypes.GET_CASES]
    }
};

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Cases));

