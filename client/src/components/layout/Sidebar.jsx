import React from 'react'
import {connect} from 'react-redux'
import {Sidebar, Menu, Icon} from 'semantic-ui-react'

import {signOut} from '../../actions'

import {push} from 'react-router-redux'

const SchoolSidebar = ({visible, path, goTo, onSignOut}) => (
    <Sidebar as={Menu} animation='overlay' width='thin' visible={visible} icon='labeled' vertical>
        <Menu.Item>
            <Menu.Header>School React</Menu.Header>
        </Menu.Item>
        <Menu.Item name='edit' link onClick={event => goTo(`/home`)}
                   active={path === "/" || path.startsWith("/home/eleve")}>
            <Icon name='edit'/>
            Evalutation
        </Menu.Item>
        <Menu.Item name='synthese' link onClick={event => goTo(`/home/synthese`)}
                   active={path === "/home/synthese"}>
            <Icon name='bar chart'/>
            Synthèse
        </Menu.Item>

        <Menu.Item name='signOut' link onClick={event => onSignOut()}>
            <Icon name='sign out'/>
            Déconnexion
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
        },
        onSignOut: () => {
            dispatch(signOut())
        }
    })
)(SchoolSidebar);