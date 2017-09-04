import React from 'react'
import {connect} from 'react-redux'

import {Route} from 'react-router'

import {hideSidebar} from '../actions'

import DomaineList from './domaine/Container';
import EleveList from './eleve/Container';
import EtapeList from './etape/Container';
import CompetenceList from './competence/Container';
import SchoolHeader from './layout/Header';
import SchoolSidebar from './layout/Sidebar';
import SchoolSynthese from './synthese/Synthese';

import {loadEleves, loadDomaines, loadCompetences, loadEtapes} from '../actions'

import {Sidebar, Segment, Message, Icon} from 'semantic-ui-react'

import './app.css'


class AppContainer extends React.Component {
    componentWillMount() {
        const {load} = this.props;
        load();
    }

    render() {
        const {hideSidebar} = this.props;
        return (
            <Sidebar.Pushable as={Segment}>
                <Message>

                    <Message.Header>      <Icon name='announcement'/>
                        Nouveautés !
                    </Message.Header>
                    <p>
                        Les élèves sont classés par ordre alphabétique
                    </p>
                </Message>
                <div className="appContent" onClick={event => hideSidebar()}>
                    <SchoolSidebar/>
                    <Sidebar.Pusher>
                        <SchoolHeader/>
                        <Route exact path="/" component={EleveList}/>
                        <Route path="/synthese" component={SchoolSynthese}/>
                        <Route path="/eleve/:idEleve/domaines" component={DomaineList}/>
                        <Route path="/eleve/:idEleve/domaine/:idDomaine" component={CompetenceList}/>
                        <Route path="/eleve/:idEleve/competence/:idCompetence" component={EtapeList}/>
                    </Sidebar.Pusher>
                </div>
            </Sidebar.Pushable>
        )
    }
}

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        hideSidebar: () => dispatch(hideSidebar()),
        load: () => {
            dispatch(loadCompetences());
            dispatch(loadDomaines());
            dispatch(loadEtapes());
            dispatch(loadEleves());
        }
    })
)(AppContainer);