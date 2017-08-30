import React from 'react'
import {connect} from 'react-redux'
import {Header, Icon} from 'semantic-ui-react'

import {showSidebar} from '../../actions'

import './header.css'

const SchoolHeader = ({showSidebar}) => (
    <Header className="schoolHeader">
        <span className="headerTitle"><Icon name='sidebar' onClick={event =>  {showSidebar(); event.stopPropagation()}}/>School-react</span>
    </Header>
);

export default connect(
    (state, ownProps) => ({
    }),
    dispatch => ({
        showSidebar: () => dispatch(showSidebar())
    })
)(SchoolHeader);