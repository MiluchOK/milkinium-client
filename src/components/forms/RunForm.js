import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import DoneIcon from '@material-ui/icons/Done';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { createCase, deleteCase, getCases } from "../../redux/actions/casesActions";
import WithDefaultForEmptiness from "../../containers/WithDefaultForEmptiness";
import EntityTable from "../../containers/tables/EntityTable";
import TextField from "@material-ui/core/TextField";

const styles = theme => ({
    form: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing.unit
    },
    submit: {
        marginTop: theme.spacing.unit * 3
    },
    submitContainer: {
        marginTop: theme.spacing.unit * 3,
        display: 'flex',
        justifyContent: 'center'
    }
});

let EnhancedEntityTable = WithDefaultForEmptiness(EntityTable);


function RunForm(props) {

    const [title, setTitle] = useState('');

    useEffect(() => {
        props.getCases(props.currentProject);
    }, [])

    const handleCreate = (selectedIds) => {
        props.submitAction({selectedCaseIds: selectedIds, title: title})
    }

    const { error, cases } = props;
    const tableData = Object.values(cases).map(caze => ({
        id: caze.id,
        title: caze.title
    }))

    return (
        <React.Fragment>
            <TextField
                label="Title"
                fullWidth={true}
                required={true}
                margin={"normal"}
                type='text'
                onChange={(event) => setTitle(event.target.value)}
                editState={false}
            />
            {error && <strong style={{color:'red'}}>{error}</strong>}
            <EnhancedEntityTable
                loading={false}
                defaultActions={<React.Fragment />} // TODO this is technically a hack lol
                massActions={[
                    {
                        icon: <DoneIcon />,
                        title: 'Create',
                        targetAction: (selected) => { handleCreate(selected) }
                    }
                ]}
                entities={tableData}
                title={'Test Cases'}
                handleRowClick={(event, entity) => console.log(`Clicked entity ${entity}`)}
                columns={[
                    {key: 'title', label: 'Title', numeric: false}
                ]}
            />
        </React.Fragment>
    )
};

const mapStateToProps = (state) => {
    return {
        cases: state.cases,
        currentProject: state.projects.currentProject
    }
};

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        getCases: getCases,
        createCase: createCase,
        deleteCase: deleteCase,
    }, dispatch)
}

RunForm = connect(mapStateToProps, matchDispatchToProps)(RunForm);
export default withStyles(styles)(RunForm);
