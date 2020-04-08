import {renderChekableCases} from "../ListRenders";
import List from "@material-ui/core/List/List";
import { reduxForm, Field } from 'redux-form';
import React from "react";
import {renderCheckBox, renderTextField} from "../TextField";
import ExecutionRow from "../ExecutionRow";
import AddIcon from '@material-ui/icons/Add';

class CaseListForm extends React.Component {

    renderCheckBoxes(cases) {
        let obj = []
        cases.forEach(cc => {
            obj.push(<Field name="employed" component={renderCheckBox}/>)
        })
        console.log(obj);
        return obj
    }

    render(){
        return(
            <form>
                <List component="nav">
                    {this.renderCheckBoxes(this.props.cases)}
                </List>
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