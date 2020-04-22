import React, {Component} from 'react';
import List from "@material-ui/core/List";
import _ from 'lodash';
import EntityRow from "../components/EntityRow";

class EntityList extends Component {

    constructor(props) {
        super(props);
    }

    renderEntities() {

        const {
            entities,
            title,
            id,
            clickHandler,
            mainItemRenderer,
            secondaryActionRenderer,
            ...otherProps
        } = this.props;

        return _.map(entities, (c => {
            return (
                <EntityRow
                    {...otherProps}
                    title={ title(c) }
                    key={ id(c) }
                    id={ id(c) }
                    clickHandler={() => { clickHandler(c) }}
                    mainItemIcon={ mainItemRenderer(c) }
                    secondaryActionIcon={ secondaryActionRenderer(c) }
                />)
            }
        ));
    }

    render() {
        return (
            <List component="nav">
                {this.renderEntities()}
            </List>
        );
    }
}

export default EntityList;