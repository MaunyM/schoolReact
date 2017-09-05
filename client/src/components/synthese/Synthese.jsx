import React from 'react'

import SchoolProgress from '../common/Progress'

import {Label, Table} from 'semantic-ui-react'

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


const SchoolSynthese = ({eleves, domaines, competences, etapes, goTo}) => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell></Table.HeaderCell>
                {domaines.map(domaine =>
                    <Table.HeaderCell key={domaine._id}>
                        <a onClick={event => goTo(`synthese/domaine/${domaine._id}`)}  className="link"> {domaine.name}</a>
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
                    {domaines.map(domaine =>
                        <Table.Cell key={domaine._id}>
                            <a onClick={event => goTo(`eleve/${eleve._id}/domaine/${domaine._id}`)}  className="link">
                            <SchoolProgress
                                progress={progress(eleve, etapeFromDomaine(domaine, competences, etapes))}/>
                            </a>
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
        competences: state.competences,
        etapes: state.etapes
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolSynthese);