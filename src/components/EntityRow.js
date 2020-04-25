import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

class EntityRow extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        const { title, mainItemIcon, secondaryActionIcon, clickHandler } = this.props;

        return (
                <ListItem button onClick={ clickHandler }>

                    <ListItemIcon>
                        { mainItemIcon }
                    </ListItemIcon>

                    
                    <ListItemText primary={title}/>

                    <ListItemSecondaryAction >
                        { secondaryActionIcon }
                    </ListItemSecondaryAction>
                </ListItem>
        );
    }
}

EntityRow.propTypes = {
    title: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    mainItemIcon: PropTypes.element.isRequired,
    secondaryActionIcon: PropTypes.element.isRequired
};

export default EntityRow;
