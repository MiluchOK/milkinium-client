import React, {Component} from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import {withStyles} from "@material-ui/core";

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },

    fab: {
        position: 'fixed',
        zIndex: 10000,
        bottom: 30,
        right: 20,
    },
});

class EntetyList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes, handleAddEntity } = this.props;
        return (

            <div className={classes.root}>
                {this.props.children}
                <Fab color="primary"
                     aria-label="add"
                     className={classes.fab}
                     onClick={handleAddEntity}
                >
                    <AddIcon />
                </Fab>
            </div>
        );
    }
}

export default withStyles(styles, {withTheme: true})(EntetyList);