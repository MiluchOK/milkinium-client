import {renderChekableCases} from "../ListRenders";
import List from "@material-ui/core/List/List";
import { reduxForm, Field } from 'redux-form';
import React from "react";
import {renderCheckBox, renderTextField} from "../TextField";
import EntityRow from "../EntityRow";
import AddIcon from '@material-ui/icons/Add';
import WithDefaultForEmptiness from "../../containers/WithDefaultForEmptiness";
import EntityList from "../../containers/EntityList";
import DescriptionIcon from "@material-ui/icons/Description";
import Button from "../Button";
import Checkbox from "@material-ui/core/Checkbox";

class CaseListForm extends React.Component {

    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         selectedCaseIds: []
    //     }
    // }

    state = {
        selectedCaseIds: this.props.selectedCaseIds
    };

    toggleCase(caze) {
        if (this.state.selectedCaseIds.includes(caze.id)) {
            this.setState({selectedCaseIds: this.state.selectedCaseIds.filter(id => id !== caze.id)})
        } else {
            this.setState({selectedCaseIds: [...this.state.selectedCaseIds, caze.id]})
        }
    }

    render(){

        let EnhancedEntityList = WithDefaultForEmptiness(EntityList);

        return(
            <form onSubmit={(e) => {
                e.preventDefault()
                this.props.handleSubmit(this.state.selectedCaseIds)
            }}>
                <EnhancedEntityList
                    entities={ this.props.cases }
                    title={ caze => caze.title }
                    id={ caze => caze.id }
                    clickHandler={ caze => this.toggleCase(caze) }
                    mainItemRenderer={ caze => <Checkbox checked={ this.state.selectedCaseIds.includes(caze.id) } /> }
                    secondaryActionRenderer={ caze => null }
                />
                <Button type="submit" color="primary" variant="contained">
                    Add
                </Button>
            </form>
        )
    }
}

CaseListForm = reduxForm({
    // a unique name for the form
    form: 'caseList',
    enableReinitialize: true
})(CaseListForm);

export default CaseListForm;