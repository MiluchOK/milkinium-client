import React, { Component } from 'react';
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

export default function WithAddFab(WrappedComponent) {
    class NewComponent extends React.Component {
        constructor(props) {
            super(props);
            this.state = {
                creatorOpen: false,
            };
            this.closeCreator = this.closeCreator.bind(this);
            this.openCreator = this.openCreator.bind(this);
        }

        closeCreator() {
            this.setState({creatorOpen: false})
        }

        openCreator() {
            this.setState({creatorOpen: true})
        }

        render() {

            const { classes } = this.props;
            const newProps = {
                creatorOpen: this.state.creatorOpen,
                closeCreator: this.closeCreator
            };

            return (
                <div className={classes.root}>
                    <WrappedComponent {...this.props} {...newProps}/>
                    <Fab color="primary"
                         aria-label="add"
                         className={classes.fab}
                         onClick={this.openCreator}
                    >
                        <AddIcon />
                    </Fab>
                </div>
            )
        }
    }

    return withStyles(styles, {withTheme: true})(NewComponent);
}

