import React from "react";
import _ from 'lodash';

export default function WithDefaultForEmptiness(WrappedComponent) {
    class NewComponent extends React.Component {
        render() {
            // const entitiesLen = this.props.entities.length;
            // console.log({entities: this.props.entities, entetiesLen: entitiesLen});
            const image = 'https://res.cloudinary.com/teepublic/image/private/s--PaFhJf03--/t_Preview/b_rgb:fffffe,c_limit,f_jpg,h_630,q_90,w_630/v1556300984/production/designs/4723244_0.jpg'
            if ( _.isEmpty(this.props.entities) ) {
                return <img src={image} />
            } else {
                return <WrappedComponent {...this.props} />
            }
        }
    }

    return (NewComponent);
}