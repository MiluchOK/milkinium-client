import React, {Component} from 'react';
import _ from 'lodash';
import { PieChart } from 'react-minimal-pie-chart';
import { bindActionCreators } from "redux";
import actionTypes from '../redux/actions/actionTypes';
import { getRuns, createRun, addCasesToRun, updateRun } from "../redux/actions/runsActions";
import { connect } from "react-redux";
import Creator from "../containers/Creator";
import statuses from "../statuses.js";
import RunForm from "../components/forms/RunForm";
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import EntityTable from "../containers/tables/EntityTable";
import DoneIcon from '@material-ui/icons/Done';
import ScreenHeader from "../components/ScreenHeader";
import EnhancedUUID from "../components/EnhancedUUID";
import {withStyles} from "@material-ui/core/styles";
import {runPieTransformation} from "../utils";

let EnhancedEntityTable = WithDefaultForEmptiness(EntityTable);

const styles = theme => ({
    main: {
        flexGrow: 1
    }
});

class Runs extends Component {

    state = {
        creatorOpen: false
    }

    constructor(props) {
        super(props);
        this.handleNewRunCreation = this.handleNewRunCreation.bind(this);
    }

    fetchRuns(projectId) {
        return this.props.getRuns(projectId)
    }

    toggleCreator = () => {
        this.setState({creatorOpen: !this.state.creatorOpen})
    }

    componentDidMount() {
        this.fetchRuns(this.props.currentProject)
    }

    handleNewRunCreation(data){
        const projectId = this.props.currentProject;
        return this.props.createRun(projectId, data)
        .then((responseData) => {
            return this.props.addCasesToRun(responseData.action.payload.id, data.selectedCaseIds);
        })
        .then(() => {
            return this.fetchRuns(projectId);
        })
        .then(() => {
            this.toggleCreator();
        })
    }

    handleRunCompletion(runId){
        return this.props.updateRun(runId, { completed: true }).then(() => this.fetchRuns(this.props.currentProject))
    }

    renderPie(execution){
        // const data = Object.keys(execution.byStatus).map((k) => ({title: k, value: execution.byStatus[k], color: statuses[k]['color']}))
        const data = runPieTransformation(execution)
        return <PieChart data={data} style={{ height: '24px', width: '24px' }} />
    }

    render() {

        const { classes, history } = this.props

        const tableData = _.map(this.props.runs, run => ({...run, ...{
            id: run.id,
            testsCount: run.tests.length,
            status: this.renderPie(run),
            completed: run.completed ? <DoneIcon /> : null
        }}))

        console.log({tableData})

        return (
            <div className={classes.main}>
                <Creator
                    open={this.state.creatorOpen}
                    title={'New Run'}
                    handleClose={this.toggleCreator}
                >
                    <RunForm
                        submitAction={(data) => this.handleNewRunCreation(data)}
                    />
                </Creator>

                <ScreenHeader title={'Test Runs'}/>
                <EnhancedEntityTable
                    handleRowClick={(event, entity) => history.push(`/executions/${entity.id}`)}
                    loading={this.props.runsLoading}
                    entities={tableData}
                    title={'Test Runs'}
                    addButtonTitle={'New Test Run'}
                    handleAdd={() => this.toggleCreator()}
                    massActions={[
                        {
                            icon: <DoneIcon />,
                            title: 'CompleteRun',
                            targetAction: (ids) => ids.forEach((id) => this.handleRunCompletion(id))
                        }
                    ]}
                    columns={[
                        {key: 'id', label: 'ID', numeric: false, sorter: 'id'},
                        {key: 'title', label: 'Title', numeric: false, sorter: 'title'},
                        {key: 'testsCount', label: 'Tests Count', numeric: true, sorter: 'testsCount'},
                        {key: 'status', label: 'Status', numeric: false, sorter: 'completed'},
                        {key: 'completed', label: 'Completed', numeric: false, sorter: 'completed'},
                    ]}
                />
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getRuns,
        createRun,
        addCasesToRun,
        updateRun,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        runs: state.runs,
        currentProject: state.projects.currentProject,
        runsLoading: state.loaders[actionTypes.GET_RUNS]
    }
};

export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Runs));


