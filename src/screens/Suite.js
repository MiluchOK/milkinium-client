import React, {Component} from 'react';
import {withStyles} from '@material-ui/core/styles';
import {bindActionCreators} from 'redux';
import SuiteForm from '../components/forms/SuiteForm';
import Paper from '@material-ui/core/Paper';
import LoadingIndicator from './../components/LoadingIndicator';
import DescriptionIcon from "@material-ui/icons/Description";
import {getCases} from '../redux/actions/casesActions';
import {connect} from 'react-redux';
import compose from 'recompose/compose';
import Creator from '../containers/Creator';
import {getSuite, editSuite} from '../redux/actions/suitesActions';
import CaseListForm from "../components/forms/CaseListForm";
import WithDefaultForEmptiness from "../containers/WithDefaultForEmptiness";
import EntityList from "../containers/EntityList";
import WithAddFab from "../containers/WithAddFab";

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
        this.casesToRender = this.casesToRender.bind(this);
    }

    handleAddCase() {
        this.setState({creatorOpen: true})
    }

    editSuite(values){
        const suiteId = this.props.match.params.suiteId;
        return this.props.editSuite(suiteId, values)
    }

    fetchSuite(id) {
        return this.props.getSuite(id);
    }

    fetchCases() {
        return this.props.getCases(this.props.currentProject)
    }

    componentDidMount() {
        this.fetchCases()
        this.fetchSuite(this.props.match.params.suiteId)
    }

    casesToRender(targetIds) {
        const allCases = this.props.cases;
        const cases = targetIds.map(cazeId => allCases[cazeId]);
        return cases.filter(c => c != null)
    }

    render() {
        const { classes } = this.props;
        const id = this.props.match.params.suiteId;
        const suite = this.props.suites[id];

        if(suite) {
            const targetIds = suite.cases;
            const cases = this.casesToRender(targetIds);
            let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

            return (
                <div className={classes.root}>
                    <Creator
                        open={this.props.creatorOpen}
                        title={'Add Case To Suite'}
                        handleClose={() => { this.props.closeCreator() }}
                    >
                        <CaseListForm
                            cases={Object.values(this.props.cases)}
                            selectedCaseIds={cases.map(c => c.id)}
                            handleSubmit={(data) => {
                                this.editSuite({cases: data})
                                .then(() => {
                                    this.fetchSuite(this.props.match.params.suiteId)
                                    this.props.closeCreator()
                                })
                            }}
                        />
                    </Creator>

                    <Paper className={classes.root}>
                        <SuiteForm 
                            initialValues={suite}
                            submitAction={this.editSuite}
                        >
                            <EnhancedEntityList
                                entities={ cases }
                                title={ caze => caze.title }
                                id={ caze => caze.id }
                                clickHandler={ () => {} }
                                mainItemRenderer={ caze => <DescriptionIcon /> }
                                secondaryActionRenderer={ caze => null }
                            />
                        </SuiteForm>
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
        editSuite: editSuite,
        getCases: getCases
    }, dispatch)
}

const mapStateToProps = (state) => {
    return {
        suites: state.suites,
        cases: state.cases,
        currentProject: state.projects.currentProject
    }
};

export default WithAddFab(compose(
    withStyles(styles, {withTheme: true}),
    connect(mapStateToProps, matchDispatchToProps)
)(Suite));