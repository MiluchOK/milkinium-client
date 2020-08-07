import React, {Component} from 'react';
import WithAddFab from '../containers/WithAddFab';
import { PieChart } from 'react-minimal-pie-chart';
import { bindActionCreators } from "redux";
import { getRuns, createRun, addCasesToRun } from "../redux/actions/runsActions";
import { connect } from "react-redux";
import Creator from "../containers/Creator";
import statuses from "../statuses.json";
import RunForm from "../components/forms/RunForm";
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import DoneIcon from '@material-ui/icons/Done';
import EntityList from "../containers/EntityList";
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";


class Runs extends Component {

    constructor(props) {
        super(props);
        this.handleNewRunCreation = this.handleNewRunCreation.bind(this);
    }

    fetchRuns(projectId) {
        return this.props.getRuns(projectId)
    }

    componentDidMount() {
        this.fetchRuns(this.props.currentProject)
    }

    renderSecondaryActionComponent(runId){
        return (<IconButton onClick={() => { this.handleRunDeletion(runId)} }>
            <DeleteIcon />
        </IconButton>)
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

    renderPie(execution){
        console.log({e: execution})
        const data = Object.keys(execution.byStatus).map((k) => ({title: k, value: execution.byStatus[k], color: statuses[k]['color']}))
        console.log({d: data})
        return <PieChart data={data} style={{ height: '24px', width: '24px' }} />
    }

    render() {

        let executions = Object.values(this.props.runs);
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
                    entities={ executions.sort((a, b) => a.completed ? 1 : -1) }
                    title={ execution => execution.title }
                    id={ execution => execution.id }
                    clickHandler={ execution => this.props.history.push(`/executions/${execution.id}`) }
                    mainItemRenderer={ execution => <DescriptionIcon /> }
                    secondaryActionRenderer={ execution => execution.completed ? <DoneIcon /> : this.renderPie(execution) }
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


