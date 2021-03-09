import {connect} from "react-redux";
import _ from 'lodash';
import { useSelector } from 'react-redux'
import {bindActionCreators} from "redux";
import {addResult, getResults} from "../redux/actions/resultActions";
import React, {useEffect, useState} from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import {Button, Menu, MenuItem} from "@material-ui/core";
import TestStatus from "../components/TestStatus";
import statuses from "../statuses";
import {getRun, getTests, updateRun} from "../redux/actions/runsActions";
import {getCase} from "../redux/actions/casesActions";


const StatusSetter = (props) => {

    const { data, handleSelect } = props
    const [anchorEl, setAnchorEl] = useState(null);
    const loading = !data.results
    const results = data.results || [{status: {label: 'neutral'}}]
    const last_status_label = _.get(results, '[0].status.label', 'pending')

    useEffect(() => {
        props.getResults(props.data.id)
    }, []);

    return(
        <div>
            {
                loading ? <LoadingIndicator size={'small'}/> :
                    <Button onClick={(event) => {
                        event.stopPropagation()
                        setAnchorEl(event.currentTarget)
                    }}>
                        <TestStatus
                            resultLabel={last_status_label}
                            displayName={last_status_label}
                        />
                    </Button>
            }
            <Menu
                keepMounted
                onClose={() => setAnchorEl(null)}
                open={Boolean(anchorEl)}
                anchorEl={anchorEl}
            >
                {Object.keys(statuses).map(status => {
                    return ( <MenuItem
                            key={status}
                            onClick={(event) => {
                                event.stopPropagation()
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

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getResults }, dispatch)
}

export default connect(state => ({results: state.resultsLoading, tests: state.tests}), matchDispatchToProps)(StatusSetter)
