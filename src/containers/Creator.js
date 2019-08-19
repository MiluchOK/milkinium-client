import React, {Component} from 'react';
import _ from 'lodash';
import Avatar from '@material-ui/core/Avatar';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { withStyles } from '@material-ui/core/styles';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import CaseForm from '../components/CaseForm';


const styles = theme => ({
    root: {
        flexGrow: 1
    },
    avatar: {
        justifyContent: "center",
        backgroundColor: theme.palette.secondary.main
    },
});

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Creator extends Component {

    constructor(props) {
        super(props);
        this.state = {
            open: false,
        };
    }

    render() {

        const { classes } = this.props;
        return (
            <div>
                <Dialog
                    fullWidth={"70%"}
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    transition={Transition}
                    aria-labelledby="form-dialog-title"
                >
                    <DialogTitle id="form-dialog-title">{this.props.title || ""}</DialogTitle>


                    <DialogContent>
                        <Avatar className={classes.avatar}>
                            <AssignmentIcon />
                        </Avatar>
                        {this.props.children}
                    </DialogContent>

                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Creator);
