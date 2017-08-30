import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addCompetence, changeField} from '../../actions'

import './card.css'

const CompetenceEditCard = ({domaine, description, onEdit, onChange}) => (
    <Card className="editCompetence">
        <Card.Content>
            <Card.Header>
                Ajouter une compétence
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(domaine, description)}>
                    <Form.Group inline>
                        <Form.TextArea name='description' rows={2} onChange={onChange} value={description}
                                       placeholder='Description...'/>
                        <Button icon type='submit'><Icon name='add' link/></Button>
                    </Form.Group>
                </Form>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({
        description: state.form['competence'].description,
    }),
    dispatch => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('competence', name, value))
        },
        onEdit: (domaine, description) => {
            dispatch(addCompetence(domaine._id, description))
        }
    })
)(CompetenceEditCard);
