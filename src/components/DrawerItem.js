import React, {Component} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withRouter } from "react-router-dom";


class DrawerItem extends Component {

    render() {

        const { path, icon, text, history } = this.props;

        return (
            <ListItem button onClick={() => { history.push(path); }}>
                <ListItemIcon> { icon } </ListItemIcon>
                <ListItemText primary={ text }/>
            </ListItem>
        );
    }
}

export default withRouter(DrawerItem);
