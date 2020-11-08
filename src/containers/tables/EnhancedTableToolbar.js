import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';

const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },
    highlight:
        theme.palette.type === 'light'
            ? {
                color: theme.palette.secondary.main,
                backgroundColor: lighten(theme.palette.secondary.light, 0.85),
            }
            : {
                color: theme.palette.text.primary,
                backgroundColor: theme.palette.secondary.dark,
            },
    title: {
        flex: '1 1 100%',
    },
    addButton: {

    }
}));

const EnhancedTableToolbar = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, title, massActions, onAdd } = props;
    let { defaultActions } = props;

    defaultActions = defaultActions || <Tooltip title={`Add ${title}`}>
        <IconButton onClick={onAdd} className={classes.addButton} color="primary" aria-label={`Add ${title}`}>
            <AddIcon />
        </IconButton>
    </Tooltip>

    return (
        <Toolbar
            className={clsx(classes.root, {
                [classes.highlight]: numSelected > 0,
            })}
        >
            {numSelected > 0 ? (
                <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
                    {numSelected} selected
                </Typography>
            ) : (
                <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
                    {title}
                </Typography>
            )}

            {numSelected > 0 ? (
                // Something is selected
                massActions.map(action => (
                    <Tooltip title={action.title}>
                        <IconButton aria-label="delete" onClick={action.targetAction}>
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))
            ) : (
                // Nothing is selected
                defaultActions
            )}
        </Toolbar>
    );
};

EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
    massActions: PropTypes.func.isRequired,
    defaultActions: PropTypes.node
};

export default EnhancedTableToolbar