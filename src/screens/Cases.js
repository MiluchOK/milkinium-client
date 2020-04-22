import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getCases, createCase, deleteCase } from '../redux/actions/casesActions';
import WithAddFab from '../containers/WithAddFab';
import Creator from "../containers/Creator";
import CaseForm from "../components/forms/CaseForm";
import EntityList from "../containers/EntityList";
import WithDefaultForEmptiness from '../containers/WithDefaultForEmptiness';
import DescriptionIcon from "@material-ui/icons/Description";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";

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
        })
        this.props.closeCreator()
    }

    handleCaseDeletion(caseId){
        this.props.deleteCase(caseId)
        .then((data) => {
            this.fetchCases();
        })
    }

    renderSecondaryActionComponent(caze){
        return (<IconButton onClick={() => { this.handleCaseDeletion(caze.id)} }>
            <DeleteIcon />
        </IconButton>)
    }

    render() {

        let creatorOpen = this.props.creatorOpen;
        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

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

                <EnhancedEntityList
                    entities={this.props.cases}
                    title={ caze => caze.title }
                    id={ caze => caze.id }
                    clickHandler={ caze => this.props.history.push(`/cases/${caze.id}`) }
                    mainItemRenderer={ caze => <DescriptionIcon /> }
                    secondaryActionRenderer={ caze => this.renderSecondaryActionComponent(caze) }
                />
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
        currentProject: state.projects.currentProject
    }
};

export default WithAddFab(connect(mapStateToProps, matchDispatchToProps)(Cases));

