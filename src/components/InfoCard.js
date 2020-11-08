import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withStyles} from "@material-ui/core/styles";
import { Typography, Avatar, Card, colors} from "@material-ui/core";

const styles = theme => ({
    card: {
        padding: '20px',
        margin: '20px'
    },
    root: {
        display: 'flex',
        justifyContent: 'space-between'
    },
    avatar: {
        backgroundColor: colors.green[600],
        height: 56,
        width: 56
    },
});

function InfoCard(props){

    const { title, body, avatarIcon, classes } = props

    return (
        <Card className={classes.card}>
            <div className={classes.root}>
                <div>
                    <Typography
                        color="textSecondary"
                        gutterBottom
                        variant="h6"
                    >
                        {title}
                    </Typography>
                    <Typography
                        color="textPrimary"
                        variant="h3"
                    >
                        {body}
                    </Typography>
                </div>
                <div>
                    <Avatar className={classes.avatar}>
                        {avatarIcon}
                    </Avatar>
                </div>
            </div>
            {props.children}
        </Card>
    )
}

InfoCard.propTypes = {
    title: PropTypes.string,
    body: PropTypes.string,
    avatarIcon: PropTypes.node
};


export default withStyles(styles, {withTheme: true})(InfoCard)
