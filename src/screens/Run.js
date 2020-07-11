import React, { Component, useState } from 'react';
import { bindActionCreators } from "redux";
import { getTests, getRun, } from '../redux/actions/runsActions';
import { getCase } from '../redux/actions/casesActions';
import { getResults, addResult } from '../redux/actions/resultActions';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import _ from 'lodash';
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import Paper from '@material-ui/core/Paper';
import EntityList from "../containers/EntityList";
import statuses from "../statuses.json";
import {Button, Menu, MenuItem} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import LoadingIndicator from "../components/LoadingIndicator";
import Avatar from "@material-ui/core/Avatar";
import TestStatus from "../components/TestStatus";

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
        flexWrap: 'wrap',
    },
    resultHistory: {
        flexGrow: 1,
        margin: '10px',
        overflowY: 'auto',
        maxHeight: '400px',
        minWidth: '270px'
    }
});

const StatusSetter = ({data, handleSelect}) => {
    const [anchorEl, setAnchorEl] = useState(null);


    const results = data.results || [{status: {label: 'neutral'}}]
    const last_status_label = _.get(results, '[0].status.label', 'pending')

    return(
        <div>
            <Button onClick={(event) => {
                setAnchorEl(event.currentTarget)
            }}>
                <TestStatus
                    resultLabel={last_status_label}
                    displayName={last_status_label}
                />
            </Button>
            <Menu
                keepMounted
                onClose={() => {
                    setAnchorEl(null)
                }}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
            >
                {statuses.map(status => {
                    return ( <MenuItem
                            onClick={() => {
                                setAnchorEl(null)
                                handleSelect(status)
                            }}
                    >
                        {status}
                    </MenuItem>
                    )
                })}
            </Menu>
        </div>
    )
}

class Run extends Component {

    state = {
        expandedTests: [],
        anchorEl: null
    }

    constructor(props) {
        super(props);
        this.fetchTests = this.fetchTests.bind(this);
        this.currentRunId = this.currentRunId.bind(this);
        this.fetchResults = this.fetchResults.bind(this);
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

    fetchResults(tests) {
        tests.forEach(test => this.props.getResults(test.id))
    }

    componentDidMount() {
        this.fetchRun()
        this.fetchTests()
        .then(result => {
            this.fetchResults(result.action.payload.tests)
        })
    }

    isTestExpanded(testId){
        return this.state.expandedTests.includes(testId)
    }

    renderAttendant(test) {

        const { classes } = this.props

        if ( !('results' in test) ) {
            return null
        }

        const steps = _.get(this.props.cases, [test.case, 'steps'], [])

        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);
        return (
            <Collapse in={this.isTestExpanded(test.id)} timeout="auto" unmountOnExit>
                <div className={classes.attendant}>
                    <Paper
                        className={classes.resultHistory}
                        elevation={5}
                    >
                        <Typography variant={'h5'}>Steps</Typography>
                        <EnhancedEntityList
                            entities={ steps }
                            title={ step => step.body }
                            id={ step => step.id }
                            clickHandler={ step => console.log(`Clicked: ${step}`) }
                            mainItemRenderer={ step => null }
                            secondaryActionRenderer={ step => null }
                        />
                    </Paper>
                    <Paper
                        className={classes.resultHistory}
                        elevation={5}
                    >
                        <Typography variant={'h5'}> History </Typography>
                        <EnhancedEntityList
                            entities={ test.results }
                            title={ result => 'set status to' }
                            id={ result => result.id }
                            clickHandler={ result => { console.log(result) } }
                            mainItemRenderer={ result => <Avatar /> }
                            secondaryActionRenderer={ result => (
                                <TestStatus
                                    resultLabel={result.status.label}
                                    displayName={result.status.label}
                                />
                            )}
                        />
                    </Paper>
                    <Paper>

                    </Paper>
                </div>
            </Collapse>
        )
    }

    onTestClick(test){
        if(this.state.expandedTests.includes(test.id)){
            this.setState({expandedTests: this.state.expandedTests.filter(t => t !== test.id)})
        } else {
            this.setState({expandedTests: [...this.state.expandedTests, test.id]})
            this.props.getCase(test.case)
        }
    }

    render() {

        const { tests, classes } = this.props;
        const run = this.props.runs[this.currentRunId()];
        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

        if(run) {
            return(
                <div className={classes.root}>
                    <Typography variant="h5">Run {run.title}</Typography>

                    <EnhancedEntityList
                        entities={ _.map(tests, t => t ) }
                        title={ test => test.title }
                        id={ test => test.id }
                        clickHandler={ (test) => { this.onTestClick(test) } }
                        mainItemRenderer={ test => this.isTestExpanded(test.id) ? <ExpandLess /> : <ExpandMore /> }
                        secondaryActionRenderer={ test => <StatusSetter
                                                                data={test}
                                                                handleSelect={(status) => {
                                                                    this.props.addResult(test.id, {
                                                                        test_id: test.id,
                                                                        status: {
                                                                            label: status
                                                                        }
                                                                    })
                                                                    .then(() => {
                                                                        return this.props.getResults(test.id)
                                                                    })
                                                                }}
                                                            />}
                        attendant={ (test) => this.renderAttendant(test) }
                    />
                </div>
            )
        } else {
            return(<LoadingIndicator />)
        }
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getTests: getTests,
        getRun: getRun,
        getCase: getCase,
        getResults: getResults,
        addResult: addResult
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        tests: state.tests,
        runs: state. runs,
        cases: state.cases
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, matchDispatchToProps)(Run));