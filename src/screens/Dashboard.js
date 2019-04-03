import React, { Component } from 'react';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography'
import SimpleLineChart from './../containers/SimpleLineChart';

const styles = theme => ({
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
  },
});

class Dashboard extends Component {

  render() {

    const { classes } = this.props;

    return (
      <div className={classes.content}>
        <Typography variant="h4" gutterBottom component="h2">
            Executions
        </Typography>
        <div>
          <SimpleLineChart />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Dashboard);
