import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../redux/actions/actionTypes';
import RunForm from '../components/forms/RunForm';
import { getSuites, createSuite, deleteSuite } from '../redux/actions/suitesActions';
import Creator from '../containers/Creator';
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import ScreenHeader from "../components/ScreenHeader";
import EntityTable from "../containers/tables/EntityTable";
import {withStyles} from "@material-ui/core/styles";

let EnhancedEntityTable = WithDefaultForEmptiness(EntityTable);

const styles = theme => ({
    main: {
        flexGrow: 1
    }
});

class Suites extends Component {

    state = {
        creatorOpen: false
    }

    constructor(props) {
        super(props);
        this.handleSuiteDeletion = this.handleSuiteDeletion.bind(this);
        this.handleNewSuiteCreation = this.handleNewSuiteCreation.bind(this);
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
        return this.props.createSuite(projectId, {title: data.title, cases: data.selectedCaseIds})
    }

    toggleCreator = () => {
        this.setState({creatorOpen: !this.state.creatorOpen})
    }

    handleSuiteDeletion(suiteId){
        this.props.deleteSuite(suiteId)
        .then((data) => {
            this.fetchSuites();
        })
    }

    render() {

        const tableData = _.map(this.props.suites, suite => ({...suite, ...{casesCount: suite.cases.length}}))
        const { classes, history } = this.props

        return (
            <div className={classes.main}>
                <Creator
                    open={this.state.creatorOpen}
                    title={'New Suite'}
                    handleClose={this.toggleCreator}
                >
                    <RunForm
                        submitAction={(data) => {
                            return this.handleNewSuiteCreation(data)
                            .then(() => {
                                this.toggleCreator()
                                return this.fetchSuites();
                            })
                        }}
                    />
                </Creator>
                <ScreenHeader title={'Test Suites'}/>
                <EnhancedEntityTable
                    loading={this.props.suitesLoading}
                    entities={tableData}
                    title={'Test Suites'}
                    addButtonTitle={'New Test Suite'}
                    handleAdd={() => this.toggleCreator()}
                    handleRowClick={(event, entity) => history.push(`/suites/${entity.id}`)}
                    handleDelete={(elementIds) => {
                        console.log({elementIds: elementIds})
                        elementIds.forEach(elementId => {
                            this.handleSuiteDeletion(elementId)
                        })
                    }}
                    columns={[
                        {key: 'id', label: 'ID', numeric: false},
                        {key: 'title', label: 'Title', numeric: false},
                        {key: 'casesCount', label: 'Cases Count', numeric: true}
                    ]}
                />
            </div>
        );
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getSuites, createSuite, deleteSuite }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        suites: state.suites,
        currentProject: state.projects.currentProject,
        suitesLoading: state.loaders[actionTypes.GET_SUITES]
    }
};


export default withStyles(styles)(connect(mapStateToProps, matchDispatchToProps)(Suites));
