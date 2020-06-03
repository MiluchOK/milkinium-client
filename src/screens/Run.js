import React, { Component, useState } from 'react';
import { bindActionCreators } from "redux";
import { getTests, getRun, } from '../redux/actions/runsActions';
import { getResults, addResult } from '../redux/actions/resultActions';
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { green, red } from '@material-ui/core/colors';
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import EntityList from "../containers/EntityList";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import {Button, Menu, MenuItem} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import HelpIcon from '@material-ui/icons/Help';
import AlarmOnIcon from '@material-ui/icons/AlarmOn';
import Typography from '@material-ui/core/Typography';
import Collapse from '@material-ui/core/Collapse';
import LoadingIndicator from "../components/LoadingIndicator";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    }
});

const defineStatusIcon = (data) => {
    //TODO move to utils?
    const test = data
    const results = test.results;
    let targetIcon;

    if ( results && results.length > 0 ){
        const last_result = results[results.length-1]
        if( last_result.status.label === 'Pass' ){
            targetIcon = <CheckCircleIcon style={{ color: green[500] }} />
        } else if ( last_result.status.label === 'Fail' ) {
            targetIcon = <ErrorIcon style={{ color: red[500] }} />
        } else {
            targetIcon = <HelpIcon />
        }

    } else {
        return <AlarmOnIcon />
    }

    return targetIcon
}


const StatusSetter = ({data, handleSelect}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const statuses = ['Pass', 'Fail', 'Pending']

    return(
        <div>
            <Button onClick={(event) => {
                setAnchorEl(event.currentTarget)
            }}>
                {defineStatusIcon(data)}
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

    renderAttendant(test) {
        return (
            <Collapse in={this.state.expandedTests.includes(test.id)} timeout="auto" unmountOnExit>
                <div>

                </div>
            </Collapse>
        )
    }

    onTestClick(test){
        if(this.state.expandedTests.includes(test.id)){
            this.setState({expandedTests: this.state.expandedTests.filter(t => t !== test.id)})
        } else {
            this.setState({expandedTests: [...this.state.expandedTests, test.id]})
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
                        entities={ tests }
                        title={ test => test.title }
                        id={ test => test.id }
                        clickHandler={ (test) => { this.onTestClick(test) } }
                        mainItemRenderer={ test => null }
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
        getResults: getResults,
        addResult: addResult
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        tests: state.tests,
        runs: state. runs,
    }
};

export default withStyles(styles, {withTheme: true})(connect(mapStateToProps, matchDispatchToProps)(Run));