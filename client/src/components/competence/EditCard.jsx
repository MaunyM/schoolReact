import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addCompetence, changeField, cancelForm, updateCompetence} from '../../actions'

import './editCard.css'

const CompetenceEditCard = ({isEdit, domaine, competence, onEdit, onChange, onCancel}) => (
    <Card className="editCompetence">
        <Card.Content>
            <Card.Header>
                {isEdit ? 'Modifier une compétence' : 'Ajouter une compétence'}
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(domaine, competence)}>
                    <Form.Group inline>
                        {isEdit && <Button icon onClick={onCancel}><Icon name='cancel' link/></Button>}
                        <Form.TextArea name='description' rows={2} onChange={onChange}
                                       value={competence.description}
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
        isEdit: state.form['competence']._id,
        competence: state.form['competence'],
    }),
    dispatch => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('competence', name, value))
        },
        onCancel: () => {
            dispatch(cancelForm('competence'))
        },
        onEdit: (domaine, competence) => {
            if (competence._id) {
                dispatch(updateCompetence(competence));
            } else {
                dispatch(addCompetence(domaine._id, competence.description));
            }
            dispatch(cancelForm('competence'));
        }
    })
)(CompetenceEditCard);
