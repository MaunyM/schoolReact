import React from 'react'
import {connect} from 'react-redux'
import {Step} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import './step.css'

const SchoolStep = ({competence, domaine, eleve, goTo}) => (
    <Step.Group>
        {eleve ?
            <Step icon='edit' onClick={event => goTo('/home')}/>
            : <Step icon='edit'/>
        }
        {
            eleve && (domaine ?
                    <Step title={eleve.name} onClick={event => goTo(`/home/eleve/${eleve._id}/domaines`)}/>
                    :
                    <Step title={eleve.name}/>
            )
        }
        {
            domaine && (competence ?
                    <Step icon='puzzle' className="domaineStep" title={domaine.name}
                          onClick={event => goTo(`/home/eleve/${eleve._id}/domaine/${domaine._id}`)}/>
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