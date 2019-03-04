import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';

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
