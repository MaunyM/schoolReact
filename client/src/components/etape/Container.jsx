import React from 'react'
import {connect} from 'react-redux'
import {Card, Step} from 'semantic-ui-react'

import EtapeCard from './EtapeCard'

//Router
import {push} from 'react-router-redux'

import './container.css'

const filterByCompetence = (etapes, code) => {
    return etapes.filter(etape => etape.codeCompetence === code)
}

const Container = ({competence, domaine, etapes, id, eleve, goTo}) => (
        <div>
            <Step.Group>
                <Step icon='home' title={eleve.name} onClick={event => goTo('/')}/>
                <Step icon='puzzle' title={domaine.name} onClick={event => goTo('/domaine/' + domaine.code)}/>
                <Step title={competence.code}/>
            </Step.Group>
            <div>
                <Card.Group>
                    {filterByCompetence(etapes, competence.code).map(etape => <EtapeCard
                        key={etape.code} {...etape}/>)}
                </Card.Group>
            </div>
        </div>
    )
;

const competenceFromCode = (state, code) => {
    return state.competences.filter(competence => competence.code === code)[0]
};

export default connect(
    (state, ownProps) => ({
        eleve: state.eleve,
        id: ownProps.match.params.id,
        domaine: state.domaines.filter(domaine => domaine.code === competenceFromCode(state, ownProps.match.params.id).codeDomaine)[0],
        competence: competenceFromCode(state, ownProps.match.params.id),
        etapes: state.etapes
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(Container);