import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import {connect} from 'react-redux';
import List from 'material-ui/List';
import Grid from 'material-ui/Grid';
import Execution from './../components/ExecutionRow';
import InboxIcon from 'material-ui-icons/Inbox';

class Executions extends Component {

    getExecutions() {
        return [{_id: 1}, {_id: 2}, {_id: 3}]
    }

    render() {

        const executions = this.getExecutions();

        return (
            <Grid style={{flex: 1}}>
                <List component="nav">
                    {executions.map((e => (
                        <Execution
                            key={e._id}
                            title={e._id}
                            icon={<InboxIcon/>}
                        />
                    )))}
                </List>
            </Grid>
        );
    }
}

export default Executions;
