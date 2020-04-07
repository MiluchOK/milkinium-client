import React from "react";
import _ from 'lodash';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckBox from "@material-ui/core/Checkbox";
import NoResults from '../components/NoResults';
import ExecutionRow from '../components/ExecutionRow';

export const renderSuites = (suites, handleDelete) => {
    if (suites.size === 0) {
        return <NoResults/>
    }

    const el = _.map(suites.toJS(), (c => (
        <ExecutionRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/suites/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />
    )));
    console.log(el);
    return el
};

export const renderCases = (cases, handleDelete) => {
    if (cases.size === 0) {
        return <NoResults/>
    }

    return _.map(cases.toJS(), (c => (
        <ExecutionRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/cases/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />
    )));
};

export const renderExecutions = (executions, handleDelete) => {
    if (executions.size === 0) {
        return <NoResults/>
    }

    return _.map(executions, (c => (
        <ExecutionRow
            title={c.title}
            icon={<DescriptionIcon />}
            key={c.id}
            id={c.id}
            to={`/runs/${c.id}`}
            handleDelete={() => {handleDelete(c.id)}}
        />
    )));
};