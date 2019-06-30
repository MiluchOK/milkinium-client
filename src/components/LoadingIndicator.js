import React, {Component} from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

class LoadingIndicator extends Component {

    render() {
        
        return(
            <div>
                <CircularProgress  />
            </div>
        )
    }
}

export default LoadingIndicator;