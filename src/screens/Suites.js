import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import List from '@material-ui/core/List';
import WithAddFab from '../containers/WithAddFab';
import { renderSuites } from "../components/ListRenders";
import SuiteForm from '../components/forms/SuiteForm';
import {getSuites, createSuite, deleteSuite} from '../redux/actions/suitesActions';
import Creator from '../containers/Creator';


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
        return (
            <div>
                <Creator
                    open={this.props.creatorOpen}
                    title={'New Suite'}
                    handleClose={() => { this.props.closeCreator() }}
                >
                    <SuiteForm
                            submitAction={(data) => {this.handleNewSuiteCreation(data)}}
                    />
                </Creator>

                <div>
                    <List>
                        { renderSuites(this.props.suites, this.handleSuiteDeletion) }
                    </List>
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


export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Suites));
