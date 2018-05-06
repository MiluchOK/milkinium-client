import React, {Component} from 'react';
import ListIcon from 'material-ui-icons/List';
import LinearIcon from 'material-ui-icons/LinearScale';
import FeedIcon from 'material-ui-icons/RssFeed';
import DashboardIcon from 'material-ui-icons/Dashboard';
import Dashboard from '../screens/Dashboard';
import Executions from '../screens/Executions';
import Feed from '../screens/Feed';
import Cases from '../screens/Cases';

export default [
    {
        name: 'Dashboard',
        path: '/',
        icon: (<DashboardIcon/>),
        component: (Dashboard)
    },
    {
        name: 'Cases',
        path: '/cases',
        icon: (<ListIcon/>),
        component: (Cases)
    },
    {
        name: 'Executions',
        path: '/executions',
        icon: (<LinearIcon/>),
        component: (Executions)
    },
    {
        name: 'Feed',
        path: '/feed',
        icon: (<FeedIcon/>),
        component: (Feed)
    },
]