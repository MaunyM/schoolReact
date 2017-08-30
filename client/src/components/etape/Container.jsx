import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import EtapeCard from './Card'
import EtapeEditCard from './EditCard'
import SchoolStep from '../layout/Step';

import './container.css'

const filterByCompetence = (etapes, id) => {
    return etapes.filter(etape => etape.competenceId === id)
};

const competenceFromId = (state, id) => {
    return state.competences.filter(competence => competence._id === id)[0]
};

const EtapeContainer = ({competence, domaine, etapes, eleve}) => (
    <div>
        <SchoolStep eleve={eleve} competence={competence} domaine={domaine}/>
        <div>
            {competence &&
            <Card.Group>
                {
                    filterByCompetence(etapes, competence._id).map(etape =>
                        < EtapeCard key={etape._id} {...etape} eleve={eleve}/>)
                }
                <EtapeEditCard competence={competence}/>
            </Card.Group>
            }
        </div>
    </div>
);

export default connect(
    (state, ownProps) => ({
        eleve: state.eleves.filter(eleve => eleve._id === ownProps.match.params.idEleve)[0],
        id: ownProps.match.params.idCompetence,
        domaine: state.domaines.filter(domaine => domaine._id === competenceFromId(state, ownProps.match.params.idCompetence).domaineId)[0],
        competence: competenceFromId(state, ownProps.match.params.idCompetence),
        etapes: state.etapes
    }),
    dispatch => ({})
)(EtapeContainer);