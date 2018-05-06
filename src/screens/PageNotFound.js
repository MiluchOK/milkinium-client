import React, { Component } from 'react';
import NotFoundImage from '../not_found.png';

class PageNotFound extends Component {

    render() {
        return (
            <div>
                <h1>This page is not what you are looking for.</h1>
                <img height='400px' width="400px" src={NotFoundImage} />
            </div>
        );
    }
}

export default PageNotFound;
