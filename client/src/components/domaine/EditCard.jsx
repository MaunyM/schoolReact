import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addDomaine, changeField, cancelForm, updateDomaine} from '../../actions'

import './editCard.css'

const DomaineEditCard = ({edit, isEdit, domaine, onChange, onSubmit, onCancel}) => (
    <Card className="editDomaine">
        <Card.Content>
            <Card.Header>
                {isEdit ? 'Modifier un domaine' : 'Ajouter un domaine'}
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onSubmit(domaine)}>
                    <Form.Group inline>
                        {isEdit && <Button icon onClick={onCancel}><Icon name='cancel' link/></Button>}
                        <Form.Input name='name' className={`${isEdit ? 'editField' : 'nameField'}`}
                                    onChange={onChange} value={domaine.name}
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
        domaines: state.domaines,
        isEdit: state.form['domaine']._id,
        domaine: state.form['domaine'],
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('domaine', name, value))
        },
        onCancel: () => {
            dispatch(cancelForm('domaine'));
        },
        onSubmit: (domaine) => {
            if (domaine._id) {
                dispatch(updateDomaine(domaine));
            } else {
                dispatch(addDomaine(domaine.name, domaine.code));
            }
            dispatch(cancelForm('domaine'));
        }
    })
)(DomaineEditCard);
