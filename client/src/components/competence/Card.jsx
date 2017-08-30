import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon} from 'semantic-ui-react'
import {removeCompetence} from '../../actions'

//Router
import { push } from 'react-router-redux'

import './card.css'

const CompetenceCard = ({_id, eleveId, description, progress, onRemoveClick, goTo}) => (
    <Card className="competence" link={true}>
        <Card.Content>
            <Card.Header>
                <Icon name='trash' onClick={event => onRemoveClick(_id)}/>
                <p onClick={event => goTo(`/eleve/${eleveId}/competence/${_id}`)}>{description}</p>
            </Card.Header>
            {Math.floor(progress)} %
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        onRemoveClick: (id) => {
            dispatch(removeCompetence(id))
        },
        goTo: url => {
            dispatch(push(url))
        }
    })
)(CompetenceCard);
