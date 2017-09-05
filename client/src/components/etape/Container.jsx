import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import SchoolCard from '../common/Card'
import EtapeEditCard from './EditCard'
import SchoolStep from '../layout/Step';

import {removeEtape, updateEleve} from '../../actions'

import './container.css'

const competenceFromId = (state, id) => {
    return state.competences.filter(competence => competence._id === id)[0]
};

const hasCompetence = (eleve, id) => {
    return eleve && eleve.master.includes(id);
};
const EtapeContainer = ({competence, domaine, etapes, eleve, onEtapeClicked, onRemoveClick}) => (
    <div className="etape">
        <SchoolStep eleve={eleve} competence={competence} domaine={domaine}/>
        <div>
            {competence &&
            <Card.Group>
                {
                    etapes.map((etape, count) =>
                        <SchoolCard key={count}
                                    onRemoveClick={onRemoveClick}
                                    onClick={() => onEtapeClicked(etape._id, eleve)}
                                    header={etape.description}
                                    _id={etape._id}
                                    color={hasCompetence(eleve, etape._id) ? "green" : "red"}
                        />
                    )
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
        etapes: state.etapes.filter(etape => etape.competenceId === ownProps.match.params.idCompetence)
    }),
    dispatch => ({
        onEtapeClicked: (id, eleve) => {
            if (hasCompetence(eleve, id)) {
                eleve = {...eleve, master: eleve.master.filter(competence => competence !== id)}
            } else {
                eleve = {...eleve, master: [...eleve.master, id]}
            }
            dispatch(updateEleve(eleve))
        },
        onRemoveClick: (id) => {
            dispatch(removeEtape(id))
        }
    })
)(EtapeContainer);