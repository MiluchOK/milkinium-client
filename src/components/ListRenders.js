import React from "react";
import _ from 'lodash';
import DescriptionIcon from '@material-ui/icons/Description';
import NoResults from '../components/NoResults';
import ExecutionRow from '../components/ExecutionRow';

export const renderSuites = (suites) => {
    // const suites = this.props.suites;
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
            handleDelete={() => {this.handleSuiteDeletion(c.id)}}
        />
    )));
    console.log(el);
    return el
};

export const renderCases = (cases) => {
    // const cases = this.props.suites;
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
            handleDelete={() => {this.handleCaseDeletion(c.id)}}
        />
    )));
};

