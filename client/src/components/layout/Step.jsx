import React from 'react'
import {connect} from 'react-redux'
import {Step} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import './step.css'

const SchoolStep = ({competence, domaine, eleve, goTo}) => (
    <Step.Group>
        {eleve ?
            <Step icon='home' onClick={event => goTo('/')}/>
            : <Step icon='home'/>
        }
        {
            eleve && (domaine ?
                    <Step title={eleve.name} onClick={event => goTo(`/eleve/${eleve._id}/domaines`)}/>
                    :
                    <Step title={eleve.name}/>
            )
        }
        {
            domaine && (competence ?
                    <Step icon='puzzle' className="domaineStep" title={domaine.name}
                          onClick={event => goTo(`/eleve/${eleve._id}/domaine/${domaine._id}`)}/>
                    :
                    <Step icon='puzzle' className="domaineStep" title={domaine.name}/>
            )
        }
        {
            competence &&
            <Step className="competenceStep" title={competence.description}/>
        }
    </Step.Group>
);

export default connect(
    (state, ownProps) => ({}),
    dispatch => ({
        load: () => {
        },
        goTo: url => {
            dispatch(push(url))
        }
    })
)(SchoolStep);