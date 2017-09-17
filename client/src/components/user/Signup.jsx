import React from 'react'
import {connect} from 'react-redux'
import {Form, Button, Grid} from 'semantic-ui-react'

import {changeField, signUp} from '../../actions'

const Signup = ({name, password, error, onChange, onCreate}) => (
    <Grid centered columns={2}>
        <Grid.Column width={3}>
            <Form onSubmit={event => onCreate(name, password)}>
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
                <Button type='submit'>Créer</Button>
            </Form>
        </Grid.Column>
    </Grid>
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
        onCreate: (name, password) => {
            dispatch(signUp(name, password))
        }
    })
)(Signup);
