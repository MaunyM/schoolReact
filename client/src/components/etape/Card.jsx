import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import {updateEleve} from '../../actions'

import './card.css'

const hasCompetence = (eleve, id) => {
    return eleve && eleve.master.includes(id);
};

const CompetenceCard = ({_id, description, onCompetenceClicked, isMastered, eleve, color}) => (
    <Card onClick={event => onCompetenceClicked(_id, eleve)} color={hasCompetence(eleve, _id) ? "green" : "red"}>
        <Card.Content>
            <Card.Header>
                <p>{description}</p>
            </Card.Header>
            <Card.Description>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    (dispatch) => ({
        onCompetenceClicked: (id, eleve) => {
            if (hasCompetence(eleve, id)) {
                eleve = {...eleve, master: eleve.master.filter(competence => competence !== id)}
            } else {
                eleve = {...eleve, master: [...eleve.master, id]}
            }
            dispatch(updateEleve(eleve))
        }
    })
)(CompetenceCard);
