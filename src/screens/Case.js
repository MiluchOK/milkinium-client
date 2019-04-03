import React, { Component } from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import Immutable from 'immutable';
import Typography from '@material-ui/core/Typography';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {getCase, deleteCase} from '../redux/actions/casesActions';

const styles = theme => ({

});

const defaultCaze = {title: "Unknown"}

class Case extends Component {

    componentDidMount(){
        this.fetchCase(this.props.match.params.caseId)
    }

    fetchCase(id){
        return this.props.getCase(id);
    }

    render(){
        const id = this.props.match.params.caseId
        console.log(this.props.cases)
        const caze = this.props.cases.get(id) || defaultCaze
        console.log("Render is called")
        console.log(caze)
        const title = caze.title

        return (
            <div>
                <h1>Foo</h1>
                <Typography
                  color="secondary"
                  variant="h4"
                >
                  {title}
                </Typography>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCase: getCase
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        cases: state.cases.get('casesById')
    }
};


export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Case);
