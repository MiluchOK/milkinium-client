import React, {Component} from 'react';
import {ListItem, ListItemIcon, ListItemText} from 'material-ui/List';
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
