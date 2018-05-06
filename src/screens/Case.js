import React, { Component } from 'react';

class Case extends Component {

    compinentDidMount(){
        //Get case info
    }

    render(){

        const caseId = this.props.match.params.caseId;

        return(
            <div>
                Case {caseId}
            </div>
        )
    }
}

export default Case;