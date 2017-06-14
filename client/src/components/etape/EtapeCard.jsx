import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import {masterCompetence, unmasterCompetence} from '../../actions'

import './card.css'

const CompetenceCard = ({code, description, onCompetenceClicked, isMastered}) => (
    <Card onClick={event => onCompetenceClicked(code, isMastered)} color={isMastered ? "green" : "red"}>
        <Card.Content>
            <Card.Header>
                {code}
            </Card.Header>
            <Card.Description>
                {description}
            </Card.Description>
        </Card.Content>
    </Card>
);

const hasCompetence = (state, code) => {
    return state.eleve.master.includes(code);
}

export default connect(
    (state, ownProps) => ({
        isMastered: hasCompetence(state, ownProps.code)
    }),
    (dispatch) => ({
        onCompetenceClicked: (code, isMastered) => {
            if (isMastered) {
                dispatch(unmasterCompetence(code))
            } else {
                dispatch(masterCompetence(code))
            }
        }
    })
)(CompetenceCard);
