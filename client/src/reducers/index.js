import {combineReducers} from 'redux'
import domaines from './domaines'
import competences from './competences'
import etapes from './etapes'
import eleves from './eleve'
import form from './form'
import user from './user'
import navigation from './navigation'

import {routerReducer} from 'react-router-redux'

const schoolApp = combineReducers({
    domaines,
    competences,
    etapes,
    eleves,
    form,
    navigation,
    user,
    routerReducer
});

export {schoolApp}
