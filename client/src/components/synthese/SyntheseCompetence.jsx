import React from 'react'

import SchoolProgress from '../common/Progress'

import {Label, Table} from 'semantic-ui-react'

import {connect} from 'react-redux'

const hasCompetence = (eleve, id) => {
    return eleve && eleve.master.includes(id);
};

const SchoolSyntheseCompetence = ({eleves, domaines, competences, etapes}) => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell/>
                {etapes.map(etape =>
                    <Table.HeaderCell key={etape._id} >{etape.description} </Table.HeaderCell>
                )}
            </Table.Row>
        </Table.Header>

        <Table.Body>
            {eleves.map(eleve =>
                <Table.Row key={eleve._id}>
                    <Table.Cell collapsing>
                        <Label ribbon>{eleve.name}</Label>
                    </Table.Cell>
                    {etapes.map(etape =>
                        <Table.Cell key={etape._id}>
                            <SchoolProgress
                                progress={hasCompetence(eleve, etape._id)?100:0}/>
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
        etapes: state.etapes.filter(etape => etape.competenceId === ownProps.match.params.idCompetence),
    }),
    dispatch => ({})
)(SchoolSyntheseCompetence);