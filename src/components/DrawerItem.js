import React, {Component} from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import {Link} from 'react-router-dom'

class DrawerItem extends Component {

    render() {
        return (
            <Link to={this.props.path} style={{ textDecoration: 'none' }}>
                <ListItem button>
                    <ListItemIcon>
                        {this.props.icon}
                    </ListItemIcon>
                    <ListItemText primary={this.props.text}/>
                </ListItem>
            </Link>
        );
    }
}

export default DrawerItem;
