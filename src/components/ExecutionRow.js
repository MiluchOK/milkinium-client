import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { Link } from 'react-router-dom';

class ExecutionRow extends Component {

    constructor(props) {
        super(props);
        this.renderLink = this.renderLink.bind(this);
    }

    renderLink(itemProps){
        return <Link style={{ textDecoration: 'none' }} to={`${this.props.to}`} {...itemProps} />;
    }

    render() {

        const handleDelete = this.props.handleDelete;
        let deletion = <div/>;
        if (typeof handleDelete !== 'undefined') {
            deletion = <IconButton onClick={handleDelete}>
                            <DeleteIcon />
                        </IconButton>
        }
        const title = this.props.title;
        const icon = this.props.icon;

        return (
                <ListItem button component={this.renderLink}>

                    <ListItemIcon>
                        {icon}
                    </ListItemIcon>

                    
                    <ListItemText primary={title}/>

                    <ListItemSecondaryAction>
                        {deletion}
                    </ListItemSecondaryAction>
                </ListItem>
        );
    }
}

export default ExecutionRow;
