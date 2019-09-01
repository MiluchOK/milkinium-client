import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from 'redux';
import compose from 'recompose/compose';
import List from '@material-ui/core/List';
import { renderSuites } from "../components/ListRenders";
import AddIcon from '@material-ui/icons/Add';
import SuiteForm from '../components/SuiteForm';
import {getSuites, createSuite, deleteSuite} from '../redux/actions/suitesActions';
import Creator from '../containers/Creator';

const styles = theme => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        flexGrow: 1,
    },

    fab: {
        position: 'fixed',
        zIndex: 10000,
        bottom: 30,
        right: 20,
    },
});

class Suites extends Component {

    constructor(props) {
        super(props);

        this.state = {
            creatorOpen: false,
        };
        this.handleAddSuite = this.handleAddSuite.bind(this);
        this.handleSuiteDeletion = this.handleSuiteDeletion.bind(this);
        this.handleNewSuiteCreation = this.handleNewSuiteCreation.bind(this);
    }

    handleAddSuite() {
        this.setState({creatorOpen: true})
    }

    fetchSuites(){
        //TODO Not sure if it is any good
        if(this.props.currentProject){
            this.props.getSuites(this.props.currentProject);
        }
    }

    componentDidMount() {
        this.fetchSuites()
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentProject !== this.props.currentProject){
            this.fetchSuites();
        }
    }

    handleNewSuiteCreation(data){
        const projectId = this.props.currentProject;
        this.props.createSuite(projectId, data)
            .then((data) => {
                this.fetchSuites();
                this.setState({creatorOpen: false})
            })
    }

    handleSuiteDeletion(caseId){
        this.props.deleteSuite(caseId)
            .then((data) => {
                this.fetchSuites();
            })
    }

    render() {
        const {classes, theme} = this.props;
        return (

            <div className={classes.root}>

                <Creator
                    open={this.state.creatorOpen}
                    title={'New Suite'}
                    handleClose={() => {this.setState({creatorOpen: false})}}
                >
                    <SuiteForm 
                            submitAction={(data) => {this.handleNewSuiteCreation(data)}}
                    />
                </Creator>

                <div>
                    <List>
                        { renderSuites(this.props.suites, this.handleSuiteDeletion) }
                    </List>

                    <Button variant="fab"
                            onClick={this.handleAddSuite}
                            color="primary"
                            aria-label="add"
                            className={classes.fab}>
                        <AddIcon />
                    </Button>
                </div>
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getSuites: getSuites,
        createSuite: createSuite,
        deleteSuite: deleteSuite,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        suites: state.suites,
        currentProject: state.projects.get('currentProject')
    }
};


export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Suites);
