import React from 'react'

import SchoolSynthese from '../common/Synthese'

import {connect} from 'react-redux'

//Router
import {push} from 'react-router-redux'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter(etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromCompetence = (competence, etapes) => {
    return etapes.filter(etape => competence._id === etape.competenceId)
};


const SchoolSyntheseDomaine = ({eleves, domaines, competences, etapes, goTo}) => (
    <SchoolSynthese columns={competences}
                    columnRender={competence => competence.description}
                    progress={(eleve, competence) => progress(eleve, etapeFromCompetence(competence, etapes))}
                    onColumnClick={competence => goTo(`/home/synthese/competence/${competence._id}`)}
                    onCellClick={(eleve, competence) => goTo(`/home/eleve/${eleve._id}/competence/${competence._id}`)}

    />
);

export default connect(
    (state, ownProps) => ({
        eleves: state.eleves,
        domaines: state.domaines,
        etapes: state.etapes,
        domaine: state.domaines.filter(domaine => domaine._id === ownProps.match.params.idDomaine)[0],
        competences: state.competences.filter(competence => competence.domaineId === ownProps.match.params.idDomaine)
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolSyntheseDomaine);