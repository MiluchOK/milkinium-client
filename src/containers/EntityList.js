import React, {Component} from 'react';
import List from "@material-ui/core/List";

class EntityList extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { entities, renderer } = this.props;
        return (
            <List component="nav">
                {renderer(entities, () => { console.log("Temporary plug for deletion.") })}
            </List>
        );
    }
}

export default EntityList;