import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import SchoolCard from '../common/Card'
import CompetenceEditCard from './EditCard'
import SchoolStep from '../layout/Step';
import {removeCompetence} from '../../actions'

import './container.css'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter(etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromCompetence = (competence, etapes) => {
    return etapes.filter(etape => competence._id === etape.competenceId)
};

const CompetenceContainer = ({domaine, competences, etapes, eleve, onRemoveClick, goTo}) => (
    <div className="competence">
        <SchoolStep eleve={eleve} domaine={domaine}/>
        <Card.Group>
            {competences.map((competence, count) =>
                <SchoolCard key={count}
                            onRemoveClick={onRemoveClick}
                            progress={eleve && progress(eleve, etapeFromCompetence(competence, etapes))}
                            header={competence.description}
                            _id={eleve._id}
                            onClick={() => goTo(`/eleve/${eleve && eleve._id}/competence/${competence._id}`)}/>)
            }
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
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        },
        onRemoveClick: (id) => {
            dispatch(removeCompetence(id))
        }
    })
)(CompetenceContainer);