import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import MailIcon from '@material-ui/icons/Mail';
import AddIcon from '@material-ui/icons/Add';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FolderIcon from '@material-ui/icons/Folder';
import DeleteIcon from '@material-ui/icons/Delete';
import {Switch, Route} from 'react-router-dom';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";

const styles = theme => ({
    root: {
        width: '100%',
        backgroundColor: 'white',
    },
});

class Feed extends Component {

  render() {
    const stuff = [1,2,3,4,5,6,7]

    return (
        <List component="nav" aria-label="main mailbox folders" className={this.props.classes.root}>
            {stuff.map(s => (
                <ListItem>
                    <ListItemAvatar>
                        <Avatar>
                            <FolderIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary="Single-line item"
                        secondary={'secondary' ? 'Secondary text' : null}
                    />
                    <div>
                        <Badge badgeContent={4} color="primary">
                            <MailIcon fontSize="small" />
                        </Badge>
                    </div>
                    <ListItemSecondaryAction>
                        <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            ))}
        </List>
    );
  }
}

export default withStyles(styles)(Feed);
