import React from 'react'
import {Progress} from 'semantic-ui-react'
import {connect} from 'react-redux'

const SchoolProgress = ({progress}) => (
    <div>
        {!isNaN(progress) && <Progress percent={progress} indicating />}
    </div>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({})
)(SchoolProgress);