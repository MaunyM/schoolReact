import React from 'react'

import SchoolProgress from '../common/Progress'

import {Label, Table} from 'semantic-ui-react'

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
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell/>
                {competences.map(competence =>
                    <Table.HeaderCell key={competence._id}>
                        <a onClick={event => goTo(`/synthese/competence/${competence._id}`)} className="link">
                            {competence.description}
                        </a>
                    </Table.HeaderCell>
                )}
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {eleves.map(eleve =>
                <Table.Row key={eleve._id}>
                    <Table.Cell collapsing>
                        <Label ribbon>{eleve.name}</Label>
                    </Table.Cell>
                    {competences.map(competence =>
                        <Table.Cell key={competence._id}>
                            <SchoolProgress
                                progress={progress(eleve, etapeFromCompetence(competence, etapes))}/>
                        </Table.Cell>
                    )}
                </Table.Row>)}
        </Table.Body>
    </Table>
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