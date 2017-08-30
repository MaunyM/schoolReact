import React from 'react'
import {connect} from 'react-redux'
import {Sidebar, Menu, Icon} from 'semantic-ui-react'

import {push} from 'react-router-redux'

const SchoolSidebar = ({visible, path, goTo}) => (
    <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical>
        <Menu.Item>
            <Menu.Header>School React</Menu.Header>
        </Menu.Item>
        <Menu.Item name='edit' link onClick={event => goTo(`/`)} active={path === "/" || path.startsWith("/eleve")}>
            <Icon name='edit'/>
            Evalutation
        </Menu.Item>
        <Menu.Item name='synthese' link onClick={event => goTo(`/synthese`)} active={path === "/synthese"}>
            <Icon name='bar chart'/>
            Synthèse
        </Menu.Item>
    </Sidebar>
);

export default connect(
    (state, ownProps) => ({
        path: state.routerReducer.location.pathname,
        visible: state.navigation.sidebarVisible
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolSidebar);