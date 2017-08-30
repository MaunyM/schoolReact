import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon} from 'semantic-ui-react'

//Router
import { push } from 'react-router-redux'

import {removeDomaine} from '../../actions'

import './card.css'

const CompetenceCard = ({_id, name, eleveId, progress, onRemoveClick, goTo}) => (
    <Card className="domaine" link={true} >
        <Card.Content>
            <Card.Header>
                <Icon name='trash' onClick={event => onRemoveClick(_id)}/>
                <p onClick={event => goTo(`/eleve/${eleveId}/domaine/${_id}`)}>{name}</p>
            </Card.Header>
            {Math.floor(progress)} %
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        onRemoveClick: (code) => {
            dispatch(removeDomaine(code))
        },
        goTo: url => {
            dispatch(push(url))
        }
    })
)(CompetenceCard);
