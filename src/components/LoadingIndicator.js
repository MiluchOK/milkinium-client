import React from 'react';
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';

function LoadingIndicator(props) {

    const sizes = {
        small: 20,
        medium: 40,
        large: 80
    }


    const size = sizes[props.size]

    return(
        <CircularProgress size={size} />
    )
}

LoadingIndicator.propTypes = {
    size: PropTypes.number
};

LoadingIndicator.defaultProps = {
    size: 'medium'
}


export default LoadingIndicator;