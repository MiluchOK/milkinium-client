import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

export default function WithDelete(WrappedComponent) {
    return class NewComponent extends React.Component {
        constructor(props) {
            super(props);
        }

        render() {
            return (
                <div>
                    <WrappedComponent
                        {...this.props}
                    />
                </div>
            )
        }
    }
}
