import React from 'react'

import {Table, Label} from 'semantic-ui-react'

import SchoolProgress from './Progress'

import {connect} from 'react-redux'

const SchoolSynthese = ({eleves, columns, columnRender, onColumnClick, onCellClick, progress, goTo}) => (
    <Table celled>
        <Table.Header>
            <Table.Row>
                <Table.HeaderCell/>
                {columns.map(column =>
                    <Table.HeaderCell key={column._id}>
                        {onColumnClick ?
                            <a onClick={event => onColumnClick(column)} className="link">{columnRender(column)}</a>:
                            <span>{columnRender(column)}</span>
                        }
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
                    {columns.map(column =>
                        <Table.Cell key={column._id}>
                            <a onClick={event => onCellClick(eleve, column)}
                               className="link">
                                <SchoolProgress
                                    progress={progress(eleve, column)}/>
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
    }),
    dispatch => ({})
)(SchoolSynthese);