import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addEtape, changeField, cancelForm, updateEtape} from '../../actions'

const EtapeEditCard = ({isEdit, competence, etape, onChange, onEdit, onCancel}) => (
    <Card className="editEtape">
        <Card.Content>
            <Card.Header>
                {isEdit ? 'Modifier une étape' : 'Ajouter une étape'}
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(competence, etape)}>
                    <Form.Group inline>
                        {isEdit && <Button icon onClick={onCancel}><Icon name='cancel' link/></Button>}
                        <Form.TextArea name='description' rows={2} onChange={onChange} value={etape.description}
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
        isEdit: state.form['etape']._id,
        etape: state.form['etape']
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('etape', name, value))
        },
        onCancel: () => {
            dispatch(cancelForm('etape'))
        },
        onEdit: (competence, etape) => {
            if (etape.description) {
                if (etape._id) {
                    dispatch(updateEtape(etape));
                } else {
                    dispatch(addEtape(competence._id, etape.description))
                }
                dispatch(cancelForm('etape'));
            }
        }
    })
)(EtapeEditCard);
