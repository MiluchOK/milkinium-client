import React from "react";
import _ from 'lodash';

export default function WithDefaultForEmptiness(WrappedComponent) {
    class NewComponent extends React.Component {
        render() {
            // const image = 'https://res.cloudinary.com/teepublic/image/private/s--PaFhJf03--/t_Preview/b_rgb:fffffe,c_limit,f_jpg,h_630,q_90,w_630/v1556300984/production/designs/4723244_0.jpg'
            const image = 'https://i.pinimg.com/originals/ae/8a/c2/ae8ac2fa217d23aadcc913989fcc34a2.png'
            if ( _.isEmpty(this.props.entities) ) {
                return <img src={image} style={{width: '100%'}}/>
            } else {
                return <WrappedComponent {...this.props} />
            }
        }
    }

    return (NewComponent);
}