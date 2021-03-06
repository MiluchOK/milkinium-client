import React from "react";
import _ from 'lodash';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckBox from "@material-ui/core/Checkbox";
import NoResults from '../components/NoResults';
import EntityRow from './EntityRow';

export const renderEntities = (entities, actions) => {

    if (entities === 0){
        return <NoResults/>
    }

    return _.map(entities, (entity => {
        const props = entity.props;
        const component = entity.component;
        const onDelete = () => {
            console.log('Oups')
        }
        return React.createElement(component, onDelete)
        // return <EntityRow
        //     title={entity.title}
        //     icon={<DescriptionIcon />}
        //     key={entity.id}
        //     id={entity.id}
        //     to={entity.path}
        //     {...props}
        // />
    }))
};

export const renderSuites = (suites, handleDelete) => {
    if (suites.size === 0) {
        return <NoResults/>
    }

    const el = _.map(suites, (c => (
        <EntityRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/suites/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />
    )));
    return el
};

export const renderCases = (cases, handleDelete) => {
    if (cases.size === 0) {
        return <NoResults/>
    }

    console.log({cases: cases});

    return _.map(cases, (c => {
        console.log({c: c})
        return (<EntityRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/cases/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />)
    }));
};

export const renderExecutions = (executions, handleDelete) => {
    if (executions.size === 0) {
        return <NoResults/>
    }

    return _.map(executions, (c => (
        <EntityRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/runs/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />
    )));
};
