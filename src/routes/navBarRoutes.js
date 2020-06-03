import React, {Component} from 'react';
import ListIcon from '@material-ui/icons/List';
import LinearIcon from '@material-ui/icons/LinearScale';
import FeedIcon from '@material-ui/icons/RssFeed';
import HomeIcon from '@material-ui/icons/Home';
import ViewListIcon from '@material-ui/icons/ViewList';
import SettingsIcon from '@material-ui/icons/Settings';
import Dashboard from '../screens/Dashboard';
import Executions from '../screens/Runs';
import Feed from '../screens/Feed';
import Cases from '../screens/Cases';
import Suits from '../screens/Suites';
import Settings from '../screens/Settings';

export default [
    {
        name: 'Dashboard',
        path: '/',
        icon: (<HomeIcon/>),
        component: (Dashboard)
    },
    {
        name: 'Cases',
        path: '/cases',
        icon: (<ListIcon/>),
        component: (Cases)
    },
    {
        name: 'Suites',
        path: '/suites',
        icon: (<ViewListIcon />),
        component: (Suits)
    },
    {
        name: 'Runs',
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
    {
        name: 'Settings',
        path: '/setting',
        icon: (<SettingsIcon />),
        component: (Settings)
    }
]
