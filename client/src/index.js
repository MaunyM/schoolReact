import React from 'react';
import ReactDOM from 'react-dom';

//Redux
import {Provider} from 'react-redux';
import {createStore, applyMiddleware, compose} from 'redux';
import {createEpicMiddleware} from 'redux-observable';

//Router
import createBrowserHistory from 'history/createBrowserHistory'
import {Route} from 'react-router'
import {ConnectedRouter, routerMiddleware} from 'react-router-redux'

import {schoolApp} from './reducers'

import './index.css';
import 'semantic-ui-css/semantic.min.css';

//School
import DomaineList from './components/domaine/Container';
import EtapeList from './components/etape/Container';
import CompetenceList from './components/competence/Container';
import {rootEpic} from './actions';

//Router
let history = createBrowserHistory();
const epicMiddleware = createEpicMiddleware(rootEpic);
const middleware = routerMiddleware(history);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = createStore(schoolApp,
    /* preloadedState, */ composeEnhancers(
        applyMiddleware(middleware, epicMiddleware)
    ));

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter history={history}>
            <div className="content">
                <Route exact path="/" component={DomaineList}/>
                <Route path="/domaine/:id" component={CompetenceList}/>
                <Route path="/competence/:id" component={EtapeList}/>
            </div>
        </ConnectedRouter >
    </Provider>,
    document.getElementById('root')
);
