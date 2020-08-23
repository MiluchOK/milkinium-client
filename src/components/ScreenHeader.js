import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import CardHeader from "@material-ui/core/CardHeader";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    divider: {
        marginBottom: theme.spacing.unit * 2
    },
}))

export default function ScreenHeader(props) {

    const classes = useStyles();
    const { title } = props;

    return <React.Fragment>
        <div>
            <CardHeader title={title} />
        </div>

        <Divider className={classes.divider}/>
    </React.Fragment>
}