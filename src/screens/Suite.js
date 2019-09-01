import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import _ from 'lodash';
import {bindActionCreators} from 'redux';
import SuiteForm from '../components/SuiteForm';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import List from '@material-ui/core/List';
import { renderCases } from "../components/ListRenders";
import DescriptionIcon from '@material-ui/icons/Description';
import LoadingIndicator from './../components/LoadingIndicator';
import AddIcon from '@material-ui/icons/Add';
import NoResults from '../components/NoResults';
import {getCases} from '../redux/actions/casesActions';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Creator from '../containers/Creator';
import {getSuite, editSuite} from '../redux/actions/suitesActions';

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
        super(props);
        this.state = {
            creatorOpen: false,
        };
        this.editSuite = this.editSuite.bind(this);
        this.handleAddCase = this.handleAddCase.bind(this);
    }

    handleAddCase() {
        this.setState({creatorOpen: true})
    }

    editSuite(values){
        const suiteId = this.props.match.params.suiteId;
        this.props.editSuite(suiteId, values)
    }

    fetchSuite(id) {
        console.log("Fetching suite");
        return this.props.getSuite(id);
    }

    fetchCases() {
        return this.props.getCases(this.props.currentProject)
    }

    componentDidMount() {
        console.log("Component Did mount");
        this.fetchSuite(this.props.match.params.suiteId);
        this.fetchCases()
    }

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.suiteId;
        const suite = this.props.suites.get(id);
        console.log("Getting by suite id: " + id);

        if(suite) {
            return (
                <div className={classes.root}>

                    <Creator
                        open={this.state.creatorOpen}
                        title={'Add Case To Suite'}
                        handleClose={() => {this.setState({creatorOpen: false})}}
                    >
                        <List component="nav">
                            {renderCases(this.props.cases)}
                        </List>
                    </Creator>

                    <Paper className={classes.root}>
                        <SuiteForm 
                            initialValues={suite.toJS()}
                            submitAction={this.editSuite}
                        />
                        <List>
                            {renderCases(suite.get('cases'))}
                        </List>
                    </Paper>

                    <Button variant="fab"
                            onClick={this.handleAddCase}
                            color="primary"
                            aria-label="add"
                            className={classes.fab}>
                        <AddIcon />
                    </Button>
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
        editSuite: editSuite,
        getCases: getCases
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        suites: state.suites,
        cases: state.cases,
        currentProject: state.projects.get('currentProject')
    }
};

export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Suite);