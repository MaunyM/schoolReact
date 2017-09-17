import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Grid, Message, Icon} from 'semantic-ui-react'

import {changeField, signIn} from '../../actions'

const Login = ({name, password, error, onChange, onConnect}) => (
    <div>
        <Message>
            <Message.Header>
                <Icon name='announcement'/>
                Nouveautés !
            </Message.Header>
            <p>
                L'ecran de synthese affiche les domaines
            </p>
        </Message>
        <Grid centered columns={2}>
            <Grid.Column width={3}>
                <Form onSubmit={event => onConnect(name, password)}>
                    <Form.Field>
                        <label>Compte</label>
                        <Form.Input placeholder='Compte' name='name' onChange={onChange} value={name}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Mot de passe</label>
                        <Form.Input placeholder='Mot de passe' type="password" name='password' onChange={onChange}
                                    value={password}/>
                    </Form.Field>
                    {error && <span>Mot de passe incorrect. Veuillez réesayer.</span>}
                    <Button type='submit'>Se connecter</Button>
                </Form>
            </Grid.Column>
        </Grid>
    </div>
);

export default connect(
    (state, ownProps) => ({
        error: state.user.error,
        name: state.form.user.name,
        password: state.form.user.password
    }),
    (dispatch) => ({
        onChange: (e, {name, value}) => {
            dispatch(changeField('user', name, value))
        },
        onConnect: (name, password) => {
            dispatch(signIn(name, password))
        }
    })
)(Login);
