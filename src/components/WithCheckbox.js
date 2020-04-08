import React from "react";
import Checkbox from '@material-ui/core/Checkbox';

export default function WithCheckbox(WrappedComponent) {
    return class NewComponent extends React.Component {
        constructor(props) {
            super(props);
            // this.state = {
            //     checked: false
            // }
        }

        render() {
            return (
                <div>
                    <WrappedComponent
                        icon={<Checkbox
                            checked={this.props.checked}
                            onChange={this.props.handleChange}
                        />}
                        {...this.props}
                    />
                </div>
            )
        }
    }
}
