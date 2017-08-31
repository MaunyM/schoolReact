import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import './card.css'

const SchoolCard = ({_id, url, header, progress, onRemoveClick, goTo}) => (
    <Card className="schoolCard" link={true}>
        <Card.Content>
            <Card.Header>
                <Icon name='trash' onClick={event => onRemoveClick(_id)}/>
                <p onClick={event => goTo(url)}>{header}</p>
            </Card.Header>
            {!isNaN(progress) && Math.floor(progress) + " %"}
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolCard);
