import React, {Component} from 'react';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {makeStyles, withStyles} from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';


const useStyles = makeStyles(theme => ({
    root: {
        paddingLeft: theme.spacing.unit*2,
        paddingRight: theme.spacing.unit*2,
        paddingTop: theme.spacing.unit*4,
        paddingBottom: theme.spacing.unit*4,
    },
    avatar: {
        justifyContent: "center",
        backgroundColor: theme.palette.secondary.main
    },
    title: {
        display: "flex",
        alignItems: "center",
        flexDirection: "column"
    }
}));

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default function Creator(props) {

    const classes = useStyles();
    const { open, handleClose, title } = props

    return (
        <React.Fragment>
            <Dialog
                titleStyle={{textAlign: "center"}}
                fullWidth={"70%"}
                open={open}
                onClose={handleClose}
                transition={Transition}
                aria-labelledby="form-dialog-title"
                className={classes.root}
            >
                <div className={classes.root}>
                    <DialogTitle
                        id="form-dialog-title"
                        className={classes.title}>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            flexDirection: "column"
                        }}>
                            <Avatar className={classes.avatar}>
                                <AssignmentIcon />
                            </Avatar>
                            {title || ""}
                        </div>
                    </DialogTitle>

                    <DialogContent>
                        {props.children}
                    </DialogContent>
                </div>
            </Dialog>
        </React.Fragment>
    )
}
