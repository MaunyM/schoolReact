import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addEleve, changeField, cancelForm, updateEleve} from '../../actions'

const EleveEditCard = ({edit, eleve, user, onChange, onSubmit, onCancel, isEdit}) => (
    <Card>
        <Card.Content>
            <Card.Header>
                {isEdit ? 'Modifier un eleve' : 'Ajouter un eleve'}
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onSubmit(eleve, user._id)}>
                    <Form.Group inline>
                        {isEdit && <Button icon onClick={onCancel}><Icon name='cancel' link/></Button>}
                        <Form.Input name='name' className={`${isEdit ? 'editField' : 'nameField'}`}
                                    onChange={onChange} value={eleve.name}
                                    placeholder='Nom...'/>
                        <Button icon type='submit'><Icon name='add' link/></Button>
                    </Form.Group>
                </Form>
            </Card.Description>
        </Card.Content>
    </Card>
);

export default connect(
    (state, ownProps) => ({
        user: state.user,
        isEdit: state.form['eleve']._id,
        eleve: state.form['eleve'],
        name: state.form['eleve'].name,
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('eleve', name, value))
        },
        onCancel: () => {
            dispatch(cancelForm('eleve'))
        },
        onSubmit: (eleve, userId) => {
            if (eleve.name) {
                if (eleve._id) {
                    dispatch(updateEleve(eleve));
                } else {
                    console.log(eleve, userId);
                    dispatch(addEleve(eleve.name, userId));
                }
                dispatch(cancelForm('eleve'))
            }
        }
    })
)(EleveEditCard);
