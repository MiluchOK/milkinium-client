import React, {Component} from 'react';
import List from '@material-ui/core/List';
import {renderExecutions, renderSuites} from "../components/ListRenders";
import WithAddFab from '../containers/WithAddFab';
import {bindActionCreators} from "redux";
import { getRuns, createRun, addCasesToRun } from "../redux/actions/runsActions";
import {connect} from "react-redux";
import Creator from "../containers/Creator";
import RunForm from "../components/forms/RunForm";
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import EntityList from "../containers/EntityList";


class Runs extends Component {

    constructor(props){
        super(props);
        this.handleRunDeletion = this.handleRunDeletion.bind(this);
        this.handleNewRunCreation = this.handleNewRunCreation.bind(this);
    }

    fetchRuns(projectId) {
        return this.props.getRuns(projectId)
    }

    componentDidMount() {
        this.fetchRuns(this.props.currentProject)
    }

    submitAction() {
        console.log("Submit action.")
    }

    handleRunDeletion() {
        console.log("Deleting run.")
    }

    handleNewRunCreation(data){
        const projectId = this.props.currentProject;
        this.props.createRun(projectId, data)
        .then((responseData) => {
            return this.props.addCasesToRun(responseData.action.payload.id, data.selectedCaseIds);
        })
        .then(() => {
            return this.fetchRuns(projectId);
        });
        this.props.closeCreator();
    }

    render() {

        const executions = this.props.runs;
        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

        return (
            <div>
                <Creator
                    open={this.props.creatorOpen}
                    title={'New Run'}
                    handleClose={() => { this.props.closeCreator() }}
                >
                    <RunForm
                        submitAction={(data) => { this.handleNewRunCreation(data) }}
                    />
                </Creator>

                <EnhancedEntityList
                    entities={executions}
                    renderer={renderExecutions}
                />
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRuns: getRuns,
        createRun: createRun,
        addCasesToRun: addCasesToRun
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        runs: state.runs,
        currentProject: state.projects.currentProject
    }
};

export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Runs));


