import React from 'react'
import {connect} from 'react-redux'
import {Card, Form, Icon, Button} from 'semantic-ui-react'
import {addDomaine, changeField} from '../../actions'

import './editCard.css'

const DomaineEditCard = ({edit, name, code, onChange, onEdit}) => (
    <Card className="editDomaine">
        <Card.Content>
            <Card.Header>
                Ajouter un domaine
            </Card.Header>
            <Card.Description>
                <Form onSubmit={event => onEdit(name, code)}>
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
        domaines: state.domaines,
        name: state.form['domaine'].name,
        code: state.form['domaine'].code
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('domaine', name, value))
        },
        onEdit: (name, code) => {
            dispatch(addDomaine(name, code))
        }
    })
)(DomaineEditCard);
