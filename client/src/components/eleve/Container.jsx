import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

//Router
import {push} from 'react-router-redux'

import SchoolCard from '../common/Card'
import EleveEditCard from './EditCard'
import SchoolStep from '../layout/Step';
import {removeEleve} from '../../actions'

import './container.css'

const progress = (eleve, etapes) => {
    return (100 / etapes.length) * eleve.master.length
};

const EleveContainer = ({eleves, etapes, onRemoveClick, goTo}) => (
    <div>
        <SchoolStep/>
        <Card.Group>
            {eleves.map((eleve, count) => <SchoolCard key={count}
                                                      onRemoveClick={onRemoveClick}
                                                      progress={eleve.master && progress(eleve, etapes)}
                                                      header={eleve.name}
                                                      _id={eleve._id}
                                                      onClick={() => goTo(`eleve/${eleve._id}/domaines`)}/>)
            }
            <EleveEditCard/>
        </Card.Group>
    </div>
);

export default connect(
    state => ({
        eleves: state.eleves,
        etapes: state.etapes
    }),
    dispatch => ({
        goTo: url => {
            dispatch(push(url))
        },
        onRemoveClick: (id) => {
            dispatch(removeEleve(id))
        },
    })
)(EleveContainer);