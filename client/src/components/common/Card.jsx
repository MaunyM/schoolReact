import React from 'react'
import {connect} from 'react-redux'
import {Card, Icon} from 'semantic-ui-react'

import './card.css'

const progressStyle = (progress) => {
    if (progress === 100)  return "progressFull";
    if (progress > 50) return "progressMiddle";
    return "progressEmpty";
};

const SchoolCard = ({_id, url, header, progress, color, onRemoveClick, onClick}) => (
    <Card className="schoolCard" link={true} onClick={event => onClick()} color={color}>
        <Card.Content>
            <Card.Header>
                <Icon name='trash' onClick={event => onRemoveClick(_id)}/>
                <p>{header}</p>
            </Card.Header>
            <span className={progressStyle(progress)}> {!isNaN(progress) && Math.floor(progress) + " %"} </span>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({})
)(SchoolCard);
