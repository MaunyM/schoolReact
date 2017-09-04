import React from 'react'

import {} from 'semantic-ui-react'

import {connect} from 'react-redux'

import "./progressCell.css"

const arrayOfProgress = (progress, size) => {
    const result = new Array(size);
    return result.fill(1).map((x, count) => progress > (100 / size) * count);
};

const SchoolProgressCell = ({progress}) => (
    <div className="progressCell container">
        {arrayOfProgress(progress, 10).map((val, count) => {
            return val ? <div key={count} className="item green">&nbsp;</div> : <div key={count} className="item red">&nbsp;</div>
        })
        }
    </div>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({})
)(SchoolProgressCell);