import React, {Component} from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import actionTypes from '../redux/actions/actionTypes';
import WithAddFab from '../containers/WithAddFab';
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import RunForm from '../components/forms/RunForm';
import EntityList from "../containers/EntityList";
import { getSuites, createSuite, deleteSuite } from '../redux/actions/suitesActions';
import Creator from '../containers/Creator';
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";


class Suites extends Component {

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
        this.props.createSuite(projectId, {title: data.title, cases: data.selectedCaseIds})
        .then((data) => {
            this.fetchSuites();
        });
        this.props.closeCreator()
    }

    renderSecondaryActionComponent(suite){
        return (<IconButton onClick={() => { this.handleSuiteDeletion(suite.id)} }>
                <DeleteIcon />
            </IconButton>)
    }

    handleSuiteDeletion(caseId){
        this.props.deleteSuite(caseId)
        .then((data) => {
            this.fetchSuites();
        })
    }

    render() {

        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

        return (
            <div>
                <Creator
                    open={this.props.creatorOpen}
                    title={'New Suite'}
                    handleClose={() => { this.props.closeCreator() }}
                >
                    <RunForm
                            submitAction={(data) => {this.handleNewSuiteCreation(data)}}
                    />
                </Creator>

                <EnhancedEntityList
                    loading={this.props.suitesLoading}
                    entities={this.props.suites}
                    title={ suite => suite.title }
                    id={ suite => suite.id }
                    clickHandler={suite => this.props.history.push(`/suites/${suite.id}`)}
                    mainItemRenderer={suite => <DescriptionIcon />}
                    secondaryActionRenderer={(suite) => this.renderSecondaryActionComponent(suite)}
                />
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
        currentProject: state.projects.currentProject,
        suitesLoading: state.loaders[actionTypes.GET_SUITES]
    }
};


export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Suites));
