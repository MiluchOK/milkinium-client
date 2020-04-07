import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCases, createCase, deleteCase } from '../redux/actions/casesActions';
import WithAddFab from '../containers/WithAddFab';
import Creator from "../containers/Creator";
import CaseForm from "../components/CaseForm";
import List from "@material-ui/core/List";
import {renderCases} from "../components/ListRenders";

class Cases extends Component {

    constructor(props) {
        super(props);
        this.handleCaseDeletion = this.handleCaseDeletion.bind(this);
        this.handleNewCaseCreation = this.handleNewCaseCreation.bind(this);
    }

    fetchCases(){
        //TODO Not sure if it is any good
        if(this.props.currentProject){
            this.props.getCases(this.props.currentProject);
        }
    }

    componentDidMount() {
        this.fetchCases()
    }

    componentDidUpdate(prevProps){
        if(prevProps.currentProject !== this.props.currentProject){
            this.fetchCases();
        }
    }

    handleNewCaseCreation(data){
        const projectId = this.props.currentProject;
        this.props.createCase(projectId, data)
            .then((data) => {
                this.fetchCases();
                this.setState({creatorOpen: false})
            })
    }

    handleCaseDeletion(caseId){
        this.props.deleteCase(caseId)
            .then((data) => {
                this.fetchCases();
            })
    }

    render() {

        let creatorOpen = this.props.creatorOpen;

        return (
            <div>
                <Creator
                    open={creatorOpen}
                    title={'New Entity'}
                    handleClose={() => {this.props.closeCreator()}}
                >
                    <CaseForm
                        submitAction={(data) => { this.handleNewCaseCreation(data) }}
                    />
                </Creator>

                <div>
                    <List component="nav">
                        {renderCases(this.props.cases, this.handleCaseDeletion)}
                    </List>
                </div>
            </div>
        )
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCases: getCases,
        createCase: createCase,
        deleteCase: deleteCase,
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        cases: state.cases,
        currentProject: state.projects.get('currentProject')
    }
};

export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Cases));

