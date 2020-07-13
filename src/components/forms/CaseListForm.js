import React from "react";
import WithDefaultForEmptiness from "../../containers/WithDefaultForEmptiness";
import EntityList from "../../containers/EntityList";
import Button from "../Button";
import Checkbox from "@material-ui/core/Checkbox";

class CaseListForm extends React.Component {

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
                <div>
                    <div style={{height: '600px', overflow: 'auto'}}>
                        <EnhancedEntityList
                            entities={ this.props.cases.sort((a, b) => this.state.selectedCaseIds.includes(a.id) ? -1 : 1) }
                            title={ caze => caze.title }
                            id={ caze => caze.id }
                            clickHandler={ caze => this.toggleCase(caze) }
                            mainItemRenderer={ caze => <Checkbox checked={ this.state.selectedCaseIds.includes(caze.id) } /> }
                            secondaryActionRenderer={ caze => null }
                        />
                    </div>
                    <Button type="submit" color="primary" variant="contained">
                        Save
                    </Button>
                </div>
            </form>
        )
    }
}

export default CaseListForm;