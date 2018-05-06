import React, {Component} from 'react';
import {ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui-icons/Delete';

class ExecutionRow extends Component {

    render() {

        const handleDelete = this.props.handleDelete;
        const title = this.props.title;
        const icon = this.props.icon;
        // const itemId = this.props.itemId;

        return (
            <ListItem button>
                <ListItemIcon>
                    {icon}
                </ListItemIcon>
                <ListItemText primary={title}/>

                <ListItemSecondaryAction>
                    <IconButton onClick={handleDelete}>
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        );
    }
}

export default ExecutionRow;
