import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import LoadingIndicator from "../components/LoadingIndicator";
import _ from 'lodash';

const useStyles = makeStyles({
    container: {
        display: 'flex',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        objectFit: 'contain'
    }
});

export default function WithDefaultForEmptiness(WrappedComponent) {
    return function NewComponent (props) {
        const classes = useStyles()
        const image = 'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
        if( props.loading ) {
            return (
                <div className={classes.container}>
                    <LoadingIndicator />
                </div>
            )
        }

        if ( _.isEmpty(props.entities) ) {
            return (
                <div className={classes.container}>
                    <img src={image} className={classes.item}/>
                </div>
            )
        } else {
            return <WrappedComponent {...props} />
        }
    }
}