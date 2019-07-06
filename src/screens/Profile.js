import React, { Component } from 'react';
import { connect } from 'react-redux';
import MiddleBox from './../components/MiddleBox';
import { withStyles } from '@material-ui/core/styles';

class Profile extends Component {

    render() {

        console.log(this.props.current_user);

        return (
            <MiddleBox>
                <div>
                    <div>
                        Email: {this.props.current_user.get("email") || "John Doe"}
                    </div>
                    <div>
                        Name: {this.props.current_user.get("name") || "John Doe"}
                    </div>
                </div>
            </MiddleBox>
        );
    }
}

const mapStateToProps = (state) => {
    return { current_user: state.current_user };
};

export default connect(mapStateToProps)(Profile);
