import React, {Component} from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from '../components/Button';
import Grid from 'material-ui/Grid';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Slide from 'material-ui/transitions/Slide';
import NewTestCaseForm from '../components/NewTestCaseForm';


const styles = theme => ({
    root: {
        flexGrow: 1,
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
                    fullScreen
                    open={this.props.open}
                    onClose={this.props.handleClose}
                    transition={Transition}
                >
                    <div>Create a new test case.</div>
                    <NewTestCaseForm onSubmit={this.props.handleSubmit}>
                        <Button type="submit" color="primary">Save</Button>
                        <Button onClick={this.props.handleClose}>Close the shit</Button>
                    </NewTestCaseForm>
                </Dialog>
            </div>
        )
    }
}

export default withStyles(styles)(Creator);