import React from 'react'
import {connect} from 'react-redux'

import {Route} from 'react-router'
import {push} from 'react-router-redux'

import {hideSidebar} from '../actions'

import DomaineList from './domaine/Container';
import EleveList from './eleve/Container';
import EtapeList from './etape/Container';
import CompetenceList from './competence/Container';
import SchoolHeader from './layout/Header';
import SchoolSidebar from './layout/Sidebar';
import SchoolSyntheseHome from './synthese/SyntheseHome';
import SchoolSyntheseDomaine from './synthese/SyntheseDomaine';
import SchoolSyntheseCompetence from './synthese/SyntheseCompetence';


import {loadEleves, loadDomaines, loadCompetences, loadEtapes} from '../actions'

import {Sidebar, Segment} from 'semantic-ui-react'

import './app.css'


class AppContainer extends React.Component {
    componentWillMount() {
        const {load} = this.props;
        load();
    }

    render() {
        const {hideSidebar, sidebarVisible} = this.props;
        return (
            <Sidebar.Pushable as={Segment}>
                <div className="appContent" onClick={event => {
                    if (sidebarVisible) hideSidebar()
                }}>
                    <SchoolSidebar/>
                    <Sidebar.Pusher>
                        <SchoolHeader/>
                        <Route exact path="/home" component={EleveList}/>
                        <Route exact path="/home/synthese" component={SchoolSyntheseHome}/>
                        <Route path="/home/synthese/domaine/:idDomaine" component={SchoolSyntheseDomaine}/>
                        <Route path="/home/synthese/competence/:idCompetence" component={SchoolSyntheseCompetence}/>
                        <Route path="/home/eleve/:idEleve/domaines" component={DomaineList}/>
                        <Route path="/home/eleve/:idEleve/domaine/:idDomaine" component={CompetenceList}/>
                        <Route path="/home/eleve/:idEleve/competence/:idCompetence" component={EtapeList}/>
                    </Sidebar.Pusher>
                </div>
            </Sidebar.Pushable>
        )
    }
}

export default connect(
    (state, ownProps) => ({
        sidebarVisible: state.navigation.sidebarVisible
    }),
    dispatch => ({
        hideSidebar: () => {
            dispatch(hideSidebar())
        }, load: () => {
            dispatch(loadCompetences());
            dispatch(loadDomaines());
            dispatch(loadEtapes());
            dispatch(loadEleves());
        },
        goTo: url => {
            dispatch(push(url))
        }
    })
)(AppContainer);