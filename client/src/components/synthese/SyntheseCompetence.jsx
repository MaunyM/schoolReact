import React from 'react'

import SchoolSynthese from '../common/Synthese'
import {updateEleve} from '../../actions'

import {connect} from 'react-redux'

const hasCompetence = (eleve, id) => {
    return eleve && eleve.master.includes(id);
};

const SchoolSyntheseCompetence = ({eleves, domaines, competences, etapes, onEtapeClicked}) => (
    <SchoolSynthese columns={etapes}
                    columnRender={etape => etape.description}
                    progress={(eleve, etape) => hasCompetence(eleve, etape._id) ? 100 : 0}
                    onCellClick={(eleve, etape) => onEtapeClicked(etape._id, eleve)}
    />
);

export default connect(
    (state, ownProps) => ({
        eleves: state.eleves,
        domaines: state.domaines,
        etapes: state.etapes.filter(etape => etape.competenceId === ownProps.match.params.idCompetence),
    }),
    dispatch => ({
        onEtapeClicked: (id, eleve) => {
            if (hasCompetence(eleve, id)) {
                eleve = {...eleve, master: eleve.master.filter(competence => competence !== id)}
            } else {
                eleve = {...eleve, master: [...eleve.master, id]}
            }
            dispatch(updateEleve(eleve))
        }
    })
)(SchoolSyntheseCompetence);