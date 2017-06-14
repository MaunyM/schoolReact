import React from 'react'
import {TextField} from 'office-ui-fabric-react/lib/TextField';
import {DefaultButton, PrimaryButton} from 'office-ui-fabric-react/lib/Button';
import {connect} from 'react-redux'

import {changeField, cancelForm, addApplication, closeApplication} from '../../actions'


import './creation.css'

const ApplicationCreation = ({state, onValidate, onChange, onCancel}) => (
    <div>
        <TextField label='Nom' onChanged={value => onChange('nom', value)} value={state.nom}/>
        <TextField label='Description' onChanged={value => onChange('description', value)} value={state.description}
                   multiline autoAdjustHeight/>
        <PrimaryButton
            text='Valider' onClick={event => onValidate(state.nom, state.description)}
        />
        <DefaultButton
            text='Annuler' onClick={onCancel}
        />
    </div>
);

export default connect(
    state => ({
        state: state.form['application'],
    }),
    dispatch => ({
        onValidate: (nom, description) => {
            dispatch(addApplication(nom, description));
            dispatch(cancelForm('application'));
            dispatch(closeApplication())
        },
        onChange: (field, value) => {
            dispatch(changeField('application', field, value))
        },
        onCancel: () => {
            dispatch(cancelForm('application'));
            dispatch(closeApplication());
        }
    })
)(ApplicationCreation);
