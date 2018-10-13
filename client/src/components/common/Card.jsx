import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon} from 'semantic-ui-react'

import SchoolProgress from './Progress'

import './card.css'

const SchoolCard = ({_id, url, header, progress, color, onRemoveClick, onEditClick, onClick}) => (
    <Card className="schoolCard" link={true} onClick={event => onClick()} color={color}>
        <Card.Content>
            <Card.Header>
                <span className="icons">
                <Icon name='trash' onClick={event => {
                    event.stopPropagation();
                    onRemoveClick(_id);
                }}/>
                <Icon name='edit' onClick={event => {
                    event.stopPropagation();
                    onEditClick();
                }}/>
                </span>
                <p>{header ? header : '-'}</p>
            </Card.Header>
            <SchoolProgress progress={progress}/>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({})
)(SchoolCard);
