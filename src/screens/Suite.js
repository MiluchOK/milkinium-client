import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import SuiteForm from '../components/SuiteForm';
import Paper from '@material-ui/core/Paper';
import LoadingIndicator from './../components/LoadingIndicator';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import {getSuite, deleteSuite, editSuite} from '../redux/actions/suitesActions';

const styles = theme => ({
    icon: {
        margin: theme.spacing.unit,
        fontSize: 60,
      },
      root: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        width: '100%',
        padding: '24px'
      },
      title: {
          width: '100%',
          flexBasis: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          display: 'flex',
          marginBottom: '50px'
      },
      fab: {
        position: 'fixed',
        zIndex: 10000,
        bottom: 30,
        right: 20,
    },
});

class Suite extends Component {

    constructor(props) {
        super(props)
        this.editSuite = this.editSuite.bind(this);
    }

    editSuite(values){
        const suiteId = this.props.match.params.suiteId
        this.props.editSuite(suiteId, values)
    }

    fetchSuite(id) {
        return this.props.getSuite(id);
    }

    componentDidMount() {
        this.fetchSuite(this.props.match.params.suiteId)
    }

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.suiteId
        const suite = this.props.suites.get(id)
        console.log("Getting by suite id: " + id)

        if(suite) {
            return (
                <div className={classes.root}>
                    <Paper className={classes.root}>
                        <SuiteForm 
                            initialValues={suite.toJS()}
                            submitAction={this.editSuite}
                        />
                    </Paper>
                </div>
            )
        }
        else {
            return(<LoadingIndicator />)
        }
    }

}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSuite: getSuite,
        editSuite: editSuite
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        suites: state.suites
    }
};

export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Suite);