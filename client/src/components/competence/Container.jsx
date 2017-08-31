import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import CompetenceCard from './Card'
import CompetenceEditCard from './EditCard'
import SchoolStep from '../layout/Step';

import './container.css'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter(etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromCompetence = (competence, etapes) => {
    return etapes.filter(etape => competence._id === etape.competenceId)
};

const CompetenceContainer = ({domaine, competences, etapes, eleve}) => (
    <div>
        <SchoolStep eleve={eleve} domaine={domaine}/>
        <Card.Group>
            {competences.map((competence, count) => <CompetenceCard Card
                                                           key={count}
                                                           eleveId={eleve && eleve._id}
                                                           progress={eleve && progress(eleve, etapeFromCompetence(competence, etapes))}
                                                           {...competence}/>)}
            <CompetenceEditCard domaine={domaine}/>
        </Card.Group>
    </div>
);


export default connect(
    (state, ownProps) => ({
        eleve: state.eleves.filter(eleve => eleve._id === ownProps.match.params.idEleve)[0],
        id: ownProps.match.params.idDomaine,
        domaine: state.domaines.filter(domaine => domaine._id === ownProps.match.params.idDomaine)[0],
        competences: state.competences.filter(competence => competence.domaineId === ownProps.match.params.idDomaine),
        etapes: state.etapes
    }),
    dispatch => ({})
)(CompetenceContainer);