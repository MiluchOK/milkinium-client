import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import MatUIDrawer from '@material-ui/core/Drawer';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { withRouter } from "react-router";
import logo from '../public/AH_Black.png';
import List from '@material-ui/core/List';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import DrawerItem from './DrawerItem';
import NavBarRoutes from '../routes/navBarRoutes';
import { Typography } from '@material-ui/core';

const drawerWidth = 240;

const styles = theme => ({
    drawerPaper: {
        position: 'relative',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbar: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flexStart',
        position: 'relative',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    logoImage: {
        flex: '0 1 auto',
        position: 'absolute',
        left: '50%',
        transform: 'translateX(-50%)',
        height: '50px',
        width: '50px'
    },
    closeIcon: {
        flex: '0 1 auto',
        marginLeft: 'auto'
    }
});


class Drawer extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { classes, theme } = this.props;

        return (
            <MatUIDrawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !this.props.open && classes.drawerPaperClose),
                }}
                open={this.props.open}
            >
                <div className={classes.toolbar}>
                    <img src={logo} alt={`${this.props.title}'s picture`}  className={classes.logoImage} />
                    <IconButton onClick={this.props.handleDrawerClose} className={classes.closeIcon}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <List component="nav">
                    {NavBarRoutes.map((nav) => (
                        <DrawerItem
                            selected={this.props.location.pathname === nav.path}
                            key={nav.name}
                            text={nav.name}
                            icon={nav.icon}
                            path={nav.path}
                        />
                    ))}
                </List>

            </MatUIDrawer>
        );
    }
}

export default withStyles(styles, { withTheme: true })(withRouter(Drawer));
