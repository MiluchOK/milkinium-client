import React, {Component} from 'react';
import List from '@material-ui/core/List';
import { renderExecutions } from "../components/ListRenders";
import WithAddFab from '../containers/WithAddFab';
import {bindActionCreators} from "redux";
import { createRun } from "../redux/actions/runsActions";
import { getRuns } from "../redux/actions/runsActions";
import {connect} from "react-redux";
import Creator from "../containers/Creator";


class Executions extends Component {

    constructor(props){
        super(props);
        this.handleRunDeletion = this.handleRunDeletion.bind(this);
        this.handleNewRunCreation = this.handleNewRunCreation.bind(this);
    }

    fetchExecutions(projectId) {
        return this.props.getRuns(projectId)
    }

    componentDidMount() {
        this.fetchExecutions(this.props.currentProject)
    }

    submitAction() {
        console.log("Submit action.")
    }

    handleRunDeletion() {
        console.log("Deleting run.")
    }

    handleNewRunCreation(data){
        console.log(`Creating new run. ${data}`)
    }

    render() {

        const executions = this.props.runs;

        return (
            <div>
                <Creator
                    open={this.props.creatorOpen}
                    title={'New Run'}
                    handleClose={() => { this.props.closeCreator() }}
                >
                    <div></div>
                </Creator>
                <div>
                    <List component="nav">
                        {renderExecutions(executions, this.handleRunDeletion)}
                    </List>
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRuns: getRuns,
        createRun: createRun,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        runs: state.runs,
        currentProject: state.projects.get('currentProject')
    }
};

export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Executions));


