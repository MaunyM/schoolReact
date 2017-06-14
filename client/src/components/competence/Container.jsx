import React from 'react'
import {connect} from 'react-redux'
import {Card, Step} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import CompetenceCard from './Card'

import './container.css'

const DomaineContainer = ({domaine, competences, eleve, goTo}) => (
        <div><Step.Group>
            <Step icon='home' title={eleve.name}  onClick={event => goTo('/')}/>
            <Step icon='puzzle' title={domaine.name}/>
        </Step.Group>
            <Card.Group>
                {competences.map(competence => <CompetenceCard Card key={competence.code} {...competence}/>)}
            </Card.Group>
        </div>
    )
;

export default connect(
    (state, ownProps) => ({
        eleve : state.eleve,
        id: ownProps.match.params.id,
        domaine: state.domaines.filter(domaine => domaine.code === ownProps.match.params.id)[0],
        competences: state.competences.filter(competence => competence.codeDomaine === ownProps.match.params.id)
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(DomaineContainer);