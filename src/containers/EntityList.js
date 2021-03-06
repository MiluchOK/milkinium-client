import React, {Component} from 'react';
import List from "@material-ui/core/List";
import Divider from '@material-ui/core/Divider';
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
            attendant,
            ...otherProps
        } = this.props;

        let index = 0
        return _.map(entities, ((c) => {
            index = index + 1
            return (
                <React.Fragment>
                    {index !== 1 ? <Divider /> : null}
                    <EntityRow
                        {...otherProps}
                        title={ title(c) }
                        key={ id(c) }
                        id={ id(c) }
                        clickHandler={() => { clickHandler(c) }}
                        mainItemIcon={ mainItemRenderer(c) }
                        secondaryActionIcon={ secondaryActionRenderer(c) }
                    />
                    {attendant ? attendant(c) : null}
                </React.Fragment>
            )}
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