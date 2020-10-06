import Chip from "@material-ui/core/Chip";
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import CopyIcon from "@material-ui/icons/FileCopy";
import DoneIcon from '@material-ui/icons/Done';
import {truncateUUID} from "../utils";
import React from "react";

const useStyles = makeStyles((theme) => ({
    popoverInnerContainer: {
        padding: theme.spacing(2),
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    },
}));

export default function EnhancedUUID({ uuid, handleClick }) {

    const [anchorEl, setAnchorEl] = React.useState(null);
    const [copied, setCopied] = React.useState(false);
    const classes = useStyles();
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const copyIcon = <CopyIcon onClick={e => {
        navigator.clipboard.writeText(uuid)
        e.stopPropagation()
        setCopied(true)
    }} />

    return (
        <React.Fragment>
            <Chip label={truncateUUID(uuid)}
                  size="small"
                  variant="outlined"
                  onClick={event => {
                      setAnchorEl(event.currentTarget)
                      event.stopPropagation()
                  }}
                  color="secondary"
            >
                {uuid}
            </Chip>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={event => {
                    setAnchorEl(null)
                    event.stopPropagation()
                    setCopied(false)
                }}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'center',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
            >
                <div className={classes.popoverInnerContainer}>
                    {copied ? <DoneIcon /> : copyIcon}
                    <br />
                    <Typography>Copy to clipboard</Typography>
                </div>
            </Popover>
        </React.Fragment>
    )
}