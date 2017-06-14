import React from 'react'
import {connect} from 'react-redux'
import {Card, Step} from 'semantic-ui-react'
import {loadDomaines} from '../../actions'

import DomaineCard from './Card'

import './container.css'

class DomaineContainer extends React.Component {
    componentWillMount() {
        const {load} = this.props;
        load();
    }

    render() {
        const {domaines, eleve} = this.props;
        return (
            (
                <div><Step.Group>
                    <Step icon='home' title={eleve.name}/>
                </Step.Group>
                    <Card.Group>
                        {domaines.map(domaine => <DomaineCard key={domaine.code} {...domaine}/>)}
                    </Card.Group>
                </div>
            )
        )
    }
}

export default connect(
    state => ({
        eleve: state.eleve,
        domaines: state.domaines
    }),
    dispatch => ({
        load : () => {
            dispatch(loadDomaines())
        }
    })
)(DomaineContainer);