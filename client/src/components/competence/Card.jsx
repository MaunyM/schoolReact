import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

//Router
import { push } from 'react-router-redux'

import {openLicence} from '../../actions'

import './card.css'

const CompetenceCard = ({code, description, onAddClick, goTo}) => (
    <Card className="competence" onClick={event => goTo(`/competence/${code}`)}>
        <Card.Content>
            <Card.Header>
                {description}
            </Card.Header>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        onAddClick: (applicationId) => {
            dispatch(openLicence(applicationId))
        },
        goTo: url => {
            dispatch(push(url))
        }
    })
)(CompetenceCard);
