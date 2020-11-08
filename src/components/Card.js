import React, { Component } from 'react';
import {withStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";


const styles = theme => ({
    root: {
        margin: '20px'
    },
    card: {
        padding: '20px'
    }
});


function Card(props){

    const { classes } = props

    return (
        <div className={classes.root}>
            <Paper className={classes.card}>
                {props.children}
            </Paper>
        </div>
    )
}

export default withStyles(styles, {withTheme: true})(Card)
