import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import AppBar from '../components/AppBar';
import Drawer from '../components/Drawer';

const styles = theme => ({
  root: {
    flexGrow: 1,
    zIndex: 1,
    // overflow: 'hidden',
    position: 'relative',
    display: 'flex',
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing.unit * 3,
    minHeight: '100vh'
  },
});

class NavBar extends React.Component {
  state = {
    open: true,
  };

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
            open={this.state.open}
            handleDrawerOpen={this.handleDrawerOpen}
            avatarImage={this.props.current_user.avatar}
        />

        <Drawer
            open={this.state.open}
            handleDrawerClose={this.handleDrawerClose}
        />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Grid container>
            {this.props.children}
          </Grid>
        </main>
      </div>
    );
  }
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = (state) => {
  return {current_user: state.current_user}
};

export default compose(
    withStyles(styles, { withTheme: true }),
    connect(mapStateToProps)
)(NavBar);
