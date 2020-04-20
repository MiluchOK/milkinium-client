import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '@material-ui/core/List';
import WithAddFab from '../containers/WithAddFab';
import {renderCases, renderSuites} from "../components/ListRenders";
import RunForm from '../components/forms/RunForm';
import EntityList from "../containers/EntityList";
import {getSuites, createSuite, deleteSuite} from '../redux/actions/suitesActions';
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
                    entities={this.props.suites}
                    renderer={renderSuites}
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
        currentProject: state.projects.currentProject
    }
};


export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Suites));
