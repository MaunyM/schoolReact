import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addEleve, changeField} from '../../actions'

const EleveEditCard = ({edit, name, onChange, onEdit}) => (
    <Card>
        <Card.Content>
            <Card.Header>
                Ajouter un eleve
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(name)}>
                    <Form.Group inline>
                        <Form.Input name='name' className="nameField"
                                    onChange={onChange} value={name}
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
        name: state.form['eleve'].name,
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('eleve', name, value))
        },
        onEdit: (name) => {
            dispatch(addEleve(name))
        }
    })
)(EleveEditCard);
