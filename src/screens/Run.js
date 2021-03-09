import React, { Component, useState } from 'react';
import { bindActionCreators } from "redux";
import actionTypes from '../redux/actions/actionTypes';
import { getTests, getRun, updateRun } from '../redux/actions/runsActions';
import { getCase } from '../redux/actions/casesActions';
import { getResults, addResult } from '../redux/actions/resultActions';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import ListIcon from '@material-ui/icons/List';
import { withRouter } from "react-router-dom";
import StatusSetter from "../containers/StatusSetter";
import _ from 'lodash';
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import CheckIcon from '@material-ui/icons/Check';
import {Typography, LinearProgress, CardContent, Card} from '@material-ui/core';
import LoadingIndicator from "../components/LoadingIndicator";
import EntityTable from "../containers/tables/EntityTable";
import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import {PieChart} from "react-minimal-pie-chart";
import InfoCard from "../components/InfoCard";
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,

    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    attendant: {
        padding: '5%',
        display: 'flex',
        justifyContent: 'space-evenly'
    },
    infoCardsBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    resultHistory: {
        flex: '0 0 45%',
        padding: '20px',
        justifyContent: 'spaceBetween',
        overflowY: 'auto',
        maxHeight: '500px',
        minWidth: '270px'
    },
    quickInfoBox: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    cardTitle: {
        margin: theme.spacing(3)
    },
    actionsFooter: {
        display: 'flex',
        justifyContent: 'center'
    },
    pie: {
        maxWidth: '400px',
    },
    pieCard: {
        margin: '20px'
    },
    infoCard: {
        minWidth: '400px'
    },
    progressIndicator: {
        marginTop: '20px'
    }
});

let EnhancedEntityTable = WithDefaultForEmptiness(EntityTable);


class Run extends Component {

    state = {
        expandedTests: [],
        anchorEl: null
    }

    constructor(props) {
        super(props);
        this.fetchTests = this.fetchTests.bind(this);
        this.currentRunId = this.currentRunId.bind(this);
    }

    currentRunId() {
        return this.props.match.params.executionId
    }

    fetchTests() {
        return this.props.getTests(this.currentRunId())
    }

    fetchRun() {
        return this.props.getRun(this.currentRunId())
    }

    componentDidMount() {
        this.fetchRun()
        this.fetchTests()
    }

    render() {
        const { tests, classes, history } = this.props;
        const run = this.props.runs[this.currentRunId()];

        if (!run) {
            return <LoadingIndicator />
        }

        const tableData =  _.map(tests, test => ({...test, status: <StatusSetter data={test} handleSelect={(status) => {
            //TODO implement the status selection
            console.log(`Selecting ${status}`)
        }} />}))
        console.log({run})
        console.log({tableData})
        const pieData = [
            {status: 'One', value: 10, color: 'red'},
            {status: 'Two', value: 20, color: 'blue'}
        ] // runPieTransformation(run)

        const processedTests = _.filter(tests, test => test.id === 1)

        return(
            <div className={classes.root}>
                <Typography variant="h5">Run: {run.title}</Typography>
                <div className={classes.quickInfoBox}>
                    <div className={classes.pie}>
                        <Card className={classes.pieCard}>
                            <CardContent>
                                <Typography
                                    color="textSecondary"
                                    gutterBottom
                                    variant="h6"
                                >
                                    {'Test results by status'}
                                </Typography>
                                <PieChart data={pieData}
                                          lineWidth={15}
                                          paddingAngle={5}
                                          label={({ dataEntry }) => dataEntry.status}
                                          labelStyle={(index) => ({
                                              fill: pieData[index].color,
                                              fontSize: '5px',
                                              fontFamily: 'sans-serif',
                                          })}
                                />
                            </CardContent>
                        </Card>
                    </div>
                    <div className={classes.infoCardsBox}>
                        <div className={classes.infoCard}>
                            <InfoCard
                                title={'Total tests'}
                                body={Object.keys(tests).length}
                                avatarIcon={<ListIcon />}
                            />
                        </div>
                        <div className={classes.infoCard}>
                            <InfoCard
                                title={'Tests processed'}
                                body={processedTests.length}
                                avatarIcon={<ListIcon />}
                            >
                                <LinearProgress
                                    className={classes.progressIndicator}
                                    value={processedTests * (100 / Object.keys(tests).length)}
                                    variant="determinate"
                                />
                            </InfoCard>
                        </div>
                    </div>
                </div>
                <Card>
                    <EnhancedEntityTable
                        loading={this.props.casesLoading}
                        entities={tableData}
                        title={'Tests'}
                        defaultActions={<Tooltip title={`Complete`}>
                            <IconButton onClick={() => {
                                this.props.updateRun(run.id, {completed: true})
                                .then(() => this.props.history.push('/executions'))
                            }}
                                        className={classes.addButton}
                                        color="primary"
                                        aria-label={`complete`}>
                                <CheckIcon />
                            </IconButton>
                        </Tooltip>}
                        addButtonTitle={'New Test Case'}
                        handleAdd={() => this.toggleCreator()}
                        handleRowClick={(event, entity) => history.push(`/runs/${entity.id}`)}
                        handleMassAction={(element_ids) => {
                            element_ids.forEach(element_id => {
                                this.handleCaseDeletion(element_id)
                            })
                        }}
                        columns={[
                            {key: 'id', label: 'ID', numeric: false},
                            {key: 'title', label: 'Title', numeric: false},
                            {key: 'status', label: 'Status', numeric: false}
                        ]}
                    />
                </Card>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getTests, getRun, getCase, getResults, addResult, updateRun }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        tests: state.tests,
        runs: state. runs,
        cases: state.cases,
        runLoading: state.loaders[actionTypes.GET_RUN]
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, matchDispatchToProps)(withRouter(Run)));
