import {combineReducers} from 'redux'
import domaines from './domaines'
import competences from './competences'
import etapes from './etapes'
import eleve from './eleve'
import form from './form'

import {routerReducer} from 'react-router-redux'

const schoolApp = combineReducers({
    domaines,
    competences,
    etapes,
    eleve,
    form,
    routerReducer
});

export {schoolApp}
