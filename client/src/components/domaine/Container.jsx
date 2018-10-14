import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import SchoolCard from '../common/Card'
import DomaineEditCard from './EditCard'
import SchoolStep from '../layout/Step';
import {editForm, removeDomaine} from '../../actions'

import './container.css'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter(etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromDomaine = (domaine, competences, etapes) => {
    const competencesId = competences.filter(competence => competence.domaineId === domaine._id).map(competence => competence._id);
    return etapes.filter(etape => competencesId.includes(etape.competenceId))
};

const DomaineContainer = ({domaines, eleve, competences, onRemoveClick, goTo, etapes, onEditClick}) => (
    <div>
        <SchoolStep eleve={eleve}/>
        <Card.Group>
            {domaines.map((domaine, count) => <SchoolCard key={count}
                                                          onRemoveClick={onRemoveClick}
                                                          onEditClick={onEditClick(domaine)}
                                                          progress={eleve && progress(eleve, etapeFromDomaine(domaine, competences, etapes))}
                                                          header={domaine.name}
                                                          _id={domaine._id}
                                                          onClick={() => goTo(`/home/eleve/${eleve._id}/domaine/${domaine._id}`)}/>)}
            <DomaineEditCard/>
        </Card.Group>
    </div>
);


export default connect(
    (state, ownProps) => ({
        eleve: state.eleves.filter(eleve => eleve._id === ownProps.match.params.idEleve)[0],
        domaines: state.domaines,
        competences: state.competences,
        etapes: state.etapes
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        },
        onEditClick: (domaine) => () => {
            dispatch(editForm('domaine', domaine))
        },
        onRemoveClick: (code) => {
            dispatch(removeDomaine(code))
        }
    })
)(DomaineContainer);