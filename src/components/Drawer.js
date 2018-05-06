import React, {Component} from 'react';
import { withStyles } from 'material-ui/styles';
import MatUIDrawer from 'material-ui/Drawer';
import classNames from 'classnames';
import IconButton from 'material-ui/IconButton';
import ChevronLeftIcon from 'material-ui-icons/ChevronLeft';
import ChevronRightIcon from 'material-ui-icons/ChevronRight';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import DrawerItem from './DrawerItem';
import NavBarRoutes from '../routes/navBarRoutes';

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
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
});


class Drawer extends Component {

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
                    <IconButton onClick={this.props.handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </div>

                <List component="nav">
                    {NavBarRoutes.map((nav) => (
                        <DrawerItem
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

export default withStyles(styles, { withTheme: true })(Drawer);
