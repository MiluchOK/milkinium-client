import { withStyles } from "@material-ui/core/styles";
import StatusBullet from "./StatusBullet";
import React from "react";

const styles = theme => ({
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
});

const statusColors = {
    pass: 'success',
    fail: 'danger',
    progress: 'warning',
    pending: 'info'
};

const TestStatus = ({classes, resultLabel, displayName}) => {
    return(
        <div className={classes.statusContainer}>
            <StatusBullet
                className={classes.status}
                color={statusColors[resultLabel]}
                size="sm"
            />
            {displayName}
        </div>
    )
}

export default withStyles(styles)(TestStatus);
