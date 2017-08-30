import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addEtape, changeField} from '../../actions'

const EtapeEditCard = ({edit, competence, description, onChange, onEdit}) => (
    <Card className="editEtape">
        <Card.Content>
            <Card.Header>
                Ajouter une étape
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(competence, description)}>
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
        description: state.form['etape'].description,
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('etape', name, value))
        },
        onEdit: (competence, description) => {
            dispatch(addEtape(competence._id, description))
        }
    })
)(EtapeEditCard);
