import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

class ExecutionRow extends Component {

    renderLink = itemProps => <Link style={{ textDecoration: 'none' }} to={`${this.props.to}`} {...itemProps} />

    render() {

        const handleDelete = this.props.handleDelete;
        const title = this.props.title;
        const icon = this.props.icon;

        return (
                <ListItem button component={this.renderLink}>

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
