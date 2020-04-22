import React, { Component } from 'react';
import { bindActionCreators } from "redux";
import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";


class Execution extends Component {


    render() {
        return(<div>Foo</div>)
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
    }
};

export default connect(mapStateToProps, matchDispatchToProps)(Execution);