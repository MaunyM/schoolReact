import React from 'react'

import SchoolSynthese from '../common/Synthese'

//Router
import {push} from 'react-router-redux'

import {connect} from 'react-redux'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter(etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromDomaine = (domaine, competences, etapes) => {
    const competencesId = competences.filter(competence => competence.domaineId === domaine._id).map(competence => competence._id);
    return etapes.filter(etape => competencesId.includes(etape.competenceId))
};

const SchoolSyntheseHome = ({eleves, domaines, competences, etapes, goTo}) => (
    <SchoolSynthese columns={domaines}
                    columnRender={domaine => domaine.name}
                    progress={(eleve, domaine) => progress(eleve, etapeFromDomaine(domaine, competences, etapes))}
                    onColumnClick={domaine => goTo(`synthese/domaine/${domaine._id}`)}
                    onCellClick={(eleve, domaine) => goTo(`eleve/${eleve._id}/domaine/${domaine._id}`)}

    />
);

export default connect(
    (state, ownProps) => ({
        eleves: state.eleves,
        domaines: state.domaines,
        competences: state.competences,
        etapes: state.etapes
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolSyntheseHome);