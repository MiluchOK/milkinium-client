import React, {Component} from 'react';
import _ from 'lodash';
import {connect} from 'react-redux';
import List from '@material-ui/core/List';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import {bindActionCreators} from 'redux';
import compose from 'recompose/compose';
import AddIcon from '@material-ui/icons/Add';
import CaseForm from '../components/CaseForm';
import Case from './../components/ExecutionRow';
import { renderCases } from "../components/ListRenders";
import {getCases, createCase, deleteCase} from '../redux/actions/casesActions';
import DescriptionIcon from '@material-ui/icons/Description';
import NoResults from '../components/NoResults';
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

class Cases extends Component {

    constructor(props) {
        super(props);
        this.state = {
            creatorOpen: false,
        };
        this.handleAddCase = this.handleAddCase.bind(this);
        this.handleNewCaseCreation = this.handleNewCaseCreation.bind(this);
    }

    handleAddCase() {
        this.setState({creatorOpen: true})
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
        if(prevProps.currentProject != this.props.currentProject){
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

    // renderCases() {
    //     const cases = this.props.cases;
    //     if (cases.size == 0) {
    //         return <NoResults/>
    //     }

    //     const elements = _.map(cases.toJS(), (c => (
    //         <Case
    //             title={c.title}
    //             icon={<DescriptionIcon />}
    //             key={c.id}
    //             id={c.id}
    //             to={`/cases/${c.id}`}
    //             handleDelete={() => {this.handleCaseDeletion(c.id)}}
    //         />
    //     )));
    //     return elements;
    // }

    render() {
        const {classes, theme} = this.props;
        return (

            <div className={classes.root}>

                <Creator
                    open={this.state.creatorOpen}
                    title={'New Case'}
                    handleClose={() => {this.setState({creatorOpen: false})}}
                >
                    <CaseForm 
                            submitAction={(data) => {this.handleNewCaseCreation(data)}}
                    />
                </Creator>

                <div>
                    <List component="nav">
                        {renderCases(this.props.cases)}
                    </List>

                    <Button variant="fab"
                            onClick={this.handleAddCase}
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


export default compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Cases);
