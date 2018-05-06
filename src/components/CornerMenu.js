import React, { Component } from 'react';
import Menu, { MenuItem } from 'material-ui/Menu';
import { Link } from 'react-router-dom';
import { withRouter } from "react-router-dom";
import authClient from '../clients/authClient';

class CornerMenu extends Component {

    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        authClient.logOut()
            .then(() => {
                this.props.history.push('/');
        })
    }

    render() {

        return (
            <Menu
                id="simple-menu"
                anchorEl={this.props.anchorEl}
                open={Boolean(this.props.anchorEl)}
                onClose={this.props.handleClose}
            >

                <MenuItem>
                    <Link to="/profile" style={{ textDecoration: 'none' }}>
                        Profile
                    </Link>
                </MenuItem>
                <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
            </Menu>
        );
    }
}


export default withRouter(CornerMenu);
