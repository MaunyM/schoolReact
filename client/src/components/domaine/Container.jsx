import React from 'react'
import {connect} from 'react-redux'
import {Card} from 'semantic-ui-react'

import DomaineCard from './Card'
import DomaineEditCard from './EditCard'
import SchoolStep from '../layout/Step';

import './container.css'

const progress = (eleve, etapes) => {
    const masteredEtapes = etapes.filter( etape => eleve.master.includes(etape._id))
    return (100 / etapes.length) * masteredEtapes.length
};

const etapeFromDomaine = (domaine, competences, etapes) => {
    const competencesId = competences.filter( competence => competence.domaineId === domaine._id).map(competence => competence._id);
    return etapes.filter(etape => competencesId.includes(etape.competenceId))
};

const DomaineContainer = ({domaines, eleve, competences, etapes}) => (
    <div>
        <SchoolStep eleve={eleve}/>
        <Card.Group>
            {domaines.map((domaine) => <DomaineCard key={domaine._id}
                                                    eleveId={eleve && eleve._id}
                                                    progress={eleve && progress(eleve, etapeFromDomaine(domaine, competences, etapes))}
                                                    {...domaine}/>)}
            <DomaineEditCard/>
        </Card.Group>
    </div>
);


export default connect(
    (state, ownProps) => ({
        eleve: state.eleves.filter(eleve => eleve._id === ownProps.match.params.idEleve)[0],
        domaines: state.domaines,
        competences: state.competences,
        etapes: state.etapes
    }),
    dispatch => ({})
)(DomaineContainer);