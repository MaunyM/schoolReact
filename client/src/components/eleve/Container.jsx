import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import EleveCard from './Card'
import EleveEditCard from './EditCard'
import SchoolStep from '../layout/Step';

import './container.css'

const progress = (eleve, etapes) => {
    return (100 / etapes.length) * eleve.master.length
};

const EleveContainer = ({eleves, etapes}) => (
    <div>
        <SchoolStep/>
        <Card.Group>
            {eleves.map((eleve) => <EleveCard key={eleve._id} progress={progress(eleve, etapes)} {...eleve}/>)}
            <EleveEditCard/>
        </Card.Group>
    </div>
);

export default connect(
    state => ({
        eleves: state.eleves,
        etapes: state.etapes
    }),
    dispatch => ({})
)(EleveContainer);