import React from 'react';
import PropTypes from 'prop-types';
import statuses from "../statuses.js";
import clsx from 'clsx';
import {withStyles} from "@material-ui/core/styles";

const useStyles = theme => {
    const main = {
        root: {
            display: 'inline-block',
            borderRadius: '50%',
            flexGrow: 0,
            flexShrink: 0
        },
        sm: {
            height: theme.spacing(1),
            width: theme.spacing(1)
        },
        md: {
            height: theme.spacing(2),
            width: theme.spacing(2)
        },
        lg: {
            height: theme.spacing(3),
            width: theme.spacing(3)
        },
    }
    return {...main, ...statuses}
};

const StatusBullet = props => {
    const { className, classes, size, color, ...rest } = props;
    return (
        <span
            {...rest}
            className={clsx(
                {
                    [classes.root]: true,
                    [classes[size]]: size,
                    [classes[color]]: color
                },
                className
            )}
        />
    );
};

StatusBullet.propTypes = {
    className: PropTypes.string,
    color: PropTypes.oneOf(Object.keys(statuses)),
    size: PropTypes.oneOf(['sm', 'md', 'lg'])
};

StatusBullet.defaultProps = {
    size: 'md',
    color: 'default'
};

export default withStyles(useStyles)(StatusBullet);

